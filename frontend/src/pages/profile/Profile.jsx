import { useSelector } from "react-redux";
import UseRefreshUser from "../controls/hooks/UseRefreshUser";
import { RiArrowGoBackFill, RiSettings3Fill } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import SignOut from "../signIn/controls/functions/SignOut";
import { Suspense, useCallback, useState } from "react";
import LoaderSpinner from "../../components/LoaderSpinner";

import SignUpRedirect from "../error/SignUpRedirect";
import { recentUser } from "../../localstorage-config";
import { BiPhoneCall } from "react-icons/bi";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.app);
  UseRefreshUser(currentUser);

 

  const [base64EncodedUrl, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // 'e.target.result' contains the base64-encoded image data
        const imageData = e.target.result;

        // Set the base64 image data to state
        setSelectedImage(imageData);

        // Convert the base64 image data to a URL
        const objectURL = URL.createObjectURL(file);
        setImageURL(objectURL);
      };

      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }, [setSelectedImage]);

  

  return (
    <Suspense fallback={<LoaderSpinner />}>
      {currentUser && (
        <div className=" h-screen bg-cover  xl:w-[40rem] lg:w-1/2 md:w-[85%] mx-auto  flex flex-col relative text-white">
          <div className=" text-gray-300  flex justify-between w-full absolute px-2 top-0 z-40 py-4">
            <Link to="/home" className="">
              <RiArrowGoBackFill className="text-2xl font-thin " />
            </Link>
            <RiSettings3Fill title=" settings" className="text-2xl" />
          </div>

          <div
            style={{ "--image-url": `url(${imageURL})` }}
            className={` w-full flex bg-[image:var(--image-url)] relative flex-col items-center bg-cover justify-start px-3  min-h-[10rem] h-[12rem] backdrop-brightness-[20%] `}
          >
            <input
              onChange={handleFileChange}
              type="file"
              className="border  absolute bottom-0 left-0  flex justify-center items-center"
            />
            <div className=" absolute -bottom-[6.5rem]">
              <div className="bg-white rounded-full flex w-[7em] h-[7rem]">
                {" "}
                <img
                  src={currentUser.user.photoURL}
                  alt=""
                  className="rounded-full border border-green-300 p-[0.1rem] w-[7em] h-[7rem]"
                />
              </div>
              <p className="py-4 ">{currentUser.user.displayName}</p>
            </div>
          </div>

          <Suspense fallback={<LoaderSpinner />}>
            <div className="bg-profile border-t-[2px] bg-cover bg-center bg-black/70 px-3 h-max flex-grow pt-[7rem] border-blue-300  ">
              <div className="border-t flex flex-col py-4 gap-2">
                <h2 className="">Email:</h2>
                <div className="flex gap-3 items-center">
                  <div className=" bg-black/50 p-2 text-xl rounded-full">
                    <AiOutlineMail />
                  </div>

                  <p className="">{currentUser.user.email}</p>
                </div>
              </div>
              {/* <div className="border-t flex flex-col py-4 gap-2">
                <h2 className="">Phone number:</h2>
                <div className="flex gap-3 items-center">
                  <div className=" bg-black/50 p-2 text-xl rounded-full">
                    <BiPhoneCall />
                  </div>

                  <p className="">{currentUser.user.createdAt}</p>
                </div>
              </div> */}
              <div className="border-t flex flex-col py-4 gap-2">
                <a href="/" className="flex gap-3 justify-end items-center  ">
                  <button
                    onClick={() => {
                      SignOut(currentUser);
                    }}
                    className="button"
                  >
                    <span className="button-content">Sign out </span>{" "}
                  </button>{" "}
                </a>
              </div>
            </div>
          </Suspense>
        </div>
      )}
      {recentUser && !currentUser && <LoaderSpinner />}
      {!recentUser && !currentUser && <SignUpRedirect />}
    </Suspense>
  );
};

export default Profile;
