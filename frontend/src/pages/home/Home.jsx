import Nav from "./component/Nav";

import { useDispatch, useSelector } from "react-redux";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

import UseRefreshUser from "../controls/hooks/UseRefreshUser";
import AppUsers from "./component/AppUsers";
import { useEffect, useMemo } from "react";
import { updateUsers } from "../../redux/slice";
import { collection, query } from "firebase/firestore";
import UseGetDoccument from "../controls/hooks/useGetDoccument.js";
import { db } from "../../firebase-config";
import useRefreshChat from "../controls/hooks/UseRefreshChat";
import SignUpRedirect from "../error/SignUpRedirect";
import { recentUser } from "../../localstorage-config";
import LoaderSpinner from "../../components/LoaderSpinner";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doccumentRef = useMemo(() => collection(db, "users"), []);

  const queryParams = useMemo(() => query(doccumentRef), [doccumentRef]);

  const [doccument] = UseGetDoccument(queryParams);
  const { currentUser, currentChat } = useSelector((state) => state.app);
  UseRefreshUser(currentUser);
  useRefreshChat(currentChat);

  useEffect(() => {
    dispatch(updateUsers(doccument));
    navigate("/home/");
  }, [dispatch, doccument, navigate]);

  return (
    <div className=" w-full ">
      {currentUser && (
        <div className=" h-screen xl:w-[40rem] lg:w-1/2 md:w-[30rem] mx-auto  flex flex-col relative backdrop-brightness-[35%]   ">
          <div className="  text-white h-[40%]  flex flex-col">
            <div className="sticky top-0 z-40">
              {" "}
              <Nav />
            </div>

            {/* shows 10 random users */}

            <AppUsers />
          </div>

          <div className=" bg-orange-100/30 relative h-full overflow-hidden flex flex-col  pt-8 rounded-t-[3rem] ">
            <nav className="sticky top-0 px-4 p-2 flex justify-between gap-4">
              <NavLink
                to="/home/"
                activeClassName="bg-white"
                className={({ isActive }) =>
                  isActive
                    ? " rounded-xl text-center bg-white  px-2 p-1 w-full"
                    : " backdrop-brightness-[50%] px-2 p-1 w-full rounded-xl text-white text-center"
                }
              >
                All
              </NavLink>

              <NavLink
                to="/home/my-Groups"
                activeClassName="bg-white"
                className={({ isActive }) =>
                  isActive
                    ? " rounded-xl text-center bg-white  px-2 p-1 w-full"
                    : " backdrop-brightness-[50%] px-2 p-1 w-full rounded-xl text-white text-center"
                }
              >
                My groups
              </NavLink>
              <NavLink
                activeClassName="bg-white"
                to="/home/chats"
                className={({ isActive }) =>
                  isActive
                    ? " rounded-xl text-center bg-white  px-2 p-1 w-full"
                    : " backdrop-brightness-[50%] px-2 p-1 w-full rounded-xl text-white text-center"
                }
              >
                Chats
              </NavLink>
            </nav>
            <section className="overflow-y-auto  relative h-full letters-bg">
              <Outlet />
            </section>
          </div>
        </div>
      )}
      {recentUser && !currentUser && <LoaderSpinner />}
      {!recentUser && !currentUser && <SignUpRedirect />}
    </div>
  );
};

export default Home;
