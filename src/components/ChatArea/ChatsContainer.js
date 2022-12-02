import Chat from "./Chat";
import classes from './ChatsContainer.module.css';

const ChatsContainer = () => {

return (
    <div className={classes['chats-container']}>
        <ul>
            <li><Chat /></li>
            <li><Chat /></li>
            <li><Chat /></li>
            <li><Chat /></li>
        </ul>
    </div>
);

};

export default ChatsContainer;