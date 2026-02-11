const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold mt-2">{value}</h3>
    </div>
  );
};

export default StatCard;
