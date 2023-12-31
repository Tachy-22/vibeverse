import { Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { copyToClipboard } from "../controls/functions/copyToClipBoard";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { updateModalMessage, updateModalVisibility } from "../../redux/slice";

const About = () => {
  const dispatch = useDispatch();

  const handleLinkCopying = useCallback(() => {
    copyToClipboard("https://vibeverse-eosin.vercel.app/");
    dispatch(updateModalVisibility(true)) &&
      dispatch(
        updateModalMessage(
          `Link copied to clipboard : https://vibeverse-eosin.vercel.app/`
        )
      );
  }, [dispatch]);
  return (
    <div className=" w-full  h-screen  flex flex-col border-green-500  ">
      <div className="overflow-y-auto h-max xl:w-[40rem]  border-green-400 flex-grow lg:w-1/2 md:w-[90%] w-full mx-auto  flex flex-col relative backdrop-brightness-[35%] text-white p-4   ">
        <div className=" flex justify-start backdrop-blur-3xl w-full border-b border-black/10   sticky top-0 py-2">
          <Link to="/home">
            <div className="">
              <RiArrowGoBackFill className="text-xl font-thin text-white" />
            </div>
          </Link>
        </div>
        <h2 className="my-2 text-xl font-semibold">About Vibeverse:</h2>
        <p className="my-1">
          Vibeverse is a user-friendly chat application with a focus on private
          and group chats. Users can effortlessly initiate conversations with
          the individuals of their choice. In private chats, the communication
          is exclusive to the participating users, and the same principle
          applies to group chats.
        </p>
        <p className="my-1">
          Vibeverse was built using the React JS framework for JavaScript and
          utilizes Firebase as its backend database.
        </p>

        <h2 className="my-2 text-xl font-semibold">Main Features:</h2>
        <ul className="list-disc px-4 ">
          <li>Message deleting and editing</li>
          <li>Sign-in and sign-out indications</li>
          <li>User creation and deletion of groups with administrator roles</li>
        </ul>

        <h2 className="my-2 text-xl font-semibold">Creator:</h2>
        <p className="">
          Vibeverse was crafted by Mr. Entekume Jeffery Onyeka.
        </p>

        <h2 className="my-2 text-xl font-semibold">Contact Information:</h2>
        <p className="">
          For inquiries or assistance, you can reach out to Mr. Entekume Jeffery
          Onyeka via email at{" "}
          <a href="mailto:entekumeJeffery@gmail.com" className="text-blue-400">
            entekumeJeffery@gmail.com
          </a>{" "}
          .
        </p>
        <p className="my-6 text-red-300">
          Please note that Vibeverse is a demo/practice project and not a real
          product. share the{" "}
          <span
            className=" text-blue-400 underline cursor-pointer"
            onClick={handleLinkCopying}
          >
            {" "}
            link{" "}
          </span>{" "}
          to your friends and have fun!
        </p>
      </div>
    </div>
  );
};

export default About;
