import { db, storage } from "../../firebase/firebase.js";
import { doc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore';
import { v4 } from 'uuid';

import { useContext, useState } from 'react';
import ChatContext from "../../store/chat-context";
import AuthContext from "../../store/auth-store";
import classes from './ChatInput.module.css';
import attach from '../../img/attach.png';
import img from '../../img/img.png';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ChatInput = () => {
    const [message, setMessage] = useState('');
    const chatCtx = useContext(ChatContext);
    const authCtx = useContext(AuthContext);

    const inputChangeHandler = (event) => {
        setMessage(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (message !== '') {
            const file = document.getElementById('attach-image-button').files[0];
            const chatsRef = doc(db, 'chats', chatCtx.combinedId);
            if (!file) {
                await updateDoc(chatsRef, {
                    messages: arrayUnion({
                        text: message,
                        senderId: authCtx.currentUserInfo.localId,
                        id: v4(),
                        date: Timestamp.now().toDate().toISOString(),
                    })
                });
            }
            else {
                const storageRef = ref(storage, v4());
                await uploadBytesResumable(storageRef, file);
                
                const downloadURL = await getDownloadURL(storageRef);

                await updateDoc(chatsRef, {
                    messages: arrayUnion({
                        text: message,
                        img: downloadURL,
                        senderId: authCtx.currentUserInfo.localId,
                        id: v4(),
                        date: Timestamp.now().toDate().toISOString(),
                    })
                });
                // console.log(document.getElementById('attach-image-button').files[0]);
                console.log(document.getElementById('attach-image-button').getAttribute('files'));
            }
            
            await updateDoc(doc(db, 'userChats', authCtx.currentUserInfo.localId), {
                [chatCtx.combinedId + '.lastMessage']: message,
                [chatCtx.combinedId + '.date']: Timestamp.now().toDate().toISOString(),
            });
            
            await updateDoc(doc(db, 'userChats', chatCtx.user.localId), {
                [chatCtx.combinedId + '.lastMessage']: message,
                [chatCtx.combinedId + '.date']: Timestamp.now().toDate().toISOString()
            });
            setMessage('');
        }
    };

    return (
        <div className={classes.chatinput}>
            <form className={classes['chatinput_form']} onSubmit={submitHandler}>
                <input
                    type='text'
                    placeholder='Type Something...'
                    onChange={inputChangeHandler}
                    value={message} />

                <div className={classes['chatinput_form__actions']}>
                    {/* <input id='attach-button' type='file' style={{display: 'none'}}/> */}
                    <label htmlFor='attach-button'>
                        <img src={attach} alt='attach' />
                    </label>
                    <input id='attach-image-button' type='file' style={{ display: 'none' }} />
                    <label htmlFor='attach-image-button'>
                        <img src={img} alt='attach2' />
                    </label>
                    <button>Send</button>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;