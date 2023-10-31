import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewChat } from "../../../redux/slice";
import { recentChat } from "../../../localstorage-config";

const useRefreshChat = (curentChat) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (curentChat === null) {
      dispatch(addNewChat(recentChat));
    }
  }, [curentChat, dispatch]);

  return;
};

export default useRefreshChat;
