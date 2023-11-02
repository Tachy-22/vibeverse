/* eslint-disable react/prop-types */

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateModalVisibility } from "../redux/slice";

const Modal = () => {
  const dispatch = useDispatch();
  const {isModalVisible, modalMessage} = useSelector((state) => state.app);

  const handleModalClick = useCallback(() => {
    dispatch(updateModalVisibility(false));
  }, [dispatch]);

  return (
    <div
      className={`${
        isModalVisible ? "flex" : "hidden"
      } h-screen w-screen backdrop-brightness-[20%] backdrop-blur-[1px] z-50  justify-center items-center fixed  top-0 right-0 bottom-0 mx-auto left-0"`}
    >
      <div className="w-[20rem] h-[10rem] bg-white rounded-md flex flex-col justify-between items-end ">
        <p className="w-full text-center flex items-center justify-center border h-full">{modalMessage}</p>
        <div className="p-4">
          <button onClick={handleModalClick} className="button w-fit">
            <span className="button-content">ok </span>{" "}
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Modal;
