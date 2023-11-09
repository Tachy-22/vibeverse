/* eslint-disable react/prop-types */
import { GrSend } from "react-icons/gr";
import { RiArrowGoBackFill } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  // addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  collection,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { formatTimestamp } from "./controls/functions";
import UseGetDoccument from "../controls/hooks/UseGetDoccument";
import { useDispatch, useSelector } from "react-redux";
import { addNewRoom } from "../../redux/slice";
import { Link, useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";

import { handleDoccumentAddition } from "../controls/functions/handleDoccumentAddition";
import UseRefreshUser from "../controls/hooks/UseRefreshUser";
import LoaderSpinner from "../../components/LoaderSpinner";
import { ErrorBoundary } from "react-error-boundary";
import SignUpRedirect from "../error/SignUpRedirect";
import EditMessage from "./components/EditMessage";
import { BiDotsVerticalRounded } from "react-icons/bi";
import handleDeleteDoccument from "../controls/functions/handleDeleteDoccument";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    room,
    currentUser,
    //currentChat
  } = useSelector((state) => state.app);
  UseRefreshUser(currentUser);

  const [messageToEdit, setMessageToEdit] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingTabVisible, setEditingTabVisibility] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const textAreaRef = useRef(null);

  const doccumentRef = useMemo(() => collection(db, "room-conversations"), []);
  const messageAdditionContion = useMemo(
    () => newMessage === "" && room === "",
    [newMessage, room]
  );

  const user = useMemo(() => currentUser?.user, [currentUser]);

  const messageObj = useMemo(
    () => ({
      text: newMessage,
      createdAt: serverTimestamp(),
      displayName: user?.displayName,
      email: user?.email,
      userUrl: user?.photoURL,
      newRoom: room,
    }),
    [newMessage, room, user?.displayName, user?.email, user?.photoURL]
  );
  const messageSendingCleanUp = useCallback(() => {
    setNewMessage("");
  }, []);

  const chatRoomMessagesQueryParams = useMemo(
    () =>
      query(doccumentRef, where("newRoom", "==", room), orderBy("createdAt")),
    [doccumentRef, room]
  );

  const handleMessageSending = useCallback(
    (e) => {
      e.preventDefault();
      handleDoccumentAddition(
        messageObj,
        doccumentRef,
        messageAdditionContion,
        messageSendingCleanUp
      );
      ////console.log(messageObj, "messageObj");
    },
    [doccumentRef, messageAdditionContion, messageObj, messageSendingCleanUp]
  );

  const handleMessageChange = useCallback(() => {
    setNewMessage(textAreaRef.current.value);
  }, []);

  const [chatRoomMessages] = UseGetDoccument(chatRoomMessagesQueryParams);
  const previousRoom = useMemo(
    () => (room === "" ? localStorage.getItem("current room") : room),
    [room]
  );

  useEffect(() => {
    if (room !== "") {
      //console.log("setting new room");
      localStorage.setItem("current room", room);
    }
    if (room === "") {
      dispatch(addNewRoom(previousRoom));
    }
  }, [dispatch, previousRoom, room]);
  //console.log("doccuments :", doccument);

  const handleEditTabOpen = (e) => {
    setMessageToEdit(e.target.innerText);
    setEditingTabVisibility(false);
    //console.log(e.target.innerText);
  };

  const handleEditTabClose = () => {
    setMessageToEdit(null);
    setEditingTabVisibility(false);
  };

  const handleEditingTabVisibility = () => {
    setEditingTabVisibility((prev) => !prev);
  };

  const roomRef = useMemo(() => collection(db, "rooms"), []);

  const roomDataqueryParams = useMemo(
    () => query(roomRef, where("name", "==", room.toLowerCase())),
    [roomRef, room]
  );

  const [roomDataDoc] = UseGetDoccument(roomDataqueryParams);

  const handleRoomDelete = useCallback(() => {
    handleDeleteDoccument("rooms", roomDataDoc[0].id);
    navigate("/home/");
  }, [navigate, roomDataDoc]);

  console.log(roomDataDoc);
  return (
    <ErrorBoundary FallbackComponent={<LoaderSpinner />}>
      {currentUser ? (
        <div className=" backdrop-brightness-50 backdrop-blur-sm  relative h-screen overflow-hidden  ">
          <div className=" h-full  letters-bg  overflow-hidden  w-full relative xl:w-[40rem] lg:w-1/2 md:w-[90%] mx-auto ">
            {isMenuOpen && (
              <div
                onClick={handleRoomDelete}
                className=" flex absolute items-center top-0 gap-2 right-0 mt-[2.7rem] mr-1 rounded-md z-40  backdrop-blur-3xl p-3"
              >
                <p className="">Delete room</p>
                <div className="">
                  <AiTwotoneDelete className="text-xl hover:bg-red-400 hover:text-white text-red-400  rounded" />
                </div>
              </div>
            )}
            <div className="bg-transparent   overflow-y-scroll  h-full ">
              <div className=" flex justify-start backdrop-blur-3xl w-full border-b border-black/10 bg-orange-100   sticky top-0 py-2">
                <Link to="/home">
                  <div className="pl-4">
                    <RiArrowGoBackFill className="text-xl font-thin text-gray-500" />
                  </div>
                </Link>

                <div className="w-full justify-center flex">
                  <h2 className="">{room.toUpperCase()}</h2>
                </div>
                {currentUser.user.email === roomDataDoc[0]?.createdBy && (
                  <div
                    onClick={() => {
                      setIsMenuOpen((prev) => !prev);
                    }}
                    className="px-2 hover:bg-white/30 rounded flex items-center justify-center"
                  >
                    <BiDotsVerticalRounded />
                  </div>
                )}
              </div>
              <div className="h-max  py-2  px-[0.5rem] mb-[8rem] ">
                {chatRoomMessages.map((message, index) => {
                  return (
                    <div
                      onMouseLeave={handleEditTabClose}
                      key={index}
                      className={`" ${
                        currentUser.user.email === message.email
                          ? "justify-end "
                          : " justify-start"
                      } flex items-start gap-4 px-3 relative "`}
                    >
                      <div className=" ">
                        {currentUser.user.email !== message.email && (
                          <img
                            src={message.userUrl}
                            alt=""
                            className="rounded-full w-[2.5rem] h-[2.5rem]"
                          />
                        )}
                      </div>
                      <div className="max-w-[70%] w-fit flex flex-col">
                        {currentUser.user?.email === message.email &&
                          isEditingTabVisible &&
                          messageToEdit === message.text && (
                            <EditMessage
                              collection="room-conversations"
                              message={message}
                              handleEditTabClose={handleEditTabClose}
                            />
                          )}
                        <div
                          onMouseEnter={handleEditTabOpen}
                          className={`" ${
                            currentUser.user.email === message.email
                              ? "rounded-s-xl bg-blue-400 text-white"
                              : "rounded-e-xl bg-white/90  "
                          }  p-3 rounded-t-xl  relative flex justify-center "`}
                        >
                          <p>{message.text}</p>
                          {currentUser.user?.email === message.email &&
                            messageToEdit === message.text && (
                              <div
                                onClick={handleEditingTabVisibility}
                                className=" translate-x-2 hover:bg-white/30 rounded flex items-center justify-center"
                              >
                                <BiDotsVerticalRounded />
                              </div>
                            )}
                        </div>
                        <p
                          className={`" text-gray-500 py-2 text-[0.7rem]  ${
                            currentUser.user.email === message.email
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
              className="  absolute bottom-0 text-black  w-full my-8   pb-[5rem]   flex justify-center  "
              onSubmit={handleMessageSending}
            >
              <div className="bg-white/30  lg:w-[85%] flex   w-[80%]  rounded-xl backdrop-blur-xl">
                {" "}
                <TextareaAutosize
                  name="message"
                  id="message"
                  ref={textAreaRef}
                  type="text"
                  className="outline-none w-full bg-transparent px-2 py-2 min-h-max h-max max-h-30rem"
                  onChange={handleMessageChange}
                  maxRows={5}
                  minRows={1}
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
      ) : (
        <SignUpRedirect />
      )}
    </ErrorBoundary>
  );
};

export default ChatRoom;
