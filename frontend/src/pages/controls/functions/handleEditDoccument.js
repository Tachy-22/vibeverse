import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../../firebase-config";

const handleEditDoccument = async (collectionName, docId, newMessage) => {
  // Add a new document with a generated id.
  await updateDoc(doc(db, `${collectionName}`, `${docId}`), {
    text: `${newMessage}`,
  });
  console.log("Document written with ID: ", collectionName, docId, newMessage);
  return;
};

export default handleEditDoccument;
