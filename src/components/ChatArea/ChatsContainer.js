import { useContext, useEffect } from "react";
import ChatContext from "../../store/chat-context";
import AuthContext from "../../store/auth-store";
import Chat from "./Chat";
import classes from "./ChatsContainer.module.css";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const ChatsContainer = () => {
  const chatCtx = useContext(ChatContext);
  const authCtx = useContext(AuthContext);

  const {combinedId, dispatchChatState} = chatCtx;

  useEffect(() => {
    if(combinedId){
    const unsub = onSnapshot(doc(db, "chats", combinedId) , (doc) => {
      dispatchChatState({type: 'MESSAGE_UPDATE', payload: doc.data().messages});
    });

    return () => {
      unsub();
    }
  }
  }, [combinedId, dispatchChatState]);


  return (
    <div className={classes["chats-container"]}>
      <ul>
        {chatCtx.chats.map((chat) => {
          let received_message = true;

          if(chat.senderId === authCtx.currentUserInfo.localId){
             received_message = false;
          }

          return (
            <li key={chat.id}>
              <Chat
                text={chat.text}
                date={chat.date}
                photoUrl={received_message ? chatCtx.user.photoUrl : authCtx.currentUserInfo.photoUrl}
                received={received_message}
                img={chat.img}
              />
            </li>
          );
        })}

      </ul>
    </div>
  );
};

export default ChatsContainer;
