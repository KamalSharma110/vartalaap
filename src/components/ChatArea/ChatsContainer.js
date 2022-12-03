import { useContext, useEffect } from "react";
import ChatContext from "../../store/chat-context";
import AuthContext from "../../store/auth-store";
import Chat from "./Chat";
import classes from "./ChatsContainer.module.css";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const ChatsContainer = () => {
  console.log('chatContainer running');
  const chatCtx = useContext(ChatContext);
  const authCtx = useContext(AuthContext);

  const {combinedId, dispatchChatState} = chatCtx;

  useEffect(() => {
    console.log('effect running');
    if(combinedId){
    const unsub = onSnapshot(doc(db, "chats", combinedId) , (doc) => {
      dispatchChatState({type: 'MESSAGE_UPDATE', payload: doc.data().messages});
      console.log('dispatched');
    });

    return () => {
      console.log('cleanup running');
      unsub();
    }
  }
  }, [combinedId, dispatchChatState]);


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
                received={chat.senderId === authCtx.currentUserInfo.localId ? false : true}
              />
            </li>
          );
        })}

      </ul>
    </div>
  );
};

export default ChatsContainer;
