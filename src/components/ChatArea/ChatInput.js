import { db, storage } from "../../firebase/firebase.js";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { v4 } from "uuid";

import { useContext, useState } from "react";
import ChatContext from "../../store/chat-context";
import AuthContext from "../../store/auth-store";
import classes from "./ChatInput.module.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const chatCtx = useContext(ChatContext);
  const authCtx = useContext(AuthContext);

  const messageInputChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const imageInputChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if(message === '' && !image) return;
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
          onChange={messageInputChangeHandler}
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

          {/* <input id='attach-button' type='file' style={{display: 'none'}}/> */}
          <label htmlFor="attach-button">
            <ion-icon name="attach"></ion-icon>
          </label>
          <button disabled={image || message !== '' ? false : true}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
