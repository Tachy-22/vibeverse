/* eslint-disable react/prop-types */
import { GrSend } from "react-icons/gr";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  collection,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { formatTimestamp } from "./controls/functions";
import UseGetDoccument from "../controls/hooks/useGetDoccument.js.js";
import { useDispatch, useSelector } from "react-redux";
import { addNewRoom } from "../../redux/slice";
import { Link } from "react-router-dom";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.app);
  const [newMessage, setNewMessage] = useState("");
  const textAreaRef = useRef(null);
  console.log("group room", room);

  const doccumentRef = useMemo(() => collection(db, "room-conversations"), []);
  const queryParams = useMemo(
    () =>
      query(doccumentRef, where("newRoom", "==", room), orderBy("createdAt")),
    [doccumentRef, room]
  );
  const [doccument] = UseGetDoccument(queryParams);
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

  const handleMessageSending = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (newMessage === "" && room === "") {
          return;
        } else {
          const messageObj = {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            userUrl: auth.currentUser.photoURL,
            newRoom: room,
          };
          await addDoc(doccumentRef, messageObj);
          console.log(newMessage, room);
          setNewMessage("");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [doccumentRef, newMessage, room]
  );
  console.log("messages", doccument);
  return (
    <div className=" backdrop-brightness-50 backdrop-blur-sm  relative h-screen overflow-hidden  ">
      <div className=" h-full  letters-bg  overflow-hidden  w-full relative xl:w-[40rem] lg:w-1/2 md:w-[30rem] mx-auto ">
        <div className="bg-transparent   overflow-y-scroll  h-full ">
          <div className=" flex justify-start backdrop-blur-3xl w-full border-b border-black/10 bg-orange-100   sticky top-0 py-2">
            <Link to="/">
              <div className="pl-4">
                <RiArrowGoBackFill className="text-xl font-thin text-gray-500" />
              </div>
            </Link>

            <div className="w-full justify-center flex">
              <h2 className="">{room.toUpperCase()}</h2>
            </div>
          </div>
          <div className="h-max  py-2  px-[0.5rem] mb-[8rem] ">
            {doccument.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`" ${
                    auth.currentUser.displayName === message.user
                      ? "justify-end "
                      : " justify-start"
                  } flex items-start gap-4 px-3 "`}
                >
                  <div className=" ">
                    {auth.currentUser.displayName !== message.user && (
                      <img
                        src={message.userUrl}
                        alt=""
                        className="rounded-full w-[2.5rem] h-[2.5rem]"
                      />
                    )}
                  </div>
                  <div className="max-w-[80%] w-fit flex flex-col">
                    <div
                      className={`" ${
                        auth.currentUser.displayName === message.user
                          ? "rounded-s-xl bg-blue-400 text-white"
                          : "rounded-e-xl bg-white  "
                      }  p-3 rounded-t-xl  "`}
                    >
                      <p>{message.text}</p>
                    </div>
                    <p
                      className={`" text-gray-300 py-2 text-[0.7rem]  ${
                        auth.currentUser.displayName === message.user
                          ? "text-end"
                          : ""
                      }  "`}
                    >
                      {formatTimestamp(message.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <form
          action=""
          className="  absolute bottom-0 text-black  w-full my-8   flex justify-center  "
          onSubmit={handleMessageSending}
        >
          <div className="bg-white/30  lg:w-[85%] flex   w-[80%]  rounded-xl backdrop-blur-xl">
            {" "}
            <textarea
              ref={textAreaRef}
              type="text"
              className="outline-none w-full bg-transparent px-2 py-2"
              onChange={() => {
                setNewMessage(textAreaRef.current.value);
              }}
            />
            <button
              className=" p-3 border-white h-full relative   hover:scale-105"
              type="submit"
              onClick={() => {
                textAreaRef.current.value = "";
              }}
            >
              <GrSend className="text-2xl  text-white  p-1 scale-125" />
              <div className="w-full top-0 bottom-0 h-full right-0 absolute  blur bg-orange-100/20 mx-auto  rounded-full"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
