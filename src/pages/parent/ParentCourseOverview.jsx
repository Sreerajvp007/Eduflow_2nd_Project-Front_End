
import { Avatar, Loader } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchParentCourseOverview,
} from "../../features/parent/parentCourseListSlice";

const ParentCourseOverview = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const { selectedCourse, sessions, loading } =
    useSelector((state) => state.parentCourses);

  useEffect(() => {
    dispatch(fetchParentCourseOverview(courseId));
  }, [dispatch, courseId]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader color="indigo" />
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="flex justify-center py-20 text-gray-500">
        Course not found
      </div>
    );
  }

  const totalSessions = sessions?.length || 0;
  const completed =
    sessions?.filter((s) => s.status === "completed").length || 0;
  const missed =
    sessions?.filter((s) => s.status === "cancelled").length || 0;

  const attendance =
    totalSessions === 0
      ? 0
      : Math.round((completed / totalSessions) * 100);

  return (
    <div className="px-4 pb-24">

     {/* ================= HEADER ================= */}
<div className="px-2 pt-6">
  <h1 className="text-2xl font-semibold text-gray-800">
    Course Overview
  </h1>
</div>

{/* ================= COURSE CARD ================= */}
<div className="mt-6 bg-white rounded-2xl shadow-md p-6 border border-gray-100">

  {/* Subject + Status */}
  <div className="flex justify-between items-center">
    <h3 className="font-semibold text-lg text-gray-800">
      {selectedCourse.subject}
    </h3>

    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${
        selectedCourse.courseStatus === "active"
          ? "bg-green-100 text-green-600"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {selectedCourse.courseStatus}
    </span>
  </div>

 {/* ===== Tutor Section ===== */}
<div className="mt-5 flex items-center gap-4">

  <Avatar
    src={selectedCourse.tutorId?.profileImage}
    radius="xl"
    size="lg"
    className="shadow-sm"
  >
    {selectedCourse.tutorId?.fullName?.charAt(0)}
  </Avatar>

  <div className="flex flex-col">
    <p className="text-base font-semibold text-gray-800">
      {selectedCourse.tutorId?.fullName || "Tutor"}
    </p>

    <p className="text-xs text-gray-500">
      Your Tutor
    </p>
  </div>

</div>
  {/* ===== COURSE TITLE ===== */}
  {selectedCourse.learningPlan?.courseName && (
    <div className="mt-6">
      <p className="text-xs text-gray-400">Course Title</p>
      <p className="text-md font-semibold text-gray-800">
        {selectedCourse.learningPlan.courseName}
      </p>
    </div>
  )}

  {/* ===== COURSE DESCRIPTION ===== */}
  {selectedCourse.learningPlan?.description && (
    <div className="mt-4">
      <p className="text-xs text-gray-400">Course Description</p>
      <p className="text-sm text-gray-600 leading-relaxed mt-1">
        {selectedCourse.learningPlan.description}
      </p>
    </div>
  )}

  {/* Info Grid */}
  <div className="grid grid-cols-2 gap-6 mt-6 text-sm text-gray-600">
    <div>
      <p className="text-xs text-gray-400">Start Date</p>
      <p>
        {new Date(
          selectedCourse.startDate
        ).toLocaleDateString()}
      </p>
    </div>

    <div>
      <p className="text-xs text-gray-400">
        Preferred Time
      </p>
      <p>{selectedCourse.timeSlot}</p>
    </div>
  </div>

</div>

         {/* ===== ATTENDANCE CARD ===== */}
      <div className="mt-6 bg-white rounded-2xl shadow-md p-5 border border-gray-100">

        <h3 className="font-semibold text-gray-800 mb-4">
          Attendance Summary
        </h3>

        <div className="grid grid-cols-3 gap-4 text-center">

          <div>
            <p className="text-xs text-gray-400">
              Total Sessions
            </p>
            <p className="text-lg font-semibold text-gray-800">
              {totalSessions}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Attended
            </p>
            <p className="text-lg font-semibold text-green-600">
              {completed}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Missed
            </p>
            <p className="text-lg font-semibold text-red-500">
              {missed}
            </p>
          </div>

        </div>

        <div className="mt-6 bg-gray-100 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
            style={{ width: `${attendance}%` }}
          />
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {attendance}% attendance rate
        </p>

      </div>
      {/* ================= SESSIONS ================= */}
      <div className="mt-6 space-y-4">
        <h3 className="px-2 font-semibold text-gray-800">
          Sessions
        </h3>

        {totalSessions === 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center text-gray-500 border border-gray-100">
            No sessions scheduled yet
          </div>
        )}

        {sessions?.map((session) => (
          <div
            key={session._id}
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800">
                {session.title}
              </h4>

              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  session.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : session.status === "cancelled"
                    ? "bg-red-100 text-red-500"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {session.status}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              {new Date(
                session.sessionDate
              ).toLocaleDateString()}
            </p>

            {session.description && (
              <p className="text-sm text-gray-600 mt-3">
                {session.description}
              </p>
            )}
          </div>
        ))}
      </div>
      {/* ================= STUDENT STRENGTHS ================= */}
{selectedCourse.learningPlan?.strengths?.length > 0 && (
  <div className="mt-6 bg-white rounded-2xl shadow-md p-5 border border-gray-100">
    <h3 className="font-semibold text-gray-800 mb-4">
      Student Strengths
    </h3>

    <div className="flex flex-wrap gap-2">
      {selectedCourse.learningPlan.strengths.map((item, index) => (
        <span
          key={index}
          className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full font-medium"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
)}

{/* ================= NEEDS IMPROVEMENT ================= */}
{selectedCourse.learningPlan?.improvements?.length > 0 && (
  <div className="mt-6 bg-white rounded-2xl shadow-md p-5 border border-gray-100">
    <h3 className="font-semibold text-gray-800 mb-4">
      Areas for Improvement
    </h3>

    <div className="flex flex-wrap gap-2">
      {selectedCourse.learningPlan.improvements.map((item, index) => (
        <span
          key={index}
          className="bg-yellow-50 text-yellow-600 text-xs px-3 py-1 rounded-full font-medium"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
)}

      {/* ================= TUTOR NOTES ================= */}
      {selectedCourse.learningPlan?.tutorNotes && (
        <div className="mt-6 bg-white rounded-2xl shadow-md p-5 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3">
            Tutor Notes
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {selectedCourse.learningPlan.tutorNotes}
          </p>
        </div>
      )}
      

    </div>
  );
};

export default ParentCourseOverview;