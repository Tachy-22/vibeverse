import { Link, useRouteError } from "react-router-dom";
import ErrorSvg from "../../assets/404.png";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className=" bg-errormobile w-screen h-screen bg-cover   bg-center flex  flex-col-reverse justify-center items-center "
    >
      <div className=" w-fit md:pb-[10rem] p-6 flex text-white flex-col md:items-center gap-4 ">
        <h1 className="md:text-7xl text-5xl font-extrabold text-yellow-300 flex lg:flex-row flex-col justif-center items-center text-center">
          <span className=" text-[8rem]   ">404</span> - Page Not Found
        </h1>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          className=" border-4 border-blue-500 p-1 rounded-full w-fit"
          to="/home"
        >
          <button className="button">
            <span className="button-content text-sm">
              return to the Home page{" "}
            </span>
          </button>
        </Link>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
      <div className="relative w-fit h-[40%] flex justify-center ">
        <div className="w-full h-full  rounded-full bg-orange-400 blur-3xl absolute top-0 p-[10rem]"></div>
        <img src={ErrorSvg} alt="" className="z-[400]" />
      </div>
    </div>
  );
}
