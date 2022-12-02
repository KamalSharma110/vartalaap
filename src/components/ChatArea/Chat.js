import classes from './Chat.module.css';

const Chat = props => {

    return (
        <div className={classes.chat}>
            <div>
                <img src={props.photoUrl} alt=''/>
                <span>{props.text}</span>
            </div>
            <span>{props.date}</span>
        </div>
    );

};

export default Chat;
