import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <>
      <div className={classes.backdrop}></div>
      <div className={classes["error-modal"]}>
        <ion-icon name="close-circle"></ion-icon>
        <h2>{props.errorMessage}</h2>
        <button onClick={() => props.onClose(null)}>Close</button>
      </div>
    </>
  );
};

export default ErrorModal;
