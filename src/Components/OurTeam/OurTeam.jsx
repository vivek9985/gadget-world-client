import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaDribbble, FaFacebook, FaInstagram } from "react-icons/fa6";
import user from "../../assets/user-avatar.png"

const OurTeam = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  console.log(users);
  const team = users.filter((item) => item.role === "moderator");
  console.log(team);

  return (
    <section className="w-10/12 mx-auto mb-32">
      <h2 className="text-center text-xl sm:text-3xl mt-20">OUR TEAM</h2>
      <div className="h-0.5 w-[10%] bg-gray-300 mx-auto rounded-full mt-2"></div>
      <div className="h-0.5 w-[13%] bg-gray-300 mx-auto rounded-full mt-1 mb-20"></div>

      <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {team.map((item) => (
          <div
            key={item?._id}
            className="text-center text-gray-500"
          >
            {item?.photo ? (
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src={item?.photo}
                alt="Bonnie Avatar"
              />
            ) : (
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src={user}
                alt="Bonnie Avatar"
              />
            )}
            <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
              {item?.userName}
            </h3>
            <p className="capitalize">Role : {item?.role}</p>
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
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
