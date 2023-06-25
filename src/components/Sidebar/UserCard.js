import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";

import AuthContext from "../../store/auth-store";
import ChatContext from "../../store/chat-context.js";
import classes from "./UserCard.module.css";
import { socket } from "../../App";
import { BASE_URL, createChat, createRecentChats, getChats } from "../../api/api";
import ErrorModal from "../ErrorModal";

const UserCard = (props) => {
  const [lastMessage, setLastMessage] = useState(props.lastMessage);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);
  const {
    localId: currentUserId,
    photoUrl,
    displayName,
  } = authCtx.currentUserInfo;

  socket?.on("lastMsg_update", (data) => {
    const { senderId, localId: receiverId } = data;

    if (currentUserId === receiverId || currentUserId === senderId)
      if (receiverId === props.localId || senderId === props.localId)
        setLastMessage(data.message);
  });

  const clickHandler = async (event) => {
    if(props.onClose) props.onClose();

    const el = document.getElementsByClassName(`${classes.contact} ${classes.active}`)[0];
    if(el)  el.className = `${classes.contact}`;
    event.target.className = `${classes.contact} ${classes.active}`;

    const combinedId =
      currentUserId > props.localId
        ? currentUserId + props.localId
        : props.localId + currentUserId;

    try {
      const resData = await getChats(combinedId);

      if (!resData) {
        await createChat(combinedId);

        await createRecentChats({
          currentUserId: currentUserId,
          localId: props.localId,
          photoUrl: props.profilePicture,
          displayName: props.name,
          date: new Date(),
          combinedId: combinedId,
        });

        await createRecentChats({
          currentUserId: props.localId,
          localId: currentUserId,
          photoUrl: photoUrl,
          displayName: displayName,
          date: new Date(),
          combinedId: combinedId,
        });
      }

      const messages = resData?.messages || [];

      chatCtx.dispatchChatState({
        type: "USER_CHANGED",
        payload: {
          combinedId,
          messages,
          photoUrl: props.profilePicture,
          localId: props.localId,
        },
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className={classes.contact} onClick={(event) => clickHandler(event)}>
        <img
          src={BASE_URL + props.profilePicture}
          alt="contact-1"
        />
        <div className={classes["contact-info"]}>
          <span>{props.name}</span>
          <span>{lastMessage}</span>
        </div>
      </div>
      {error &&
        ReactDOM.createPortal(
          <ErrorModal errorMessage={error.message} onClose = {setError} />,
          document.getElementsByTagName("body")[0]
        )}
    </>
  );
};

export default React.memo(UserCard);
