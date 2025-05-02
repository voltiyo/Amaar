import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const MyChart = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke='#004274' fontWeight={"600"}/>
        <YAxis stroke='#004274' fontWeight={"600"}/>
        <Tooltip stroke='#004274' fontWeight={"600"}/>
        <Line type="monotone" dataKey="value" stroke="#004274" strokeWidth={"2px"}/>
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MyChart;
