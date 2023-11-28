import { FaDribbble, FaFacebook, FaInstagram } from "react-icons/fa6";
const OurTeam = () => {
  return (
    <section className="w-9/12 mx-auto mb-32">
      <h2 className="text-center text-xl sm:text-3xl mt-20">OUR TEAM</h2>
      <div className="h-0.5 w-[10%] bg-gray-300 mx-auto rounded-full mt-2"></div>
      <div className="h-0.5 w-[13%] bg-gray-300 mx-auto rounded-full mt-1 mb-20"></div>
      <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3">
        <div className="text-center text-gray-500">
          <img
            className="mx-auto mb-4 w-36 h-36 rounded-full bg-purple-500"
            src="https://dennissnellenberg.com/assets/img/DSC07033.jpg"
            alt="image"
          />
          <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
            Dennis 
          </h3>
          <p className="capitalize">Role : Moderator</p>
          <ul className="flex justify-center mt-4 space-x-4 text-rose-500">
            <li className="cursor-pointer hover:scale-125">
              <FaFacebook></FaFacebook>
            </li>
            <li className="cursor-pointer hover:scale-125">
              <FaInstagram></FaInstagram>
            </li>
            <li className="cursor-pointer hover:scale-125">
              <FaDribbble></FaDribbble>
            </li>
          </ul>
        </div>
        <div className="text-center text-gray-500">
          <img
            className="mx-auto mb-4 w-36 h-36 rounded-full bg-purple-500"
            src="https://mrvivek.000webhostapp.com/img/vivekfull.png"
            alt="image"
          />
          <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
            Vivek Anando
          </h3>
          <p className="capitalize">Role : Admin</p>
          <ul className="flex justify-center mt-4 space-x-4 text-rose-500">
            <li className="cursor-pointer hover:scale-125">
              <FaFacebook></FaFacebook>
            </li>
            <li className="cursor-pointer hover:scale-125">
              <FaInstagram></FaInstagram>
            </li>
            <li className="cursor-pointer hover:scale-125">
              <FaDribbble></FaDribbble>
            </li>
          </ul>
        </div>
        <div className="text-center text-gray-500">
          <img
            className="mx-auto mb-4 w-36 h-36 rounded-full bg-purple-500"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            alt="image"
          />
          <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
            Jake doe
          </h3>
          <p className="capitalize">Role : Moderator</p>
          <ul className="flex justify-center mt-4 space-x-4 text-rose-500">
            <li className="cursor-pointer hover:scale-125">
              <FaFacebook></FaFacebook>
            </li>
            <li className="cursor-pointer hover:scale-125">
              <FaInstagram></FaInstagram>
            </li>
            <li className="cursor-pointer hover:scale-125">
              <FaDribbble></FaDribbble>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
