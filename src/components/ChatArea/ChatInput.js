import classes from './ChatInput.module.css';
import attach from '../../img/attach.png';
import img from '../../img/img.png';

const ChatInput = () => {
    return (
        <div className={classes.chatinput}>
            <form className={classes['chatinput_form']}>
                <input type='text' placeholder='Type Something...'/>
                <div className={classes['chatinput_form__actions']}>
                    {/* <input id='attach-button' type='file' style={{display: 'none'}}/> */}
                    <label htmlFor='attach-button'>
                        <img src={attach} alt='attach' />
                    </label>
                    <input id='attach-image-button' type='file' style={{display: 'none'}}/>
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