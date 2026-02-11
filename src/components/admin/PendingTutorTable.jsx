import { useDispatch, useSelector } from "react-redux";
import {
  approveTutor,
  rejectTutor,
} from "../../features/admin/adminTutorSlice";

const PendingTutorTable = () => {
  const dispatch = useDispatch();
  const { pendingTutors, loading } = useSelector(
    (state) => state.adminTutors
  );

  if (loading) return <div>Loading pending tutors...</div>;

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">
        Pending Tutor Verifications
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Name</th>
            <th>Subject</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {pendingTutors.map((tutor) => (
            <tr key={tutor._id} className="border-t">
              <td className="py-3">{tutor.name}</td>
              <td>{tutor.subject}</td>
              <td>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                  Pending
                </span>
              </td>
              <td className="text-right space-x-2">
                <button
                  onClick={() => dispatch(approveTutor(tutor._id))}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs"
                >
                  Approve
                </button>
                <button
                  onClick={() => dispatch(rejectTutor(tutor._id))}
                  className="bg-gray-200 px-3 py-1 rounded-full text-xs"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingTutorTable;
