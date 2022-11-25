import dp from '../../img/profile-pic.jpg';
import classes from './NavBar.module.css';

const NavBar = () => {
    return (
        <div className={classes.nav}>
            <span>Chat App</span>
            <div className={classes['nav_user-info']}>
                <img src={dp} alt='current user'/>
                <span>Kamal Sharma</span>
                <button>Logout</button>
            </div>
        </div>
    );
};

export default NavBar;