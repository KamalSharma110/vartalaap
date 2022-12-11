import classes from "./ChatAreaHeader.module.css";
import { useContext, useEffect } from "react";
import ChatContext from "../../store/chat-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

let displayName;
const ChatAreaHeader = () => {
  const chatCtx = useContext(ChatContext);
  const { localId } = chatCtx.user;

  useEffect(() => {
    async function getName() {
      displayName = (await getDoc(doc(db, "users", localId))).data().displayName;
    }

    if(localId) getName();
  }, [localId]);

  return (
    <div className={classes.chatareaheader}>
      <span>{displayName}</span>
      <div className={classes["chatareaheader_options"]}>
        <ion-icon name="videocam-sharp"></ion-icon>
        <ion-icon name="person-add"></ion-icon>
        <ion-icon name="ellipsis-horizontal"></ion-icon>
      </div>
    </div>
  );
};

export default ChatAreaHeader;
