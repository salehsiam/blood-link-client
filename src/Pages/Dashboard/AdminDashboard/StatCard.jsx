const StatCard = ({ icon, count, title }) => {
  return (
    <div className="bg-accent/10 p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div>{icon}</div>
      <div>
        <h3 className="text-2xl font-bold">{count}</h3>
        <p className="text-neutral">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
