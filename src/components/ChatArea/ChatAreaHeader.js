import classes from './ChatAreaHeader.module.css';
import cam from '../../img/cam.png';
import more from '../../img/more.png';
import add from '../../img/add.png';

const ChatAreaHeader = () => {
    return (
        <div className={classes.chatareaheader}>
            <span>John</span>
            <div className={classes['chatareaheader_options']}>
                <img src={cam} alt='video call' />
                <img src={add} alt='add contact' />
                <img src={more} alt='more options' />
            </div>
        </div>
    );
};

export default ChatAreaHeader;