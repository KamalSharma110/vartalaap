import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";

import { useContext } from "react";
import AuthContext from "../../store/auth-store";
import UserCard from "./UserCard";

const UserCardList = () => {
  const [users, setUsers] = useState([]);
  const authCtx = useContext(AuthContext);
  const { localId } = authCtx.currentUserInfo;

  useEffect(() => {
    let usersData;
    const unsub = onSnapshot(doc(db, "userChats", localId), (doc) => {
      usersData = doc.data();
      const USERS_ARRAY = [];

      for (const key in usersData) {
        USERS_ARRAY.push({
          localId: usersData[key].userInfo.localId,
          displayName: usersData[key].userInfo["displayName"],
          photoUrl: usersData[key].userInfo.photoUrl,
          lastMessage: usersData[key].lastMessage,
          date: usersData[key].date,
        });
      }
      setUsers(USERS_ARRAY);
    });

    return () => {
      unsub();
    };
  }, [localId]);

  return (
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
            <li key={userData.localId}>
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
  );
};

export default UserCardList;
