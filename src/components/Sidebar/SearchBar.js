import classes from "./SearchBar.module.css";

const SearchBar = () => {
  return (
    <div className={classes.searchbar}>
      <input type="text" placeholder="Find a user" />
    </div>
  );
};

export default SearchBar;
