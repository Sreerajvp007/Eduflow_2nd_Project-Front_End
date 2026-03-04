
import { Avatar, Loader } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchParentCourseOverview,
} from "../../features/parent/parentCourseListSlice";

const ParentCourseOverview = () => {

  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  /* PAYMENT LOGIC */
const dueDate = new Date(selectedCourse.nextPaymentDate);
const now = new Date();

const minutesDiff = Math.floor((dueDate - now) / (1000 * 60));

/* REMINDER */

const isReminder =
  selectedCourse.paymentStatus === "paid" &&
  minutesDiff <= 2;

/* PAYMENT REQUIRED */

const isPaymentDue =
  selectedCourse.paymentStatus === "pending" &&
  selectedCourse.courseStatus !== "paused";

/* PAUSED */

const isPaused =
  selectedCourse.courseStatus === "paused";

 const hasContent = (html) => {
  if (!html) return false;

  // convert to string safely
  const str = String(html);

  const text = str.replace(/<[^>]*>/g, "").trim();

  return text.length > 0;
};

  const showStrengths = hasContent(selectedCourse.learningPlan?.strengths);
  const showImprovements = hasContent(selectedCourse.learningPlan?.improvements);

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 space-y-6">

      {/* COURSE HEADER */}

      <div className="bg-white rounded-2xl shadow-sm p-6 mt-5 border border-gray-100">

        <div className="flex justify-between items-center flex-wrap gap-4">

          <h2 className="text-xl font-semibold text-gray-800">
            {selectedCourse.subject}
          </h2>

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

        <div className="flex items-center gap-4 mt-6">

          <Avatar
            src={selectedCourse.tutorId?.profileImage}
            radius="xl"
            size="lg"
          >
            {selectedCourse.tutorId?.fullName?.charAt(0)}
          </Avatar>

          <div>
            <p className="font-semibold text-gray-800">
              {selectedCourse.tutorId?.fullName}
            </p>

            <p className="text-xs text-gray-500">
              Your Tutor
            </p>
          </div>

        </div>

      </div>

      {/* COURSE DETAILS GRID */}

      <div
        className={`grid gap-6 ${
          selectedCourse.learningPlan?.courseName ||
          selectedCourse.learningPlan?.description
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1"
        }`}
      >

        {(selectedCourse.learningPlan?.courseName ||
          selectedCourse.learningPlan?.description) && (

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

            {selectedCourse.learningPlan?.courseName && (
              <>
                <p className="text-xs text-gray-400">Course Title</p>
                <p className="font-semibold text-gray-800 mt-1 mb-3">
                  {selectedCourse.learningPlan.courseName}
                </p>
              </>
            )}

            {selectedCourse.learningPlan?.description && (
              <>
                <p className="text-xs text-gray-400">
                  Course Description
                </p>

                <div
                  className="text-sm text-gray-700 leading-relaxed mt-1"
                  dangerouslySetInnerHTML={{
                    __html: selectedCourse.learningPlan.description,
                  }}
                />
              </>
            )}

          </div>

        )}

        {/* COURSE INFO */}

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

          <div className="grid grid-cols-3 gap-6 text-sm">

            <div>
              <p className="text-xs text-gray-400">
                Start Date
              </p>
              <p>
                {new Date(selectedCourse.startDate).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Preferred Time
              </p>
              <p>
                {selectedCourse.timeSlot}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Next Payment Date
              </p>
              <p>
                {new Date(selectedCourse.nextPaymentDate).toLocaleDateString()}
              </p>
            </div>

          </div>

        </div>

      </div>
{/* ================= PAYMENT REMINDER ================= */}

{isReminder && (

  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">

    <div className="flex justify-between items-center">

      <div>
        <h3 className="text-lg font-semibold text-yellow-700">
          Payment Due Soon
        </h3>

        <p className="text-sm text-yellow-600 mt-1">
          Your next payment is approaching. You can pay now to avoid interruption.
        </p>
      </div>

      <button
        onClick={() =>
          navigate(`/parent/courses/${selectedCourse._id}/payment`, {
            state: { course: selectedCourse }
          })
        }
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
      >
        Pay Now
      </button>

    </div>

  </div>

)}

{/* ================= PAYMENT REQUIRED ================= */}

{isPaymentDue && (

  <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

    <h3 className="text-lg font-semibold text-red-600">
      Payment Required
    </h3>

    <p className="text-sm text-red-500 mt-1">
      Your monthly payment is due. Please complete payment to continue accessing the course.
    </p>

    <button
      onClick={() =>
        navigate(`/parent/courses/${selectedCourse._id}/payment`, {
          state: { course: selectedCourse }
        })
      }
      className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
    >
      Pay Now
    </button>

  </div>

)}

{/* ================= LOCK MESSAGE ================= */}

{isPaymentDue && (

  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">

    <p className="text-yellow-700 font-medium">
      Payment is overdue. Please complete payment soon to avoid course suspension.
    </p>

  </div>

)}

{/* ================= COURSE PAUSED ================= */}

{isPaused && (

  <div className="bg-red-100 border border-red-300 rounded-2xl p-6 text-center">

    <h3 className="text-lg font-semibold text-red-700">
      Course Paused
    </h3>

    <p className="text-sm text-red-600 mt-2">
      This course has been paused due to unpaid fees. Complete payment to resume learning.
    </p>

    <button
      onClick={() =>
        navigate(`/parent/courses/${selectedCourse._id}/payment`, {
          state: { course: selectedCourse }
        })
      }
      className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
    >
      Pay Now
    </button>

  </div>

)}

      {!isPaused && (

        <>

          {/* ATTENDANCE */}

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

            <h3 className="font-semibold text-gray-800 mb-4">
              Attendance Summary
            </h3>

            <div className="grid grid-cols-3 gap-6 text-center mb-6">

              <div>
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-lg font-semibold">{totalSessions}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Attended</p>
                <p className="text-lg font-semibold text-green-600">
                  {completed}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Missed</p>
                <p className="text-lg font-semibold text-red-500">
                  {missed}
                </p>
              </div>

            </div>

            <div className="bg-gray-100 rounded-full h-3">

              <div
                className="h-3 rounded-full bg-indigo-500"
                style={{ width: `${attendance}%` }}
              />

            </div>

            <p className="text-sm text-gray-500 mt-2">
              {attendance}% attendance rate
            </p>

          </div>

          {(showStrengths || showImprovements) && (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {showStrengths && (
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

                  <h3 className="font-semibold text-gray-800 mb-4">
                    Student Strengths
                  </h3>

                  <div
                    className="prose prose-sm text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: selectedCourse.learningPlan.strengths,
                    }}
                  />

                </div>
              )}

              {showImprovements && (
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

                  <h3 className="font-semibold text-gray-800 mb-4">
                    Areas for Improvement
                  </h3>

                  <div
                    className="prose prose-sm text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: selectedCourse.learningPlan.improvements,
                    }}
                  />

                </div>
              )}

            </div>

          )}

          {/* SESSIONS */}

          <div className="space-y-4">

            <h3 className="font-semibold text-gray-800">
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
                className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100"
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
                  {new Date(session.sessionDate).toLocaleDateString()}
                </p>

                {session.description && (
                  <p className="text-sm text-gray-600 mt-3">
                    {session.description}
                  </p>
                )}

              </div>

            ))}

          </div>

          {/* TUTOR NOTES */}

          {hasContent(selectedCourse.learningPlan?.tutorNotes) && (

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

              <h3 className="font-semibold text-gray-800 mb-4">
                Tutor Notes
              </h3>

              <div
                className="prose prose-sm text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: selectedCourse.learningPlan.tutorNotes,
                }}
              />

            </div>

          )}

        </>

      )}

    </div>
  );
};

export default ParentCourseOverview;