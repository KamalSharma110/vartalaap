import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-store";

// import dp from "../../img/profile-pic.jpg";
import classes from "./NavBar.module.css";

export let currentUserId;
const NavBar = () => {
  const [currentUser, setCurrentUser] = useState({
    displayName: null,
    photoUrl: null,
  });

  const authCtx = useContext(AuthContext);
  const {token} = authCtx;
  const getCurrentUserData = useCallback(async () =>
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      }
    )
    .then((response) => response.json())
    .then((data) => data.users[0]), [token])



  useEffect(() => {
    getCurrentUserData()
      .then(userData => {setCurrentUser({
        displayName: userData.displayName,
        photoUrl: userData.photoUrl,
      })
      currentUserId = userData.localId;
    });


  }, [getCurrentUserData]);

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
