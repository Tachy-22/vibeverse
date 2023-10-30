import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

const IndividualChatRoom = () => {
  const [newMessage, setNewMessage] = useState("");
  const messageRef = collection(db, "messages");

  const handleMessageSending = async (e) => {
    e.preventDefault();
    try {
      if (newMessage === "") {
        return;
      } else {
        const messageObj = {
          text: newMessage,
          createdAt: serverTimestamp(),
          user: auth.currentUser.displayName,
        };
        await addDoc(messageRef, messageObj);
        console.log(newMessage);
        setNewMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form action="" className="" onSubmit={handleMessageSending}>
      <input
        type="text"
        className=" border"
        onChange={(e) => {
          setNewMessage(e.target.value);
        }}
        value={newMessage}
      />
      <button className="border" type="submit">
        {" "}
        Send message
      </button>
    </form>
  );
};

export default IndividualChatRoom;
