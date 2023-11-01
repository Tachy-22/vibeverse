/* eslint-disable react/prop-types */

const SignUpRedirect = ({resetErrorBoundary }) => {
  return (
    <div className="bg-white/40 w-full h-screen flex justify-center items-center">
      <div className="w-[20rem] bg-white p-[2rem] rounded-md justify-center items-center">
        <p className="w-full text-red-600 text-center">
          {" "}
          You are not logged in !
        </p>
        <div className="flex justify-center items-center p-4 w-full  ">
          <a className=" border-4 border-blue-500 p-1 rounded-full" href="/">
            <button onClick={resetErrorBoundary} className="button">
              <span className="button-content text-sm">
                Click Here to Sign In{" "}
              </span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpRedirect;
