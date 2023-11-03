import { signOut } from "firebase/auth";
import { auth, db } from "../../../../firebase-config";
import { cookies } from "../../../../cookies-config";
import { clearLocaltorage } from "../../../chatRooms/controls/functions";
import { doc, updateDoc } from "firebase/firestore";

const SignOut = (currentUser) => {
  //clock out
  const clockOut = async () => {
    console.log(`clocking ${currentUser.user.displayName} out`);
    const usersRef = doc(db, "users", `${currentUser.id}`);
    await updateDoc(usersRef, {
      isLogedIn: false,
    });
  };
  clockOut();
  cookies.remove("auth-token");
  clearLocaltorage();
  signOut(auth)
    .then(async () => {
      console.log("sined out");
      cookies.remove("auth-token");
    })
    .catch((error) => {
      console.log(error);
    });
  return;
};

export default SignOut;
