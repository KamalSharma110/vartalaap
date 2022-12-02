import dp from '../../img/profile-pic.jpg';
import classes from './Chat.module.css';

const Chat = () => {

    return (
        <div className={classes.chat}>
            <div>
                <img src={dp} alt=''/>
                <span>dummy text</span>
            </div>
            <span>just now</span>
        </div>
    );

};

export default Chat;
