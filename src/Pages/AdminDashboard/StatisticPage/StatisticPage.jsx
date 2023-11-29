
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import useAllProduct from '../../../Hooks/useAllProduct';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useEffect, useState } from 'react';





const COLORS = ['#9400fe', '#fe0072', '#690338'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const StatisticPage = () => {

    const axiosSecure=useAxiosSecure()
    const [data, setData]=useState([])
    useEffect(()=>{
        axiosSecure.get('/stats')
        .then(res=>setData(res.data))
    },[axiosSecure])
    // console.log(data)


    return (
        <div className='min-h-screen mt-10 w-full mx-auto'>
            <h2 className='text-center text-2xl font-serif font-semibold underline'>Statistics of <span className='uppercase text-pink-800 animate-pulse'>tech Gadget</span></h2>
            <PieChart width={500} height={500}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
          <Tooltip />
        </PieChart>
        </div>
    );
};

export default StatisticPage;