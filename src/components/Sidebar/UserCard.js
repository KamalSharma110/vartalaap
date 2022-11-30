import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { currentUserId } from './NavBar';
import classes from './UserCard.module.css';
// import ContactImg from '../../img/contact-profile-pic.jpg';

const UserCard = props => {

    const clickHandler = async () => {
        const combinedId = currentUserId > props.localId ?
            currentUserId + props.localId : props.localId + currentUserId;

        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
            await setDoc(doc(db, "chats", combinedId), {
                messages: []
            });
        }

        await updateDoc(doc(db, "userChats", currentUserId), {
            [combinedId + ".userInfo"]: {

                localId: props.localId,
                photoUrl: props.profilePicture,
                displayName: props.name
            },
            [combinedId + ".date"]: serverTimestamp(),
        }
        );
    };

    return (
        <div className={classes.contact} onClick={clickHandler}>
            <img src={props.profilePicture} alt='contact-1' />
            <div className={classes['contact-info']}>
                <span>{props.name}</span>
                <span></span>
            </div>
        </div>
    );
};

export default UserCard;