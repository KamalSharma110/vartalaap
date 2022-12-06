import classes from './Error.module.css';

const Error = (props) => {
    return (
        <div className={classes['error']}>
            <span>{props.errorMessage}</span>
            <button onClick={ () => window.location.reload() }>Refresh</button>
        </div>
    );
};

export default Error;