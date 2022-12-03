import classes from "./ChatAreaHeader.module.css";
import cam from "../../img/cam.png";
import more from "../../img/more.png";
import add from "../../img/add.png";
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
      displayName = (await getDoc(doc(db, "users", localId))).displayName;
    }

    if(localId) getName();
  }, [localId]);

  return (
    <div className={classes.chatareaheader}>
      <span>{displayName}</span>
      <div className={classes["chatareaheader_options"]}>
        <img src={cam} alt="video call" />
        <img src={add} alt="add contact" />
        <img src={more} alt="more options" />
      </div>
    </div>
  );
};

export default ChatAreaHeader;
