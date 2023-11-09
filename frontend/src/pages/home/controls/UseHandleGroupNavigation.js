import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addNewRoom } from "../../../redux/slice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UseHandleGroupNavigation = (room, isClicked) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState(room);

  const handleGroupNav = useCallback(() => {
    dispatch(addNewRoom(roomName));
    navigate(`/group/${roomName.toLowercase()}`);
  }, [dispatch, navigate, roomName]);

  isClicked && handleGroupNav();
  return [setRoomName];
};

export default UseHandleGroupNavigation;
