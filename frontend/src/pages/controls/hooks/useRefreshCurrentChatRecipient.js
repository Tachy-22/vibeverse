import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewChatRecipient } from "../../../redux/slice";
import { previousChatRecipient } from "../../../localstorage-config";

const useRefreshCurrentChatRecipient = (currentChatRecipient) => {
  const dispatch = useDispatch();
  console.log("previousChatRecipient", previousChatRecipient);
  useEffect(() => {
    if (currentChatRecipient === null) {
      dispatch(addNewChatRecipient(previousChatRecipient));
    }
  }, [currentChatRecipient, dispatch]);

  return;
};

export default useRefreshCurrentChatRecipient;
