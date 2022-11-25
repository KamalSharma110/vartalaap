import Sidebar from './Sidebar/SideBar';
import ChatArea from './ChatArea';

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