import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

const handleDeleteDoccument = async (collectionName, docId) => {
  await deleteDoc(doc(db, `${collectionName}`, `${docId}`));
  console.log("mesage deleted");
  return;
};

export default handleDeleteDoccument;
