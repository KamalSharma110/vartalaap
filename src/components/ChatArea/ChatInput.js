import React, {
  useCallback,
  useContext,
  useState,
  useImperativeHandle,
} from "react";
import ReactDOM from "react-dom";

import ChatContext from "../../store/chat-context";
import AuthContext from "../../store/auth-store";
import classes from "./ChatInput.module.css";
import EmojiPanel from "../EmojiPanel.jsx";
import { sendChat } from "../../api/api";
import ErrorModal from "../ErrorModal";

const ChatInput = React.forwardRef((props, ref) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [error, setError] = useState(null);

  const chatCtx = useContext(ChatContext);
  const authCtx = useContext(AuthContext);

  useImperativeHandle(ref, () => {
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

    const formData = new FormData();
    formData.append("combinedId", chatCtx.combinedId);
    formData.append("text", message);
    formData.append("image", image);
    formData.append("senderId", authCtx.currentUserInfo.localId);
    formData.append("localId", chatCtx.user.localId);
    formData.append("date", new Date());

    try {
      await sendChat(formData);
    } catch (error) {
      setError(error);
    }
    setMessage("");
    setImage(null);
  };

  return (
    <>
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
      {error &&
        ReactDOM.createPortal(
          <ErrorModal errorMessage={error.message} onClose = {setError} />,
          document.getElementsByTagName("body")[0]
        )}
    </>
  );
});

export default ChatInput;
