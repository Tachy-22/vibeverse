import { useSelector } from "react-redux";
import UseHandleGroupNavigation from "../controls/UseHandleGroupNavigation";
import { useState } from "react";

const AllGroups = () => {
  const { rooms, room } = useSelector((state) => state.app);
  const [isClicked, setIsClicked] = useState(false);
  const [setRoomName] = UseHandleGroupNavigation(room, isClicked);

  return (
    <div className=" p-5 gap-[0.5rem] flex flex-col ">
      {" "}
      {rooms.map((room, index) => {
        return (
          <div
            onClick={(e) => {
              setIsClicked(true);
              setRoomName(e.target.innerText);
            }}
            className="capitalize bg-white/30 backdrop-blur-3xl p-1 rounded hover:bg-white hover:cursor-pointer "
            key={index}
          >
            {room.name} 
          </div>
        );
      })}
    </div>
  );
};

export default AllGroups;
