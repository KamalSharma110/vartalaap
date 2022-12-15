import React, { useRef } from "react";
import classes from "./ChatArea.module.css";
import ChatAreaHeader from "./ChatAreaHeader";
import ChatInput from "./ChatInput";
import ChatsContainer from "./ChatsContainer";

const ChatArea = () => {
  const chatInputRef = useRef();

  return (
    <section
      className={classes.chatarea}
      onClick={() => {
        if (chatInputRef.current.showEmojiPanel)
          chatInputRef.current.showEmojiPanelHandler();
      }}
    >
      <ChatAreaHeader />
      <ChatsContainer />
      <ChatInput ref={chatInputRef} />
    </section>
  );
};

export default ChatArea;
