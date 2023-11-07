import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewChat, addNewChatRecipient } from "../../../redux/slice";
import UseRefreshUser from "../../controls/hooks/UseRefreshUser";
import useRefreshChat from "../../controls/hooks/UseRefreshChat";
import Loader1 from "../../../components/Loader1";
import { Suspense } from "react";

const AppUsers = () => {
  const { users, currentChat, currentUser } = useSelector((state) => state.app);
 // console.log("my user", users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  UseRefreshUser(currentUser);
  useRefreshChat(currentChat);

  const memoisedUser = useMemo(() => currentUser?.user, [currentUser]);
  const filteredUsers = useMemo(
    () => users.filter((user) => user.user !== memoisedUser?.email),
    [memoisedUser?.email, users]
  );

  const handleChatNavigation = useCallback(
    (chatRecipient) => {
      const chatId = `${memoisedUser?.email}&${chatRecipient.user}`;
      localStorage.setItem("recent chat", chatId.split("").sort().join(""));
      localStorage.setItem(
        "recent chat recipient",
        JSON.stringify(chatRecipient)
      );
      dispatch(addNewChat(chatId.split("").sort().join("")));
      dispatch(addNewChatRecipient(chatRecipient));
      navigate(`/chat/${chatRecipient.displayName}`);
    },
    [dispatch, memoisedUser?.email, navigate]
  );

  //console.log("filteredUsers :", filteredUsers);

  return (
    <div className="  flex flex-col    px-4 pt-4 text-white/70">
      <h2>Current users:</h2>
      <div className="overflow-x-auto ">
        <Suspense
          fallback={
            <div className="relative h-fit py-2 w-full flex justify-center">
              <Loader1 />
            </div>
          }
        >
          {filteredUsers.length !== 0 ? (
            <ul className="flex  gap-4  pt-4  ">
              {filteredUsers.map((item, index) => {
                return (
                  <li
                    onClick={() => {
                      handleChatNavigation(item);
                    }}
                    key={index}
                    className=" max-w-[30rem] flex flex-col justify-center mb-2  hover:scale-[102%]"
                  >
                    <div className="flex border mx-auto relative bg-white text-black rounded-full  w-[3rem] flex-grow h-[3rem] justify-center items-center flex-col gap-2 ">
                      <img
                        src={item.photoURL}
                        alt=""
                        className=" absolute rounded-full w-full"
                      />
                      {item.isLogedIn && (
                        <span className="w-3 h-3 bg-green-400 rounded-full absolute right-0 bottom-[1px]"></span>
                      )}
                    </div>
                    <p className=" text-sm py-2 w-min text-gray-300 text-center">
                      {" "}
                      {item.displayName}
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="relative h-fit py-2 w-full flex justify-center">
              <Loader1 />
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default AppUsers;
