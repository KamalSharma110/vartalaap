import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../../firebase/firebase";
import classes from "./SearchBar.module.css";
import UserCard from "./UserCard";

let searchedUserData;

const SearchBar = () => {
  const [hasUser, setHasUser] = useState({value: false}); //if we use directly a primitive boolean value
  //as state variable, the component will not re-render when setState again and again set state
  //variable to true.
  const searchInputRef = useRef();

  const keyDownHandler = (event) => {
    event.code === "Enter" && handleSearch();
  };

  const handleSearch = async () => {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("displayName", "==", searchInputRef.current.value)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      searchedUserData = doc.data();
    });

    setHasUser({value: true});//here it causes the component to re-render because every time a new
    //object is being passed and it will be considered different everytime.
  };

  return (
    <React.Fragment>
      <div className={classes.searchbar}>
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={keyDownHandler}
          ref={searchInputRef}
        />
      </div>

      {hasUser.value && (
        <UserCard
          profilePicture={searchedUserData.photoUrl}
          name={searchedUserData.displayName}
          localId={searchedUserData.localId}
        />
      )}
    </React.Fragment>
  );
};

export default SearchBar;
