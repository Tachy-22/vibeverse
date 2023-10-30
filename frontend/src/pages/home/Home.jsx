import Footer from "./component/Footer";
import Nav from "./component/Nav";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { initiateCurrentUser } from "../../redux/slice";
import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
  const DataArray = Array.from({ length: 15 }, (_, i) => i);
  const { currentUser } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const serializedUser = localStorage.getItem("recent user");
  const recentUser = JSON.parse(serializedUser);

  console.log("recentUser on refresh", recentUser);
  console.log("currentUser on refresh", currentUser);
  useEffect(() => {
    if (currentUser === null) {
      dispatch(initiateCurrentUser(recentUser));
    }
  }, [currentUser, dispatch, recentUser]);

  return (
    <div className=" h-full xl:w-[40rem] lg:w-1/2 md:w-[30rem] mx-auto  flex flex-col relative  backdrop-brightness-50 backdrop-blur-sm">
      <div className="  text-white h-[40%] flex flex-col">
        <div className="sticky top-0">
          {" "}
          <Nav />
        </div>
        <div className=" w-full  ">
          <Footer />
        </div>
        {/* shows 10 random users */}

        <div className=" flex flex-col gap-4 p-4 text-white/70">
          <h2>Application users</h2>
          <div className="overflow-x-scroll ">
            <ul className="flex  gap-4   ">
              {DataArray.map((item, index) => {
                return (
                  <li
                    key={index}
                    className=" max-w-[30rem]  rounded-full border p-[0.1rem] mb-8"
                  >
                    <div className="flex border bg-white text-black rounded-full  w-[3.4rem] flex-grow h-[3.4rem] justify-center items-center ">
                      {" "}
                      User {item}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className=" bg-orange-100/30 relative h-full overflow-hidden flex flex-col  pt-10 rounded-t-[3rem] ">
        <nav className="sticky top-0 px-4 p-2 flex justify-between gap-4">
          <NavLink
            to="/"
            activeClassName="bg-white"
            className={({ isActive, isPending }) =>
              isPending
                ? "bg-white p-1 rounded  w-full"
                : isActive
                ? " rounded-xl text-center bg-white  px-2 p-1 w-full"
                : " backdrop-brightness-[50%] px-2 p-1 w-full rounded-xl text-white text-center"
            }
          >
            All
          </NavLink>

          <NavLink
            to="/my-Groups"
            activeClassName="bg-white"
            className={({ isActive, isPending }) =>
              isPending
                ? "bg-white p-1 rounded  w-full"
                : isActive
                ? " rounded-xl text-center bg-white  px-2 p-1 w-full"
                : " backdrop-brightness-[50%] px-2 p-1 w-full rounded-xl text-white text-center"
            }
          >
            My groups
          </NavLink>
          <NavLink
            activeClassName="bg-white"
            to="/chats"
            className={({ isActive, isPending }) =>
              isPending
                ? "bg-white p-1 rounded  w-full"
                : isActive
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
  );
};

export default Home;
