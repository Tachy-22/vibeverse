import { cookies } from "../../../../cookies-config";
import { auth, provider } from "../../../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { handleDoccumentAddition } from "../../../controls/functions/handleDoccumentAddition";
import {  serverTimestamp,  } from "firebase/firestore";
import { isUserExisting } from "../../../controls/functions/isUserExisting";

const signInWithGoogle = async (setIsAuth, doccumentRef, users) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const refreshToken = result.user.refreshToken;
    // Serialize the object to a JSON string
    const serializedUser = JSON.stringify(result);
    console.log("serializedUser", serializedUser);
    // Store the serialized object in local storage
    localStorage.setItem("recent user", serializedUser);
   
    console.log("user email", result.user.email);
    // !isUserExisting(result.user.email, users) &&
    handleDoccumentAddition(
      {
        createdAt: serverTimestamp(),
        user: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
      },
      doccumentRef,
      isUserExisting(result.user.email, users)
    );
    cookies.set("auth-token", refreshToken);

    setIsAuth(true);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default signInWithGoogle;
