import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import UserCard from "./UserCard";
import { getRecentChats } from "../../api/api";
import ErrorModal from "../ErrorModal";
import { socket } from "../../App";
import AuthContext from "../../store/auth-store";

const UserCardList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const authCtx = useContext(AuthContext);

  const currentUserId = authCtx.currentUserInfo.localId;

  useEffect(() => {
    (async () => {
      try {
        const resData = await getRecentChats();
        const usersData = resData.recentChats;
        const USERS_ARRAY = [];

        for (const key in usersData) {
          USERS_ARRAY.push({
            localId: usersData[key].userInfo.localId,
            displayName: usersData[key].userInfo.displayName,
            photoUrl: usersData[key].userInfo.photoUrl,
            lastMessage: usersData[key].lastMessage,
            date: usersData[key].date,
          });
        }
        setUsers(USERS_ARRAY);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  socket?.on('user_added', (user) => {
    if(user.localId !== currentUserId)
      if(currentUserId === user.localId || currentUserId === user.currentUserId)
        setUsers([...users, {
          localId: user.localId,
          displayName: user.displayName,
          photoUrl: user.photoUrl,
          date: user.date,
          lastMessage: '',
        }]);
  });

  return (
    <>
      <ul
        style={{
          listStyle: "none",
          padding: "0",
        }}
      >
        {users
          .sort((a, b) => b.date - a.date)
          .map((userData) => {
            return (
              <li key={userData.localId} style={{ margin: "2px" }}>
                <UserCard
                  profilePicture={userData.photoUrl}
                  name={userData.displayName}
                  localId={userData.localId}
                  lastMessage={userData.lastMessage}
                />
              </li>
            );
          })}
      </ul>
      {error &&
        ReactDOM.createPortal(
          <ErrorModal errorMessage={error.message} onClose = {setError} />,
          document.getElementsByTagName("body")[0]
        )}
    </>
  );
};

export default UserCardList;
