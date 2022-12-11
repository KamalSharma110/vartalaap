import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";


const registerUser = async(displayNameInputRef, idToken) => {
    const displayName = displayNameInputRef.current.value;
        const storageRef = ref(storage, displayName);

        await uploadBytesResumable(
          storageRef,
          document.getElementById("avatar").files[0]
        );
        const downloadURL = await getDownloadURL(storageRef);

        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDJOkOpsUs2msvHNuckU-IXeqd1ff5JwiU",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: idToken,
              displayName: displayName,
              photoUrl: downloadURL,
              returnSecureToken: true,
            }),
          }
        );

        const userData = await response.json();

        await setDoc(doc(db, "users", userData.localId), {
          displayName: userData.displayName.toLowerCase(),
          email: userData.email,
          photoUrl: userData.photoUrl,
          localId: userData.localId,
        });

        await setDoc(doc(db, "userChats", userData.localId), {});
};

export default registerUser;