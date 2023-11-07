import { onSnapshot } from "firebase/firestore";
import {
  useEffect,
  // useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   updateModalMessage,
//   updateModalVisibility,
// } from "../../../redux/slice";
//import { useSelector } from "react-redux";

const UseGetDoccument = (queryParams) => {
  const [doccument, setDoccument] = useState([]);
  const { currentUser, currentChatRecipient } = useSelector(
    (state) => state.app
  );
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const getSnapShot = async () => {
        onSnapshot(queryParams, (snapshot) => {
          //console.log(snapshot, "snapshot");
          let messages = [];
          snapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
          });

          setDoccument(messages);
        });
      };
      getSnapShot();
    } catch (error) {
      console.error(error);
    }
  }, [currentChatRecipient, currentUser?.user?.email, dispatch, queryParams]);

  return [doccument];
};

export default UseGetDoccument;
