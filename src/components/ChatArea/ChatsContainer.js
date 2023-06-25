import { useContext } from "react";

import ChatContext from "../../store/chat-context";
import AuthContext from "../../store/auth-store";
import Chat from "./Chat";
import classes from "./ChatsContainer.module.css";
import { v4 } from "uuid";
import { socket } from "../../App";

const ChatsContainer = () => {
  const chatCtx = useContext(ChatContext);
  const authCtx = useContext(AuthContext);
  
  const { localId: currentUserId } = authCtx.currentUserInfo;
  const { dispatchChatState } = chatCtx;

  socket?.on("msg_update", (data) => {
    const { senderId, localId: receiverId } = data;

    if (
      (currentUserId === senderId || currentUserId === receiverId) &&
      chatCtx.combinedId
    )
      dispatchChatState({
        type: "MESSAGE_UPDATE",
        payload: [...chatCtx.chats, data],
      });
  });

  return (
    <div className={classes["chats-container"]}>
      <ul>
        {chatCtx.chats.map((chat) => {
          let received_message = true;

          if (chat.senderId === authCtx.currentUserInfo.localId) {
            received_message = false;
          }

          return (
            <li key={chat._id || v4()}>
              <Chat
                text={chat.text}
                date={chat.date}
                photoUrl={
                  received_message
                    ? chatCtx.user.photoUrl
                    : authCtx.currentUserInfo.photoUrl
                }
                received={received_message}
                img={chat.image}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatsContainer;
