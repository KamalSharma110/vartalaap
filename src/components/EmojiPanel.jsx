import classes from "./EmojiPanel.module.css";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

let emojiData,
  categoryData,
  isSearching = false;
const EmojiPanel = (props) => {
  let index = 0, clear; //this shoudn't be global because we need it to be 0 to make emojis everytime this component runs
  const [emojiState, setEmojiState] = useState(null);

  useEffect(() => {
    const fetchEmojis = async () => {
      const emojiResponse = await fetch(
        "https://emoji-api.com/emojis?access_key=e08c36abf1b89d65b5a91a915bd063be37fed0e1"
      );
      emojiData = await emojiResponse.json();

      const categoryResponse = await fetch(
        "https://emoji-api.com/categories?access_key=e08c36abf1b89d65b5a91a915bd063be37fed0e1"
      );
      categoryData = await categoryResponse.json();

      setEmojiState(emojiData);
    };
    fetchEmojis();
  }, []);

  const searchEmojiHandler = (event) => {
    if (event.target.value !== "") isSearching = true;
    else isSearching = false;

    setEmojiState(
      emojiData.filter(
        (
          emoji //filter returns a shallow copy of an array
        ) => emoji.unicodeName.includes(event.target.value.toLowerCase())
      )
    );
  };

  function getEmojiByCategory(category) {
    let arr = [];
    for (; index < emojiState.length; index++) {
      if (category.slug !== emojiState[index].group) break;

      const emojiClickHandler = props.emojiInputHandler.bind(
        null,
        emojiState[index].character
      );
      //preconfiguring the function so that correct 'index' value is passed to the function

      arr.push(
        <span key={emojiState[index].unicodeName} onClick={emojiClickHandler}>
          {emojiState[index].character}
        </span>
      );
    }
    return arr;
  }

  return (
    <div
      className={`${classes["emoji-panel"]} ${
        props.show ? classes.active : ""
      }`}

      onClick={event => event.stopPropagation()}
    >
      <div>
        <input
          type="text"
          placeholder="Search..."
          onChange={(event) => {
            if(clear) clearTimeout(clear);  //debouncing
            clear = setTimeout(searchEmojiHandler.bind(null, event), 500);
          }}
        />
      </div>

      {categoryData?.map((category) => {
        if (category.slug === "component") return "";

        return (
          <React.Fragment key={v4()}>
            <p className={`${isSearching ? classes.inactive : ""}`}>
              {category.slug}
            </p>
            {getEmojiByCategory(category)}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default React.memo(EmojiPanel); //memo is v. imp. here so that this component
//only re-run when 'show' prop is changed and not when its parent component is re-executed for minor msg input changes
