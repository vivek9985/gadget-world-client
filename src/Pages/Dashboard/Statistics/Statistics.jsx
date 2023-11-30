import { PieChart, Pie, Cell } from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaUsers } from "react-icons/fa6";
import productIcon from "../../../assets/product-5806313-4863042.webp";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });
  const datas = [
    { name: "Total Users", value: users.length },
    { name: "Total Products", value: products.length },
    { name: "Total Reviews", value: reviews.length },
  ];

  const COLORS = ["#e4d722c0", "#50ee8ce3", "#dd337a"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  return (
    <section>
      <h2 className="text-3xl text-center font-medium my-10">Analytics</h2>
      <div className="flex items-center justify-center">
        <PieChart width={400} height={400}>
          <Pie
            width={150}
            height={150}
            data={datas}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={160}
            fill="#8884d8"
            dataKey="value"
          >
            {datas.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className="p-6 bg-[#50ee8ce3] rounded-lg">
          <h2 className="text-xl font-semibold uppercase text-gray-700">Total Products</h2>
          <h2 className="text-2xl text-blue-500 font-medium flex items-center gap-4 mt-3">
            <img className="w-8 h-8" src={productIcon} alt="image" />
            <span className="pb-1">{products.length}</span>
          </h2>
        </div>
        <div className="p-6 bg-[#e4d722c0] rounded-lg">
          <h2 className="text-xl font-semibold uppercase text-gray-700">Total Users</h2>
          <h2 className="text-2xl text-blue-500 font-medium flex items-center gap-4 mt-3">
            <FaUsers></FaUsers>
            <span className="pb-1">{users.length}</span>
          </h2>
        </div>
        <div className="p-6 bg-[#dd337a] rounded-lg">
          <h2 className="text-xl font-semibold uppercase text-gray-700">Total Reviews</h2>
          <h2 className="text-2xl text-blue-500 font-medium flex items-center gap-4 mt-3">
            <FaStar className="text-orange-300"></FaStar>
            <span className="pb-1">{reviews.length} </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
