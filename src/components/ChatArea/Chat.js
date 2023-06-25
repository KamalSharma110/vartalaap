import { useEffect, useRef } from "react";
import classes from "./Chat.module.css";
import { BASE_URL } from "../../api/api";

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
      <img src={BASE_URL + img} alt="" id={classes["received_image"]} />
      <div>
        <img src={BASE_URL + photoUrl} alt="" />
        {text.length !== 0 && <span>{text}</span>}
      </div>
      <span style={{ float: `${!received ? "right" : "none"}` }}>
        {new Date(date).toLocaleTimeString()}
      </span>
    </div>
  );
};

export default Chat;
