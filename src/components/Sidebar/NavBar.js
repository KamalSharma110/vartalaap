import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-store";

import dp from "../../img/profile-pic.jpg";
import classes from "./NavBar.module.css";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState({
    displayName: null,
    photoUrl: null,
  });

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getCurrentUserData().then(userData => console.log(userData));
    
    // setCurrentUser({
    //   displayName: userData.displayName,
    //   photoUrl: userData.photoUrl,
    // });
  }, []);

  const getCurrentUserData = async () =>
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: authCtx.token }),
      }
    )
      .then((response) => response.json())
      .then((data) => data.users[0]);

  return (
    <div className={classes.nav}>
      <span>Chat App</span>
      <div className={classes["nav_user-info"]}>
        <img src={currentUser.photoUrl} alt="current user" />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => {
            authCtx.logout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
