import { db, storage } from "../../firebase/firebase.js";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { v4 } from "uuid";

import React, {
  useCallback,
  useContext,
  useState,
  useImperativeHandle,
} from "react";

import ChatContext from "../../store/chat-context";
import AuthContext from "../../store/auth-store";
import classes from "./ChatInput.module.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import EmojiPanel from "../EmojiPanel.jsx";

const ChatInput = React.forwardRef((props, refs) => { // to prevent name collision with firebase/storage's ref fn
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);

  const chatCtx = useContext(ChatContext);
  const authCtx = useContext(AuthContext);

  useImperativeHandle(refs, () => {
    return { showEmojiPanelHandler, showEmojiPanel };
  });


  const showEmojiPanelHandler = () => {
    setShowEmojiPanel((prevState) => !prevState);
  };

  const msgInputChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const emojiInputHandler = useCallback((value) => {
    setMessage((prevMsg) => prevMsg + value);
  }, []);

  const imageInputChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (message === "" && !image) return;

    const chatsRef = doc(db, "chats", chatCtx.combinedId);

    if (!image) {
      await updateDoc(chatsRef, {
        messages: arrayUnion({
          text: message,
          senderId: authCtx.currentUserInfo.localId,
          id: v4(),
          date: Timestamp.now(), //no matter what we write here,
          //the date will always be stored in firebase database as a timestamp
        }),
      });
    } else {
      const storageRef = ref(storage, v4());
      await uploadBytesResumable(storageRef, image);

      const downloadURL = await getDownloadURL(storageRef);

      await updateDoc(chatsRef, {
        messages: arrayUnion({
          text: message,
          img: downloadURL,
          senderId: authCtx.currentUserInfo.localId,
          id: v4(),
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", authCtx.currentUserInfo.localId), {
      [chatCtx.combinedId + ".lastMessage"]: message,
      [chatCtx.combinedId + ".date"]: Timestamp.now(),
    });

    await updateDoc(doc(db, "userChats", chatCtx.user.localId), {
      [chatCtx.combinedId + ".lastMessage"]: message,
      [chatCtx.combinedId + ".date"]: Timestamp.now(),
    });
    setMessage("");
    setImage(null);
  };

  return (
    <div className={classes.chatinput}>
      <form className={classes["chatinput_form"]} onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Type Something..."
          onChange={msgInputChangeHandler}
          value={message}
        />

        <div className={classes["chatinput_form__actions"]}>
          <input
            id="attach-image-button"
            type="file"
            style={{ display: "none" }}
            onChange={imageInputChangeHandler}
          />
          <label htmlFor="attach-image-button">
            <ion-icon name="image"></ion-icon>
          </label>

          <ion-icon
            name="happy-outline"
            onClick={(event) => {
              event.stopPropagation(); // so that chatArea's onClick listener doesn't run
              showEmojiPanelHandler();
            }}
          ></ion-icon>

          <EmojiPanel
            show={showEmojiPanel}
            emojiInputHandler={emojiInputHandler}
          />

          <button disabled={image || message !== "" ? false : true}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
});

export default ChatInput;
