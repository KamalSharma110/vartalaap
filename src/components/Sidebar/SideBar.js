import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import classes from './SideBar.module.css';
import UserCardList from "./UserCardList";

const SideBar = () => {
    return (
        <section className={classes.sidebar}>
            <NavBar />
            <SearchBar />
            <UserCardList />
        </section>
    );
};

export default SideBar;