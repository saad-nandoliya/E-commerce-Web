import { FaApple } from "react-icons/fa";
import IphoneImg from "../../../assets/images/Iphone14.png";

const Banner = () => {
  return (
    <div className="relative w-full h-auto bg-black text-white flex flex-wrap items-center justify-between px-6 md:px-16 py-10">
      {/* Left Side - Text */}
      <div className="flex-1 min-w-0 flex flex-col items-start text-start md:text-left">
        <FaApple className="text-3xl" />
        <p className="text-sm mt-2">iPhone 14 Series</p>
        <h2 className="text-xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mt-2 leading-tight">
          Up to 10% off Voucher
        </h2>
      </div>
      {/* Right Side - Image */}
      <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
        <img
          src={IphoneImg}
          alt="iPhone 14 Pro"
          className="w-full max-w-xs sm:max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl h-auto drop-shadow-[0_4px_10px_rgba(255,255,255,0.8)]"
        />
      </div>
    </div>
  );
};

export default Banner;
