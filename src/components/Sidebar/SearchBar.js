import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../../firebase/firebase";
import classes from "./SearchBar.module.css";
import UserCard from "./UserCard";

let searchedUserData;
const SearchBar = () => {
  const [hasUser, setHasUser] = useState({ value: false }); //if we use directly a primitive boolean value
  //as state variable, the component will not re-render when setState again and again set state
  //variable to true.

  const [closeButton, showCloseButton] = useState(false);

  const searchInputRef = useRef();

  const keyDownHandler = (event) => {
    event.keyCode === 13 && handleSearch();
  };

  const inputChangeHandler = () => {
    if (searchInputRef.current.value.length !== 0) showCloseButton(true);
    else showCloseButton(false);
  };

  const handleSearch = async () => {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("displayName", "==", searchInputRef.current.value.toLowerCase())
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) searchedUserData = null;

    querySnapshot.forEach((doc) => {
      searchedUserData = doc.data();
    });

    setHasUser({ value: true }); //here it causes the component to re-render because every time a new
    //object is being passed and it will be considered different everytime.
  };

  return (
    <React.Fragment>
      <div className={classes.searchbar}>
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={keyDownHandler}
          onChange={inputChangeHandler}
          ref={searchInputRef}
        />
        {closeButton && (
          <ion-icon
            name="close-outline"
            onClick={() => {
              searchInputRef.current.value = '';
              setHasUser({ value: false });
              showCloseButton(false);
            }}
          ></ion-icon>
        )}
      </div>

      {hasUser.value &&
        (searchedUserData ? (
          <UserCard
            profilePicture={searchedUserData.photoUrl}
            name={searchedUserData.displayName}
            localId={searchedUserData.localId}
          />
        ) : (
          <span className={classes["no-user-found"]}>No users found</span>
        ))}
    </React.Fragment>
  );
};

export default SearchBar;
