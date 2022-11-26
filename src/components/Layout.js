import Sidebar from './Sidebar/SideBar';
import ChatArea from './ChatArea/ChatArea.js';

import classes from './Layout.module.css';

const Layout = () => {
    
    return (
        <main className={classes['main-container']}>
            <Sidebar></Sidebar>
            <ChatArea></ChatArea>
        </main>
    );
};

export default Layout;