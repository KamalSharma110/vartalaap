import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebase/firebase";

import { useContext } from "react";
import AuthContext from "../../store/auth-store";


const UserCardList = () => {
    const authCtx = useContext(AuthContext);
    const {localId} = authCtx.currentUserInfo;

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userChats", localId), (doc) => {
            console.log("Current data: ", doc.data());
        });

        return () => {
            unsub();
        };
    }, [localId]);

    return(
    <ul>
        
    </ul>
    );
};

export default UserCardList;