import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalyticsCard = ({ title, value, growth, data, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
      <h4 className="text-gray-500 text-sm">{title}</h4>

      <div className="flex items-center justify-between mt-2">
        <h2 className="text-2xl font-bold">{value}</h2>
        <span
          className={`text-sm font-semibold ${
            growth > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {growth > 0 ? "↑" : "↓"} {Math.abs(growth)}%
        </span>
      </div>

      <div className="h-24 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" hide />
            <YAxis hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCard;
