/* eslint-disable react/prop-types */

import { addDoc, collection, query } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useCallback, useEffect, useMemo, useRef } from "react";
import UseGetDoccument from "../../controls/hooks/UseGetDoccument.js";
import { isRoomExisting } from "../../controls/functions/isRoomExisting";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewRoom,
  // updateModalMessage,
  // updateModalVisibility,
  updateRooms,
} from "../../../redux/slice";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UseRefreshUser from "../../controls/hooks/UseRefreshUser";

const AddRoom = ({ handleMenuClose }) => {
  const { room, currentUser, isModalVisible } = useSelector(
    (state) => state.app
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  UseRefreshUser(currentUser);

  const doccumentRef = useMemo(() => collection(db, "rooms"), []);
  const queryParams = useMemo(() => query(doccumentRef), [doccumentRef]);

  const roomRef = useRef(null);
  const roomInputValue = roomRef.current?.value;

  const [doccument] = UseGetDoccument(queryParams);

  const roomNames = useMemo(() => {
    return doccument.map((obj) => obj.name?.trim().toLowerCase());
  }, [doccument]);

  const previousRoom = useMemo(
    () =>
      localStorage.getItem("current room") === ""
        ? null
        : localStorage.getItem("current room"),
    []
  );

  useEffect(() => {
    if (roomInputValue !== "" && roomInputValue) {
      localStorage.setItem("current room", roomInputValue);
    }
    if (roomInputValue === "") {
     
      previousRoom !== null && dispatch(addNewRoom(previousRoom));
    }
  }, [dispatch, previousRoom, room, roomInputValue]);

  useEffect(() => {
    previousRoom !== null && dispatch(addNewRoom(roomInputValue));
  }, [dispatch, previousRoom, roomInputValue]);

  useEffect(() => {
    dispatch(updateRooms(doccument));
  }, [dispatch, doccument]);

  const handleRoomNavigation = useCallback(
    async (e) => {
      e.preventDefault();

      //  dispatch(addNewRoom(roomRef?.current?.value));

      try {
        //  dispatch(addNewRoom(roomInputValue));
        // console.log("NEW ROOM NAVIGATED TO", "previousRoom", room);
        roomInputValue !== "" && navigate(`/group/${room}`);

        if (
          roomInputValue !== "" &&
          !isRoomExisting(roomInputValue, roomNames)
        ) {
          const messageObj = {
            name: room,
            createdBy: currentUser.user?.displayName,
          };
          await addDoc(doccumentRef, messageObj);
          // console.log(room, currentUser.user);
          dispatch(updateRooms(doccument));
          // console.log("NEW ROOM ADDED", ", previousRoom", previousRoom);
        } else {
          return;
        }
      } catch (error) {
        console.error(error);
      }
    },
    [
      room,
      navigate,
      roomInputValue,
      roomNames,
      currentUser.user,
      doccumentRef,
      dispatch,
      doccument,
    ]
  );

  const handleRoomAddition = () => {
    if (room === "") {
      localStorage.setItem("current room", room);
    }
    // if (roomInputValue === "") {
    //   dispatch(updateModalVisibility(true)) &&
    //     dispatch(updateModalMessage("Enter a valid room !"));
    // }
    !isModalVisible && handleMenuClose();
  };

  return (
    <form
      action=""
      className=" flex flex-col bg-orange-100/40 backdrop-blur-md h-fit p-2"
      onSubmit={handleRoomNavigation}
    >
      <p className="text-sm text-black">Create a new room ?</p>
      <div className=" w-full items-center    text-black gap-2 flex justify-between">
        <input
          ref={roomRef}
          type="text"
          className=" border border-black h-fit w-full rounded-md"
        />

        <button
          className="button flex w-max justify-center items-center flex-grow"
          onClick={handleRoomAddition}
        >
          <span className="button-content w-max flex-grow flex justify-center ">
            create{" "}
          </span>
        </button>
      </div>
      {/* <p className="">Previous room: {room}</p> */}
    </form>
  );
};

export default AddRoom;
