import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";

import { useContext } from "react";
import AuthContext from "../../store/auth-store";
import UserCard from "./UserCard";

const USERS_ARRAY = [];
const UserCardList = () => {
    const [users, setUsers] = useState([]);
    const authCtx = useContext(AuthContext);
    const {localId} = authCtx.currentUserInfo;
    
    useEffect(() => {
        let usersData;
        const unsub = onSnapshot(doc(db, "userChats", localId), (doc) => {
            usersData = doc.data();
            
            for(const key in usersData){
                USERS_ARRAY.push({
                    localId: usersData[key].userInfo.localId,
                    displayName: usersData[key].userInfo.displayName,
                    photoUrl: usersData[key].userInfo.photoUrl,
                });
            }
    
            console.log(USERS_ARRAY);
            setUsers(USERS_ARRAY);
        });


        return () => {
            unsub();
        };
    }, [localId]);

    return(
    <ul>
        {users.map((userData) => {
            return <li>
                <UserCard 
                key={userData.localId}
                profilePicture={userData.photoUrl}
                name={userData.displayName}/>
            </li>;
        })}
    </ul>
    );
};

export default UserCardList;