import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import UseHandleGroupNavigation from "../controls/UseHandleGroupNavigation";
import { Link } from "react-router-dom";

const MyGroups = () => {
  const { rooms, currentUser, room } = useSelector((state) => state.app);

  const [isClicked, setIsClicked] = useState(false);
  const [setRoomName] = UseHandleGroupNavigation(room, isClicked);

  const roomRef = useRef();
  const myGroupRooms = rooms.filter(
    (room) => room.createdBy === currentUser.user.email
  );

  console.log("roomRef", roomRef);
  return (
    <div className=" p-5 gap-[0.5rem] flex flex-col h-full">
      {" "}
      {myGroupRooms.map((room, index) => {
        return (
          <div
            onClick={(e) => {
              setIsClicked(true);
              setRoomName(e.target.innerText.toLowerCase());
            }}
            className="capitalize bg-white/30 backdrop-blur-3xl p-1 rounded hover:bg-white hover:cursor-pointer "
            key={index}
          >
            {room.name}
          </div>
        );
      })}
      {myGroupRooms.length === 0 && (
        <div>
          You have not created any groups?, create or browse through the available ones in  one in{" "}
          <Link to="/home/all" className=" hover:text-blue-700 underline">
            All
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyGroups;
