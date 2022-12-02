import React, { useReducer } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const ChatContext = React.createContext({
  chats: [],
  dispatchChatState: () => {},
});

const chatReducer = (prevState, action) => {
  if (action.type === "USER_CHANGED") {
    getChats(action.payload.combinedId).then((messages) => {
      return {
        chats: messages,
        user: {
          photoUrl: action.payload.photoUrl,
          localId: action.payload.localId,
        },
      };
    });
  }

  return prevState;
};

const getChats = async (combinedId) => {
  const docRef = doc(db, "chats", combinedId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data().messages);
    return docSnap.data().messages;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const ChatContextProvider = (props) => {
  const [chatState, dispatchChatState] = useReducer(chatReducer, {
    chats: [],
    user: {
      photoUrl: "",
      localId: "",
    },
  });

  return (
    <ChatContext.Provider
      value={{
        chats: chatState.chats,
        dispatchChatState,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
