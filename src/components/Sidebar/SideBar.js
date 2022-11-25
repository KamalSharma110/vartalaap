import Contact from "./Contact";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import classes from './SideBar.module.css';

const SideBar = () => {
    return (
        <section className={classes.sidebar}>
            <NavBar />
            <SearchBar />
            <Contact />
        </section>
    );
};

export default SideBar;