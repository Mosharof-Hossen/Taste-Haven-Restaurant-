import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { FaProductHunt, FaUsers, FaWallet } from "react-icons/fa";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, ResponsiveContainer, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// PieChartWithCustomizedLabel********************

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const AdminHome = () => {
    const axios = useAxios()
    const { data: stats, isLoading } = useQuery({
        queryKey: ["Admin-stats"],
        queryFn: async () => {
            const res = await axios("/admin-stats");
            return res.data;
        }
    })

    if (isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }
    console.log(stats);

    const data = stats.orderStats.map(item => {
        return { name: item._id, value: item.quantity }
    })

    return (
        <div className="p-5">
            <div className="space-y-6">
                <h2 className="text-3xl font-cinzel-c font-bold">Hi,Welcome back</h2>
                <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
                    <div className="gap-5 text-center text-white flex items-center bg-gradient-to-r from-blue-600 to-blue-300 p-5 rounded">
                        <FaWallet className="text-5xl" />
                        <div>
                            <h2 className="text-3xl font-extrabold">{stats.revenue}</h2>
                            <p className="text-2xl">Revenue</p>
                        </div>
                    </div>
                    <div className="gap-5 text-center text-white justify-center flex items-center bg-gradient-to-r from-red-600 to-red-300 p-5 rounded">
                        <FaUsers className="text-5xl" />
                        <div>
                            <h2 className="text-3xl font-extrabold">{stats.users}</h2>
                            <p className="text-2xl">Customers</p>
                        </div>
                    </div>
                    <div className="gap-5 text-center text-white justify-center flex items-center bg-gradient-to-r from-green-600 to-green-300 p-5 rounded">
                        <FaProductHunt className="text-5xl" />
                        <div>
                            <h2 className="text-3xl font-extrabold">{stats.menuItem}</h2>
                            <p className="text-2xl">Products</p>
                        </div>
                    </div>
                    <div className="gap-5 text-center text-white justify-center flex items-center bg-gradient-to-r from-yellow-600 to-yellow-300 p-5 rounded">
                        <FaProductHunt className="text-5xl" />
                        <div>
                            <h2 className="text-3xl font-extrabold">{stats.orders}</h2>
                            <p className="text-2xl">Orders</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-9">
                <div className="mx-auto">
                    <BarChart
                    className="mx-auto "
                        width={350}
                        height={300}
                        data={stats?.orderStats}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {stats?.orderStats.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className=" mx-auto">
                        <PieChart width={330} height={300}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                                ))}
                            </Pie>
                            <Legend ></Legend>
                        </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;