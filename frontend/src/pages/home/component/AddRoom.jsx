/* eslint-disable react/prop-types */

import { addDoc, collection, query } from "firebase/firestore";
import { auth, db } from "../../../firebase-config";
import { useCallback, useEffect, useMemo, useRef } from "react";
import UseGetDoccument from "../../controls/hooks/useGetDoccument.js";
import { isRoomExisting } from "../../controls/functions/isRoomExisting";
import { useSelector, useDispatch } from "react-redux";
import { addNewRoom, updateRooms } from "../../../redux/slice";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddRoom = ({ handleMenuClose }) => {
  const { room, rooms } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doccumentRef = useMemo(() => collection(db, "rooms"), []);
  const queryParams = useMemo(() => query(doccumentRef), [doccumentRef]);

  const roomRef = useRef(null);

  const [doccument] = UseGetDoccument(queryParams);

  const roomNames = useMemo(() => {
    return doccument.map((obj) => obj.name?.trim().toLowerCase());
  }, [doccument]);

  const updateRoomsCondition = room !== "" && !isRoomExisting(room, roomNames);
  const previousRoom = useMemo(
    () => (room === "" ? localStorage.getItem("current room") : room),
    [room]
  );

  useEffect(() => {
    if (room !== "") {
      console.log("setting new room");
      localStorage.setItem("current room", room);
    }
    if (room === "") {
      dispatch(addNewRoom(previousRoom));
    }
  }, [dispatch, previousRoom, room]);

  useEffect(() => {
    dispatch(updateRooms(doccument));
  }, [dispatch, doccument]);

  const handleMessageSending = useCallback(
    async (e) => {
      e.preventDefault();

      dispatch(addNewRoom(roomRef.current.value));
      console.log("NEW ROOM NAVIGATED TO", ", previousRoom", room);
      navigate(`/group/${room}`);
      try {
        if (updateRoomsCondition) {
          const messageObj = {
            name: room,
            createdBy: auth.currentUser.displayName,
          };
          await addDoc(doccumentRef, messageObj);
          // console.log(room, auth.currentUser);

          console.log("NEW ROOM ADDED", ", previousRoom", previousRoom);
        } else {
          return;
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, room, navigate, updateRoomsCondition, doccumentRef, previousRoom]
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

  return (
    <form
      action=""
      className=" w-full bg-orange-100/40 backdrop-blur-md h-[10rem] p-1 text-black"
      onSubmit={handleMessageSending}
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
