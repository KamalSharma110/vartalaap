import { useContext, useEffect, useState } from "react";

import classes from "./ChatAreaHeader.module.css";
import ChatContext from "../../store/chat-context";
import { getAuthUserData } from "../../api/utils";
import AuthContext from "../../store/auth-store";


const ChatAreaHeader = () => {
  const [name, setName] = useState('');
  const chatCtx = useContext(ChatContext);
  const authCtx = useContext(AuthContext);
  const { localId } = chatCtx.user;
  const { token }  = authCtx.currentUserInfo;
  
  useEffect(() => {
    async function getName() {
      const user = await getAuthUserData(token, localId);
      setName(user.displayName);
    }

    if(localId) getName();
  }, [localId, token]); 

  return (
    <div className={classes.chatareaheader}>
      <span>{name || ''}</span>
      <div className={classes["chatareaheader_options"]}>
        <ion-icon name="videocam-sharp"></ion-icon>
        <ion-icon name="person-add"></ion-icon>
        <ion-icon name="ellipsis-horizontal"></ion-icon>
      </div>
    </div>
  );
};

export default ChatAreaHeader;
