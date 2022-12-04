import classes from './Chat.module.css';

const Chat = props => {

    const {received, photoUrl, text, date, img} = props;

    return (
        <div 
        className={`${classes.chat} ${received ? '' : classes["float_right"]}`}
        style={{alignItems: `${received ? 'start': 'end'}`}}
        >
            <img src={img} alt='' id={classes['received_image']}/>
            <div>
                <img src={photoUrl} alt=''/>
                <span>{text}</span>
            </div>
            <span style={{float: `${!received ? 'right':'none'}`}}>{date}</span>
        </div>
    );

};

export default Chat;
