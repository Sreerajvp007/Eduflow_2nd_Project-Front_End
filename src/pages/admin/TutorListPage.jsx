import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTutorDetails, approveTutor } from "../../features/admin/adminTutorSlice";

const TutorListPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedTutor } = useSelector((s) => s.adminTutors);

  useEffect(() => {
    dispatch(fetchTutorDetails(id));
  }, [id]);

  if (!selectedTutor) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{selectedTutor.fullName}</h2>
        <button
          onClick={() => dispatch(approveTutor(id))}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Approve Tutor
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 border rounded">
          <h3 className="font-semibold mb-2">Personal Info</h3>
          <p>Email: {selectedTutor.email}</p>
          <p>Phone: {selectedTutor.mobile}</p>
        </div>

        <div className="bg-white p-4 border rounded">
          <h3 className="font-semibold mb-2">Qualifications</h3>
          {selectedTutor.qualifications?.map((q, i) => (
            <p key={i}>{q.title}</p>
          ))}
        </div>

        <div className="bg-white p-4 border rounded">
          <h3 className="font-semibold mb-2">ID Verification</h3>
          {selectedTutor.idVerification?.verified ? "Verified" : "Not Verified"}
        </div>
      </div>
    </div>
  );
};

export default TutorListPage;
