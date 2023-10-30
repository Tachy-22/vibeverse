import OnlineNotif from "../../../components/OnlineNotif";

const Footer = () => {
  return (
    <>
      {" "}
      <footer className="flex justify-between px-4  pt-2 items-center text-white">
        <div className="">
          <OnlineNotif />{" "}
        </div>{" "}
        <button className="button">
          <span className="button-content">Sign out </span>{" "}
        </button>{" "}
      </footer>
    </>
  );
};

export default Footer;
