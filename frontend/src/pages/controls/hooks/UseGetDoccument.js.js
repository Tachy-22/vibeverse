import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UseGetDoccument = (queryParams) => {
  const [doccument, setDoccument] = useState([]);
  const { currentUser, currentChatRecipient } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    try {
      const getSnapShot = async () => {
        onSnapshot(queryParams, (snapshot) => {
          console.log(snapshot, "snapshot");
          let messages = [];
          snapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
          });
          setDoccument(messages);
          console.log(
            "NEW DOCCUMENT SENT",
            "messages",
            messages[messages.length - 1].email,
            currentChatRecipient,
            currentUser.user.email
          );
          currentUser.user.email !== messages[messages.length - 1].email &&
            messages[messages.length - 1].email &&
            alert(`New Message from ${messages[messages.length - 1].email}`);
        });
      };
      getSnapShot();
    } catch (error) {
      console.error(error);
    }
  }, [currentChatRecipient, currentUser, queryParams]);

  return [doccument];
};

export default UseGetDoccument;
