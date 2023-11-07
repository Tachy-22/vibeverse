/* eslint-disable react/prop-types */
import { AiTwotoneDelete, AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import handleDeleteDoccument from "../../controls/functions/handleDeleteDoccument";
import { useCallback, useState } from "react";
import handleEditDoccument from "../../controls/functions/handleEditDoccument";
import TextareaAutosize from "react-textarea-autosize";

const EditMessage = ({ collection, message }) => {
  const [isInputOpen, setInputOpen] = useState(false);

  const handleDeleteClick = useCallback(async () => {
    handleDeleteDoccument(collection, message.id);
  }, [collection, message.id]);

  const handleEditClick = useCallback(
    (e) => {
      handleEditDoccument(collection, message.id, `${e.target.value}`);
    },
    [collection, message.id]
  );

  const handleEditInutOpen = () => {
    setInputOpen(true);
  };
  return (

    <div
      // onMouseLeave={handleEditTabClose}
      className="w-max text-gray-500 right-[0rem] flex flex-col rounded absolute -bottom-[1rem] z-10 justify-end h-max  bg-white/90  p-1 "
    >
      {!isInputOpen && (
        <div className="flex gap-2 flex-col h-full">
          <div className="" onClick={handleEditInutOpen}>
            <AiOutlineEdit className="text-xl text-blue-500 hover:bg-blue-400 hover:text-white  rounded" />
          </div>

          <div className="" onClick={handleDeleteClick}>
            <AiTwotoneDelete className="text-xl hover:bg-red-400 hover:text-white text-red-400  rounded" />
          </div>
        </div>
      )}
      {isInputOpen && (
        <div className=" flex gap-2 border">
          <TextareaAutosize
            name="message"
            id="message"
            type="text"
            className="w-full border border-emerald-950 p-1  rounded"
            onBlur={handleEditClick}
            maxRows={3}
            minRows={1}
          />
          <button className="button w-fit">
            <span className="button-content">
              <AiOutlineCheck />{" "}
            </span>{" "}
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default EditMessage;
