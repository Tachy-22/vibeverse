import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initiateCurrentUser } from "../../../redux/slice";
import { recentUser, serializedUser } from "../../../localstorage-config";

const UseRefreshUser = (currentUser) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser === null) {
      dispatch(initiateCurrentUser(recentUser));
      //console.log("current user is :", currentUser);
    }
    if (currentUser !== null) {
     // console.log("recentUser", recentUser);
      localStorage.setItem("recent chat", serializedUser);
    }
  }, [currentUser, dispatch]);
  return;
};

export default UseRefreshUser;
