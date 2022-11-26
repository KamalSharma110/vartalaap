import classes from './Contact.module.css';
import ContactImg from '../../img/contact-profile-pic.jpg';

const Contact = () => {
    return (
        <div className={classes.contact}>
            <img src={ContactImg} alt='contact-1'/>
            <div className={classes['contact-info']}>
                <span>John</span>
                <span>Okay. Let's go tomorrow</span>
            </div>
        </div>
    );
};

export default Contact;