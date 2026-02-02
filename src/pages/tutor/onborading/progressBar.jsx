
const ProgressBar = ({ value }) => (
  <div className="mt-2">
    <div className="h-2 bg-gray-200 rounded">
      <div
        className="h-2 bg-indigo-500 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
    <p className="text-xs text-gray-500 mt-1">
      Profile Completion: {value}%
    </p>
  </div>
);

export default ProgressBar;
