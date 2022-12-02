import classes from './ChatArea.module.css';
import ChatAreaHeader from './ChatAreaHeader';
import ChatInput from './ChatInput';
import ChatsContainer from './ChatsContainer';

const ChatArea = () => {
    return (
        <section className={classes.chatarea}>
            <ChatAreaHeader />
            <ChatsContainer />
            <ChatInput />
        </section>
    );
};

export default ChatArea;