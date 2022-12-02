import { useContext } from "react";
import ChatContext from "../../store/chat-context";
import AuthContext from "../../store/auth-store";
import Chat from "./Chat";
import classes from "./ChatsContainer.module.css";

const ChatsContainer = () => {
  const chatCtx = useContext(ChatContext);
  const authCtx = useContext(AuthContext);

  return (
    <div className={classes["chats-container"]}>
      <ul>
        {chatCtx.chats.map((chat) => {
          return (
            <li key={chat.id}>
              <Chat
                text={chat.text}
                date={chat.date}
                photoUrl={chatCtx.user.photoUrl}
                received={chat.senderId === authCtx.currentUserInfo.localId ? 'false' : 'true'}
              />
            </li>
          );
        })}

        <li><Chat /></li>
      </ul>
    </div>
  );
};

export default ChatsContainer;
