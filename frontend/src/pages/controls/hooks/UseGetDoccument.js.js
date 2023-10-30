import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const UseGetDoccument = (queryParams) => {
  const [doccument, setDoccument] = useState([]);
  console.log("got here");
  useEffect(() => {
    try {
      onSnapshot(queryParams, (snapshot) => {
        console.log(snapshot, "snapshot");
        let messages = [];
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setDoccument(messages);
        console.log("NEW MESSAGE SENT");
      });
    } catch (error) {
      console.error(error);
    }
  }, [queryParams]);

  return [doccument];
};

export default UseGetDoccument;
