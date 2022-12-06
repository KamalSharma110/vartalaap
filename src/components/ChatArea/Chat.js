import { useEffect, useRef } from "react";
import classes from "./Chat.module.css";

const Chat = (props) => {
  const { received, photoUrl, text, date, img } = props;
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={chatRef}
      className={`${classes.chat} ${received ? "" : classes["float_right"]}`}
      style={{ alignItems: `${received ? "start" : "end"}` }}
    >
      <img src={img} alt="" id={classes["received_image"]} />
      <div>
        <img src={photoUrl} alt="" />
        <span>{text}</span>
      </div>
      <span style={{ float: `${!received ? "right" : "none"}` }}>
        {date.toDate().toLocaleTimeString()}
      </span>
    </div>
  );
};

export default Chat;
