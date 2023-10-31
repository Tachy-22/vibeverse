/* eslint-disable react/prop-types */
import LogoDeskop from "../../components/Logo";
import signInWithGoogle from "./controls/functions/SignInWithGoogle";
import { FaGoogle } from "react-icons/fa";
import HomeBg from "../../assets/homeBg3.jpg";
import { initiateCurrentUser, updateUsers } from "../../redux/slice";
import { useDispatch } from "react-redux";

import { useEffect, useMemo } from "react";
import { collection, query } from "firebase/firestore";
import { db } from "../../firebase-config";
import UseGetDoccument from "../controls/hooks/useGetDoccument.js";
import { useNavigate } from "react-router-dom";
import { cookies } from "../../cookies-config";
import { clearLocaltorage } from "../chatRooms/controls/functions";

const SignIn = ({ setIsAuth, isAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doccumentRef = useMemo(() => collection(db, "users"), []);

  const queryParams = useMemo(() => query(doccumentRef), [doccumentRef]);

  const [doccument] = UseGetDoccument(queryParams);
  const users = useMemo(() => {
    return doccument.map((obj) => obj.user);
  }, [doccument]);
  console.log("users", users);

  const handleGoogleSignIn = async () => {
    try {
      if (!isAuth) {
        const signInData = await signInWithGoogle(
          setIsAuth,
          doccumentRef,
          users
        );
        dispatch(initiateCurrentUser(signInData));
        dispatch(updateUsers(doccument));
        navigate("/home");
      } else {
        navigate("/home");
      }
    } catch (error) {
      // Handle any errors that may occur during sign-in
      console.error(error);
    }
  };

  useEffect(() => {
    cookies.remove("auth-token");
    clearLocaltorage();
  }, []);

  console.log("all users", doccument);
  return (
    <div className="  w-full flex justify-center  items-center h-full bg-orange-100">
      <div className=" flex justify-betwee   w-full h-full ">
        <div className=" relative xl:w-[40%] md:p-0 p-[1rem] w-full flex flex-col items-center justify-center">
          <div className=" p-[1rem]">
            {" "}
            <LogoDeskop />
          </div>
          <div className="flex flex-col sm:w-[30rem] w-full  justify-between gap-6 xl:p-[3rem] p-3 shadow-2xl rounded-md bg-white ">
            <div className="flex justify-between">
              {" "}
              <span className="font-semibold">Sign in</span>
              <span className="text-sm">
                or{" "}
                <a className="text-blue-700 cursor-pointer hover:underline">
                  Create account
                </a>
              </span>
            </div>
            <div className=" flex justify-center">
              <button
                className="w-full bg-blue-600 px-4 hover:bg-blue-500 text-white rounded-sm p-1 flex justify-between items-center"
                onClick={handleGoogleSignIn}
              >
                <FaGoogle className="" />
                <p className="w-full"> Sign In with Google</p>
              </button>
            </div>

            <div className="flex justify-center items-center gap-2">
              <span className="w-full h-[1px] bg-gray-400"></span>
              <span className="">or</span>
              <span className="w-full h-[1px] bg-gray-400"></span>
            </div>
            <div>
              <input
                type="text"
                className=" p-1 border-gray-400 border w-full "
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="text"
                className=" p-1 border-gray-400 border w-full "
                placeholder="Password"
              />
            </div>
            <div className="flex justify-between">
              <div>
                {" "}
                <input id="rememberMe" type="checkBox" className="" />{" "}
                <label htmlFor="rememberMe" className="">
                  {" "}
                  Remember me
                </label>
              </div>
              <div>
                <button className="p-1 text-white rounded-sm bg-blue-600 hover:bg-blue-500">
                  Sign in
                </button>
              </div>
            </div>
            <div className="text-blue-700 cursor-pointer hover:underline">
              Forgot your Password?
            </div>
          </div>
        </div>
        <div className="xl:flex hidden w-[60%] border bg-red-400">
          <img src={HomeBg} alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;