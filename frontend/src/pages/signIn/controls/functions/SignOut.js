import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase-config";
import { cookies } from "../../../../cookies-config";
import { clearLocaltorage } from "../../../chatRooms/controls/functions";

const SignOut = () => {
  cookies.remove("auth-token");
 clearLocaltorage(); 
  signOut(auth)
    .then(() => {
      console.log("sined out");
      cookies.remove("auth-token");
    })
    .catch((error) => {
      console.log(error);
    });
  return;
};

export default SignOut;
