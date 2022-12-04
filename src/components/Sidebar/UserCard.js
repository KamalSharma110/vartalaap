import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext } from "react";
import { db } from "../../firebase/firebase";

import AuthContext from "../../store/auth-store";
import ChatContext from "../../store/chat-context.js";
import classes from "./UserCard.module.css";
// import ContactImg from '../../img/contact-profile-pic.jpg';

const UserCard = (props) => {
  const authCtx = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);
  const {
    localId: currentUserId,
    photoUrl,
    displayName,
  } = authCtx.currentUserInfo;

  const getChats = async (combinedId) => {
    const docRef = doc(db, "chats", combinedId);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      return docSnap.data().messages;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const clickHandler = async () => {
    const combinedId =
      currentUserId > props.localId
        ? currentUserId + props.localId
        : props.localId + currentUserId;

    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      await setDoc(doc(db, "chats", combinedId), {
        messages: [],
      });

      await updateDoc(doc(db, "userChats", currentUserId), {
        [combinedId + ".userInfo"]: {
          localId: props.localId,
          photoUrl: props.profilePicture,
          displayName: props.name,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", props.localId), {
        [combinedId + ".userInfo"]: {
          localId: currentUserId,
          photoUrl: photoUrl,
          displayName: displayName,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }

    const messages = await getChats(combinedId);
    
    chatCtx.dispatchChatState({
      type: "USER_CHANGED",
      payload: {
        combinedId,
        messages,
        photoUrl: props.profilePicture,
        localId: props.localId,
      },
    });
  };

  return (
    <div className={classes.contact} onClick={clickHandler}>
      <img src={props.profilePicture} alt="contact-1" />
      <div className={classes["contact-info"]}>
        <span>{props.name}</span>
        <span>{props.lastMessage}</span>
      </div>
    </div>
  );
};

export default React.memo(UserCard);
