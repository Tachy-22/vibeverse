/* eslint-disable react/prop-types */

import { addDoc, collection, query } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useCallback, useEffect, useMemo, useRef } from "react";
import UseGetDoccument from "../../controls/hooks/useGetDoccument.js";
import { isRoomExisting } from "../../controls/functions/isRoomExisting";
import { useSelector, useDispatch } from "react-redux";
import { addNewRoom, updateRooms } from "../../../redux/slice";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UseRefreshUser from "../../controls/hooks/UseRefreshUser";

const AddRoom = ({ handleMenuClose }) => {
  const { room, rooms, currentUser } = useSelector((state) => state.app);
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

  const updateRoomsCondition =
    roomInputValue !== null &&
    roomInputValue !== "" &&
    !isRoomExisting(roomInputValue, roomNames);

  const previousRoom = useMemo(() => localStorage.getItem("current room"), []);

  useEffect(() => {
    if (roomInputValue !== "" && roomInputValue) {
      console.log("setting new room");
      localStorage.setItem("current room", roomInputValue);
    }
    if (roomInputValue === "") {
      previousRoom !== null && dispatch(addNewRoom(previousRoom));
    }
  }, [dispatch, previousRoom, room, roomInputValue]);

  useEffect(() => {
    dispatch(addNewRoom(roomInputValue));
  }, [dispatch, roomInputValue]);

  useEffect(() => {
    dispatch(updateRooms(doccument));
  }, [dispatch, doccument]);

  const handleRoomNavigation = useCallback(
    async (e) => {
      e.preventDefault();

      //  dispatch(addNewRoom(roomRef?.current?.value));

      try {
        //  dispatch(addNewRoom(roomInputValue));
        console.log("NEW ROOM NAVIGATED TO", "previousRoom", room);
        navigate(`/group/${room}`);
        console.log(
          "updateRoomsCondition",
          updateRoomsCondition,
          roomInputValue !== "",
          roomNames,
          "  isRoomExisting(roomInputValue, roomNames),",
          !isRoomExisting(roomInputValue, roomNames),
          " roomInputValue & !isRoomExisting(roomInputValue, roomNames)",
          roomInputValue !== "" && !isRoomExisting(roomInputValue, roomNames),
          currentUser?.user
        );
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
          console.log("NEW ROOM ADDED", ", previousRoom", previousRoom);
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
      updateRoomsCondition,
      roomInputValue,
      roomNames,
      currentUser?.user,
      doccumentRef,
      dispatch,
      doccument,
      previousRoom,
    ]
  );
  console.log(
    "rooms",
    rooms,
    roomNames
    // isRoomExisting(newRoom, roomNames)
  );

  console.log("dispatched room ", room);

  const handleRoomAddition = () => {
    if (room === "") {
      console.log("setting new room");
      localStorage.setItem("current room", room);
    }
    handleMenuClose();
  };
  console.log("room input:", roomInputValue);
  return (
    <form
      action=""
      className=" w-full bg-orange-100/40 backdrop-blur-md h-[10rem] p-1 text-black"
      onSubmit={handleRoomNavigation}
    >
      <input ref={roomRef} type="text" className=" border" />

      <button className="button" onClick={handleRoomAddition}>
        <span className="button-content">Add room </span>
      </button>

      <p className="">current room: {room}</p>
    </form>
  );
};

export default AddRoom;
