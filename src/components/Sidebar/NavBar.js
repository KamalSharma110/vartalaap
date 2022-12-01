import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-store";

// import dp from "../../img/profile-pic.jpg";
import classes from "./NavBar.module.css";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState({
    displayName: null,
    photoUrl: null,
  });

  const authCtx = useContext(AuthContext);
  
  useEffect(() => {
    setCurrentUser({
      displayName: authCtx.currentUserInfo.displayName,
      photoUrl: authCtx.currentUserInfo.photoUrl,
    });
  }, [authCtx]);


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
