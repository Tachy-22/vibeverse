import { addDoc } from "firebase/firestore";


export const handleDoccumentAddition = async (
  doccumentObj,
  doccumentRef,
  condition,
  cleanUp
) => {
  try {
    if (condition) {
      return;
    } else {
      console.log("adding docc");
      await addDoc(doccumentRef, doccumentObj);
      cleanUp();
    }
  } catch (error) {
    console.error(error);
  }
};
