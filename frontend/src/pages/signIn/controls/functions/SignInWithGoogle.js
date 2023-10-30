import { cookies } from "../../../../cookies-config";
import { auth, provider } from "../../../../firebase-config";
import { signInWithPopup } from "firebase/auth";

const signInWithGoogle = async (setAuth) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const refreshToken = result.user.refreshToken;
    // Serialize the object to a JSON string
    const serializedUser = JSON.stringify(result);
    console.log("serializedUser", serializedUser);
    // Store the serialized object in local storage
    localStorage.setItem("recent user", serializedUser);
    cookies.set("auth-token", refreshToken);
    console.log(result);
    setAuth(true);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default signInWithGoogle;
