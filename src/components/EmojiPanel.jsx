import classes from "./EmojiPanel.module.css";
import { useEffect, useState } from "react";

const EmojiPanel = (props) => {
  const [emojiData, setEmojiData] = useState(null);

  useEffect(() => {
    const fetchEmojis = async () => {
      const response = await fetch(
        "https://emoji-api.com/emojis?access_key=e08c36abf1b89d65b5a91a915bd063be37fed0e1"
      );
      const data = await response.json();
      setEmojiData(data);
    };
    fetchEmojis();
  }, []);

  return (
    <div className={`${classes["emoji-panel"]} ${props.show ? classes.active : ''}`}>
      {emojiData?.slice(0, 200).map((emoji) => (
        <span
          key={emoji.unicodeName}
          onClick={() => {
            props.emojiInputHandler(emoji.character);
          }}
        >
          {emoji.character}
        </span>
      ))}
    </div>
  );
};

export default EmojiPanel;
