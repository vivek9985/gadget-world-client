import { PieChart, Pie, Cell } from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      //   , {
      //     headers: {
      //       authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      return res.data;
    },
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      //   , {
      //     headers: {
      //       authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      return res.data;
    },
  });
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      //   , {
      //     headers: {
      //       authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      return res.data;
    },
  });
  const datas = [
    { name: "Total Users", value:users.length },
    { name: "Total Products", value: products.length },
    { name: "Total Reviews", value: reviews.length },
  ];

  const COLORS = ["#546de5", "#c44569", "#3dc1d3"];
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
        {`${(percent*100).toFixed(2)}%`}
      </text>
    );
  };
  

  return (
    <div>
      <div className="flex items-center justify-center mt-40 md:mt-32">
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
      <div className="flex justify-center mt-5 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex items-center">
            <p className="text-[#0b0b0b]">Total Products ({products.length})</p>
            <div className="w-24 h-[9px] bg-[#c44569] rounded-sm ml-4"></div>
          </div>
          <div className="flex items-center">
            <p className="text-[#0b0b0b]">Total Users ({users.length})</p>
            <div className="w-24 h-[9px] bg-[#546de5] rounded-sm ml-4"></div>
          </div>
          <div className="flex items-center">
            <p className="text-[#0b0b0b]">Total Reviews ({reviews.length})</p>
            <div className="w-24 h-[9px] bg-[#3dc1d3] rounded-sm ml-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
