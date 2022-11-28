import { useContext } from 'react';
import AuthContext from '../../store/auth-store';

import dp from '../../img/profile-pic.jpg';
import classes from './NavBar.module.css';

const NavBar = () => {
    const authCtx = useContext(AuthContext);

    return (
        <div className={classes.nav}>
            <span>Chat App</span>
            <div className={classes['nav_user-info']}>
                <img src={dp} alt='current user'/>
                <span>Kamal Sharma</span>
                <button onClick={() => {authCtx.logout()}}>Logout</button>
            </div>
        </div>
    );
};

export default NavBar;