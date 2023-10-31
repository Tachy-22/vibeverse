import { BsChatSquareHeart } from "react-icons/bs";
const LogoDeskop = () => {
  return (
    <div className=" w-full items-end  font-bold text-2xl justify-center uppercase  flex ">
      <span className=" text-red-400 tracking-widest translate-y-1 text-4xl font-extrabold">
        V
      </span>
      <span className="text-black/60 tracking-widest"> ibeverse</span>
      <BsChatSquareHeart className=" text-red-400 mx-1 -translate-y-5 -translate-x-2 text-[1.1rem]" />
    </div>
  );
};

export default LogoDeskop;

export const LogoMobile = () => {
  return (
    <div className=" w-full items-end  font-bold text-sm justify-center uppercase  flex ">
      <span className=" text-red-400  tracking-widest text-xl translate-y-1 font-bold">V</span>
      <span className="  text-black/60 tracking-widest   "> ibeverse</span>
      <BsChatSquareHeart className=" text-red-400 mx-1 -translate-y-2 -translate-x-2 text-[0.9rem] " />
    </div>
  );
};
