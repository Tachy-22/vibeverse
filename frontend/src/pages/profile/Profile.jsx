import { useSelector } from "react-redux";
import UseRefreshUser from "../controls/hooks/UseRefreshUser";
import { RiArrowGoBackFill, RiSettings3Fill } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";
import SignOut from "../signIn/controls/functions/SignOut";
import { useCallback, useState } from "react";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.app);
  UseRefreshUser(currentUser);

  console.log("currentUser", currentUser);

  const [selectedImage, setSelectedImage] = useState(null);
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
  }, []);

  console.log("selectedImage :", selectedImage, "imageURL", imageURL);

  return (
    <div className=" h-screen bg-cover  xl:w-[40rem] lg:w-1/2 md:w-[30rem] mx-auto  flex flex-col relative text-white">
      <div className=" text-gray-300  flex justify-between w-full absolute px-2 top-0 z-40 py-4">
        <Link to="/home" className="">
          <RiArrowGoBackFill className="text-2xl font-thin " />
        </Link>
        <RiSettings3Fill title=" settings" className="text-2xl" />
      </div>

      <div
        style={{ "--image-url": `url(${imageURL})` }}
        className={`" w-full flex bg-[image:var(--image-url)] relative flex-col items-center bg-cover justify-start px-3  h-[18rem] ] "`}
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
              src={currentUser?.user.photoURL}
              alt=""
              className="rounded-full border border-green-300 p-[0.1rem] w-[7em] h-[7rem]"
            />
          </div>
          <p className="py-4 ">{currentUser?.user.displayName}</p>
        </div>
      </div>
      <div className="bg-profile border-t-[2px] bg-contain bg-gray-400 px-3 h-full pt-[7rem] border-blue-300  ">
        <div className="border-t flex flex-col py-4 gap-2">
          <h2 className="">Email:</h2>
          <div className="flex gap-3 items-center">
            <div className=" bg-gray-700 p-2 text-xl rounded-full">
              <AiOutlineMail />
            </div>

            <p className="">{currentUser?.user.email}</p>
          </div>
        </div>
        <div className="border-t flex flex-col py-4 gap-2">
          <h2 className="">Email:</h2>
          <div className="flex gap-3 items-center">
            <div className=" bg-gray-700 p-2 text-xl rounded-full">
              <AiOutlineMail />
            </div>

            <p className="">{currentUser?.user.email}</p>
          </div>
        </div>
        <div className="border-t flex flex-col py-4 gap-2">
          <a href="/" className="flex gap-3 justify-end items-center  ">
            <button
              onClick={() => {
                SignOut();
              }}
              className="button"
            >
              <span className="button-content">Sign out </span>{" "}
            </button>{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;