/* eslint-disable react/prop-types */
import { GrSend } from "react-icons/gr";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  Suspense,
} from "react";
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
import { addNewChat, addNewChatRecipient } from "../../redux/slice";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
//

import { handleDoccumentAddition } from "../controls/functions/handleDoccumentAddition";
import UseRefreshUser from "../controls/hooks/UseRefreshUser";
import {
  previousChat,
  previousChatRecipient,
  recentUser,
} from "../../localstorage-config";
import useRefreshCurrentChatRecipient from "../controls/hooks/useRefreshCurrentChatRecipient";
import LoaderSpinner from "../../components/LoaderSpinner";
import { ErrorBoundary } from "react-error-boundary";
import SignUpRedirect from "../error/SignUpRedirect";

const IndividualChatRoom = () => {
  const dispatch = useDispatch();
  const { currentChat, currentUser, currentChatRecipient } = useSelector(
    (state) => state.app
  );
  UseRefreshUser(currentUser);
  useRefreshCurrentChatRecipient(currentChatRecipient);

  const [newMessage, setNewMessage] = useState("");
  const textAreaRef = useRef(null);
  const chatRef = useRef(null);

  
  const scrollToBottom = useCallback(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const handleResize = useCallback(() => {
    // Your code to run when the window is resized
    console.log("Window was resized!");
    scrollToBottom();
  }, []);

  // Add a resize event listener when the component mounts
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]); // The empty dependency array ensures that the effect runs once when the component mounts

  const doccumentRef = useMemo(
    () => collection(db, "personal-conversations"),
    []
  );
  const messageAdditionContion = useMemo(
    () => newMessage === "" && currentChat === "",
    [newMessage, currentChat]
  );

  const user = useMemo(() => currentUser?.user, [currentUser]);

  const messageObj = useMemo(
    () => ({
      text: newMessage,
      createdAt: serverTimestamp(),
      participants: currentChat,
      sender: user?.displayName,
      displayName: user?.displayName,
      email: user?.email,
      userUrl: user?.photoURL,
    }),
    [currentChat, newMessage, user?.displayName, user?.email, user?.photoURL]
  );
  const messageSendingCleanUp = useCallback(() => {
    setNewMessage("");
  }, []);

  const queryParams = useMemo(
    () =>
      query(
        doccumentRef,
        where("participants", "==", currentChat),
        orderBy("createdAt")
      ),
    [currentChat, doccumentRef]
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
      scrollToBottom();
      console.log(messageObj, "messageObj");
    },
    [
      doccumentRef,
      messageAdditionContion,
      messageObj,
      messageSendingCleanUp,
      scrollToBottom,
    ]
  );

  const handleMessageChange = useCallback(() => {
    setNewMessage(textAreaRef.current.value);
  }, []);

  const [doccument] = UseGetDoccument(queryParams);

  useEffect(() => {
    if (currentChat !== null) {
      console.log("setting new currentChat");
      localStorage.setItem("current chat", currentChat);
      dispatch(addNewChat(currentChat));
    }
    if (currentChat === null) {
      dispatch(addNewChat(previousChat));
    }
  }, [dispatch, currentChat, currentChatRecipient]);

  console.log("doccuments :", doccument);

  useEffect(() => {
    if (currentChat !== null || currentChatRecipient !== null) {
      localStorage.setItem(
        "recent chat recipient",
        JSON.stringify(currentChatRecipient)
      );
    }
    if (currentChat === null || currentChatRecipient === null) {
      dispatch(addNewChatRecipient(previousChatRecipient));
    }
  }, [currentChat, currentChatRecipient, dispatch]);

  useEffect(() => {
    doccument.length !== 0 && scrollToBottom();
  }, [doccument.length, scrollToBottom]);

  return (
    <div className=" backdrop-brightness-50 backdrop-blur-sm  relative max-h-screen h-screen overflow-hidden  ">
      <ErrorBoundary
        className="border-green-400 border"
        FallbackComponent={<LoaderSpinner />}
      >
        {currentUser && (
          <div className=" h-full bg-fixed  letters-bg bg-bottom overflow-hidden   w-full relative xl:w-[40rem] lg:w-1/2 md:w-[90%] mx-auto  flex flex-col">
            <div
              ref={chatRef}
              className="bg-transparent  overflow-y-auto   h-full "
            >
              <div className=" flex flex-col  backdrop-blur-3xl w-full border-b border-black/10 bg-orange-100   sticky top-0 py-2">
                <div className="flex justify-start items-center ">
                  <Link to="/home">
                    <div className="px-1 ">
                      <RiArrowGoBackFill className="text-xl font-thin text-gray-500" />
                    </div>
                  </Link>

                  <div className="w-full justify-start pl-1 items-center flex gap-2">
                    <img
                      src={currentChatRecipient?.photoURL}
                      alt=""
                      className=" rounded-full w-[2.5rem]"
                    />
                    <div className="">{currentChatRecipient?.displayName} </div>
                  </div>
                </div>
              </div>
              <div className="h-max flex flex-col border-green-500 py-4 px-[0.5rem] mb-[6rem] ">
                {doccument?.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`" ${
                        auth.currentUser?.email === message.email
                          ? "justify-end "
                          : " justify-start"
                      } flex items-start gap-4 px-3 "`}
                    >
                      <div className="max-w-[70%] w-fit flex flex-col">
                        <div
                          className={`" ${
                            auth.currentUser?.email === message.email
                              ? "rounded-s-xl bg-blue-400 text-white"
                              : "rounded-e-xl bg-white/90  "
                          }  p-3 rounded-t-xl  "`}
                        >
                          <p>{message.text}</p>
                        </div>

                        <Suspense fallback={<LoaderSpinner />}>
                          <p
                            className={`" text-white py-2 text-[0.7rem] font-bold  ${
                              auth.currentUser?.email === message.email
                                ? "text-end"
                                : ""
                            }  "`}
                          >
                            {formatTimestamp(message.createdAt)}
                          </p>
                        </Suspense>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <form
              action=""
              className=" absolute bottom-0  border-red-500  text-black  w-full py-8   flex justify-center  "
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
        )}
        {recentUser && !currentUser && <LoaderSpinner />}
        {!recentUser && !currentUser && <SignUpRedirect />}
      </ErrorBoundary>
    </div>
  );
};

export default IndividualChatRoom;

//Structure for the DataObj for personal Chats

// {
//   "participants": [ "user1ID", "user2ID" ],
//   "lastMessageText": "Hello, how are you?",
//   "lastMessageSender": "user1ID",
//   "lastMessageTimestamp": Timestamp (UTC)
// }
