import classes from './ChatArea.module.css';
import ChatAreaHeader from './ChatAreaHeader';
import ChatInput from './ChatInput';

const ChatArea = () => {
    return (
        <section className={classes.chatarea}>
            <ChatAreaHeader />
            <ChatInput />
        </section>
    );
};

export default ChatArea;