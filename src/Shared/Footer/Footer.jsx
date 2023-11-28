import logo from "../../assets/logo.png";
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram } from "react-icons/Bi";
import { HiLocationMarker, HiOutlineMail } from "react-icons/Hi";

const Footer = () => {
  return (
    <div className="bg-[#f8f8f8]">
      <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-start md:items-start justify-center gap-4 pb-10 md:pb-0">
          <div className="flex items-center">
            <HiOutlineMail className="text-lg md:text-xl mr-1 text-blue-400"></HiOutlineMail>
            <h2 className="text-lg md:text-lg font-medium text-gray-900">
              Email :
            </h2>
            <p className="pl-1 font-medium text-gray-700 text-sm md:text-base">
              gagdet@world.com
            </p>
          </div>
          <div className="flex items-center">
            <HiLocationMarker className="text-lg md:text-xl mr-1 text-blue-400"></HiLocationMarker>
            <h2 className="text-lg md:text-lg font-medium text-gray-900">
              Address :
            </h2>
            <p className="pl-1 font-medium text-gray-700 text-sm md:text-base">
              56 Helsinki , Finland
            </p>
          </div>
        </div>
        <div className="py-10 flex items-center justify-end">
          <div className="">
            <div className="flex items-center justify-end">
              <img src={logo} alt="image" className="w-24 h-20 rounded-full" />
            </div>
            <h2 className="text-lg font-bold">
              Gadget <span className="text-blue-500">World</span>
            </h2>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full h-px bg-blue-300 mb-10"></div>
        <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-between pb-10">
          <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
            <ul className="flex items-center text-xl gap-3">
              <li className="px-2 py-2 bg-blue-400 rounded-full hover:scale-95 cursor-pointer transition-all duration-200">
                <a href="">
                  <BiLogoFacebook></BiLogoFacebook>
                </a>
              </li>
              <li className="px-2 py-2 bg-blue-400 rounded-full hover:scale-95 cursor-pointer transition-all duration-200">
                <a href="">
                  <BiLogoTwitter></BiLogoTwitter>
                </a>
              </li>
              <li className="px-2 py-2 bg-blue-400 rounded-full hover:scale-95 cursor-pointer transition-all duration-200">
                <a href="">
                  <BiLogoInstagram></BiLogoInstagram>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex justify-center md:justify-end">
            <p className="font-medium text-gray-600 text-center md:text-right">
              Copyright © 2023. All rights reserved by{" "}
              <span className="text-blue-400">Gadget World</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
