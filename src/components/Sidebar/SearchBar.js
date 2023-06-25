import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import classes from "./SearchBar.module.css";
import UserCard from "./UserCard";
import { searchUsers } from "../../api/api";
import ErrorModal from "../ErrorModal";

let searchedUsers;
const SearchBar = () => {
  const [hasUser, setHasUser] = useState({ value: false }); //if we use directly a primitive boolean value
  //as state variable, the component will not re-render when setState again and again set state
  //variable to true.

  const [closeButton, showCloseButton] = useState(false);
  const [error, setError] = useState(null);

  const searchInputRef = useRef();

  const keyDownHandler = (event) => {
    event.code === "Enter" && handleSearch();
  };

  const inputChangeHandler = () => {
    if (searchInputRef.current.value.length !== 0) showCloseButton(true);
    else showCloseButton(false);
  };

  const closeButtonHandler = () => {
    searchInputRef.current.value = "";
    setHasUser({ value: false });
    showCloseButton(false);
  };

  const handleSearch = async () => {
    try {
      const resData = await searchUsers(
        searchInputRef.current.value.toLowerCase()
      );
      searchedUsers = resData.users;
    } catch (error) { setError(error); }

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
            onClick={ closeButtonHandler }
          ></ion-icon>
        )}
      </div>

      {hasUser.value &&
        (searchedUsers?.length > 0 ? (
          searchedUsers.map((user) => (
            <UserCard
              key={user._id.toString()}
              profilePicture={user.image}
              name={user.name}
              localId={user._id.toString()}
              onClose={ closeButtonHandler }
            />
          ))
        ) : (
          <span className={classes["no-user-found"]}>No users found</span>
        ))}

      {error &&
        ReactDOM.createPortal(
          <ErrorModal errorMessage={error.message} onClose = {setError} />,
          document.getElementsByTagName("body")[0]
        )}
    </React.Fragment>
  );
};

export default SearchBar;
