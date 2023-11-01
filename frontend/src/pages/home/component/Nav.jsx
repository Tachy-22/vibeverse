/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from "react";
import { LogoMobile } from "../../../components/Logo";
import { BiSearchAlt2, BiMessageAdd } from "react-icons/bi";
import AddRoom from "./AddRoom";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Nav = () => {
  const [menuDisplayArr, setMenuDisplayArray] = useState([false, false]);
  const [userProfileImgURL, setUserProfileImgURL] = useState("");
  const { currentUser } = useSelector((state) => state.app);

  const user = useMemo(() => currentUser?.user, [currentUser?.user]);

  useEffect(() => {
    const photoURL = user?.photoURL;
    setUserProfileImgURL(photoURL);
  }, [user]);

  const handleRoomSearchOpen = useCallback(() => {
    setMenuDisplayArray((prev) => [false, !prev[1]]);
  }, []);
  const handleMenuClose = useCallback(() => {
    setMenuDisplayArray([false, false]);
  }, []);
  const handleRoomAddOpen = useCallback(() => {
    setMenuDisplayArray((prev) => [!prev[0], false]);
  }, []);
  console.log("userProfileImgURL", userProfileImgURL, user);
  return (
    <div className=" flex justify-between flex-col border-b bg-black">
      <div className="flex items-center  justify-between z-30 bg-black pt-[1rem] px-[1rem]">
        <Link className="" to="/profile">
          <img
            src={userProfileImgURL}
            alt=""
            className=" w-[3rem] h-[3rem] rounded-full"
          />
        </Link>
        <div className=" border bg-white/20  flex justify-center items-center rounded-s-[2rem] mx-auto  rounded-e-[2rem] w-fit pl-[0.7rem] py-[0.25rem] pb-[0.4rem] pr-[0.5rem] hover:scale-[105%] ">
          <LogoMobile />
        </div>
        <div className="flex gap-2">
          <div
            onClick={handleRoomAddOpen}
            className={`${
              menuDisplayArr[0] ? " border-y" : ""
            } bg-orange-300/20 rounded-lg flex justify-center h-fit p-1 items-center "`}
          >
            <BiMessageAdd className="text-xl " />
          </div>
          <div
            onClick={handleRoomSearchOpen}
            className={`${
              menuDisplayArr[1] ? " border-y" : ""
            } bg-orange-300/20 rounded-lg flex justify-center h-fit p-1 items-center "`}
          >
            <BiSearchAlt2 className="text-xl" />
          </div>
        </div>
      </div>
      <div
        className={`
         justify-end py-2 w-full flex relative z-20`}
      >
        <div
          className={`${
            menuDisplayArr[0] ? "translate-y-[10%]" : "-translate-y-[200%]"
          }  w-full lg:w-[20rem]   transition-all duration-1000 absolute right-0`}
        >
          <AddRoom handleMenuClose={handleMenuClose} />
        </div>
        <div
          className={`${
            menuDisplayArr[1] ? "translate-y-[10%]" : "-translate-y-[200%]"
          } w-full backdrop-blur-md h-[10rem]   bg-orange-100/40  lg:w-[20rem] absolute right-0  transition-all duration-1000 "`}
        >
          {" "}
          <input
            onBlur={handleMenuClose}
            type="text"
            className={`px-2 rounded-lg outline-none text-black`}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
