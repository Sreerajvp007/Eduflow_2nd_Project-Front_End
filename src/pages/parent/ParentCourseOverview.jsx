

import {
  Avatar,
  Rating,
  Textarea,
  Button,
  Modal
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBroadcast } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchParentCourseOverview,
} from "../../features/parent/parentCourseListSlice";
import { submitReview, reportTutor } from "../../features/parent/parentReviewSlice";


const ParentCourseOverview = () => {

  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const [parentReview, setParentReview] = useState(null);

  const { selectedCourse, sessions, loading } =
    useSelector((state) => state.parentCourses);

  useEffect(() => {
    dispatch(fetchParentCourseOverview(courseId))
      .unwrap()
      .then((res) => {
        const existingReview = res?.parentReview || res?.review || null;
        if (existingReview) {
          setParentReview(existingReview);
        }
      });
  }, [dispatch, courseId]);

  const handleSubmitReview = async () => {

    if (!rating) {
      notifications.show({
        title: "Rating required",
        message: "Please select a rating",
        color: "red",
      });
      return;
    }

    await dispatch(
      submitReview({
        courseId: selectedCourse._id,
        rating,
        review
      })
    );

    setParentReview({
      rating,
      review,
      createdAt: new Date()
    });

    notifications.show({
      title: "Review Submitted",
      message: "Thank you for your feedback!",
      color: "green",
    });

    setRating(0);
    setReview("");
  };

  const handleReportTutor = async () => {

    if (!reportReason.trim()) {
      notifications.show({
        title: "Reason required",
        message: "Please describe the issue",
        color: "red",
      });
      return;
    }

    await dispatch(
      reportTutor({
        courseId: selectedCourse._id,
        tutorId: selectedCourse.tutorId._id,
        reason: reportReason
      })
    );

    notifications.show({
      title: "Report Submitted",
      message: "Our team will review this tutor shortly.",
      color: "green",
    });

    setReportOpen(false);
    setReportReason("");
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center py-20">
  //       <Loader color="indigo" />
  //     </div>
  //   );
  // }

 if (!selectedCourse) {
  return (
    <div className="text-center py-10">
      <p className="text-gray-500">Loading course...</p>
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
  const isCompleted =
selectedCourse.courseStatus === "completed";
  const dueDate = new Date(selectedCourse.nextPaymentDate);
  const now = new Date();

  const daysDiff = Math.floor((dueDate - now) / (1000 * 60 * 60 * 24));
const pauseInDays = daysDiff < 0 ? 3 - Math.abs(daysDiff) : null;
const cancelInDays = daysDiff < 0 ? 10 - Math.abs(daysDiff) : null;

  /* REMINDER */
  // const isReminder =
  //   selectedCourse.paymentStatus === "paid" &&
  //   minutesDiff <= 2;
const isReminder =
selectedCourse.paymentStatus === "paid" &&
selectedCourse.courseStatus === "active" &&
daysDiff > 0 &&
daysDiff <= 2;

  /* PAYMENT REQUIRED */
 const isPaymentDue =
selectedCourse.paymentStatus === "pending" &&
selectedCourse.courseStatus === "active";

  /* PAUSED */
  const isPaused =
    selectedCourse.courseStatus === "paused";

  const hasContent = (html) => {
    if (!html) return false;
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
  : selectedCourse.courseStatus === "completed"
  ? "bg-blue-100 text-blue-600"
  : selectedCourse.courseStatus === "paused"
  ? "bg-yellow-100 text-yellow-600"
  : "bg-red-100 text-red-600"
            }`}
          >
            {selectedCourse.courseStatus}
          </span>

        </div>

        <div className="flex justify-between items-center mt-6">

          <div className="flex items-center gap-4">

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

          <Button
            variant="light"
            color="red"
            size="xs"
            radius="md"
            onClick={() => setReportOpen(true)}
          >
            Report Tutor
          </Button>

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
                {/* FIX: added ck-view-content class so bullets/tables/bold render correctly */}
                <div
                  className="text-sm text-gray-700 leading-relaxed mt-1 ck-view-content"
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

      {!isCompleted && isReminder && (

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">

          <div className="flex justify-between items-center">

            <div>
              <h3 className="text-lg font-semibold text-yellow-700">
                Payment Due Soon
              </h3>

              <p className="text-sm text-yellow-600 mt-1">
  Your payment is due in <strong>{daysDiff}</strong> day{daysDiff !== 1 && "s"}.
  Please pay before the due date to avoid interruption.
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

      {!isCompleted && isPaymentDue && (

        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">

          <h3 className="text-lg font-semibold text-red-600">
            Payment Required
          </h3>

          <p className="text-sm text-red-500 mt-1">
  Payment overdue. Your course will be paused in{" "}
  <strong>{Math.max(pauseInDays, 0)}</strong> day{pauseInDays !== 1 && "s"} if payment is not completed.
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

      {!isCompleted && isPaymentDue && (

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">

          <p className="text-yellow-700 font-medium">
            Payment is overdue. Please complete payment soon to avoid course suspension.
          </p>

        </div>

      )}
      {!isCompleted && isPaymentDue && cancelInDays !== null && cancelInDays > 0 && (

<div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">

<h3 className="text-lg font-semibold text-orange-600">
Course Cancellation Warning
</h3>

<p className="text-sm text-orange-500 mt-1">
If payment is not completed, this course will be permanently cancelled in
<strong> {cancelInDays} </strong>
day{cancelInDays !== 1 && "s"}.
</p>

</div>

)}

      {/* ================= COURSE PAUSED ================= */}

      { !isCompleted && isPaused && (

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

                  {/* FIX: added ck-view-content class so bullets render correctly */}
                  <div
                    className="prose prose-sm text-gray-700 ck-view-content"
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

                  {/* FIX: added ck-view-content class so bullets render correctly */}
                  <div
                    className="prose prose-sm text-gray-700 ck-view-content"
                    dangerouslySetInnerHTML={{
                      __html: selectedCourse.learningPlan.improvements,
                    }}
                  />

                </div>
              )}

            </div>

          )}

         {/* ================= SESSIONS ================= */}

<div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

  <h3 className="font-semibold text-gray-800 mb-4">
    Sessions
  </h3>

  {totalSessions === 0 && (
    <div className="text-center text-gray-500 py-6">
      No sessions scheduled yet
    </div>
  )}

  <div className="space-y-3">

    {sessions?.map((session) => (

      <div
  key={session._id}
  className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 hover:bg-gray-100 transition"
>
  <div className="flex items-center justify-between">

    <div className="flex items-center gap-3">

      {/* icon */}
     <div className="bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-lg">
  <IconBroadcast size={20} />
</div>

      <div className="flex flex-col">

        <div className="flex items-center gap-3">

          <p className="font-semibold text-gray-800">
            {session.title}
          </p>

          <span className="text-xs text-gray-400">
            {new Date(session.sessionDate).toLocaleDateString()}
          </span>

        </div>

        {session.description && (
          <p className="text-sm text-gray-600 mt-1">
            {session.description.replace(/<[^>]*>?/gm, "")}
          </p>
        )}

      </div>

    </div>

    {/* status badge */}
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
</div>
    ))}

  </div>

</div>
          {/* TUTOR NOTES */}

          {hasContent(selectedCourse.learningPlan?.tutorNotes) && (

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

              <h3 className="font-semibold text-gray-800 mb-4">
                Tutor Notes
              </h3>

              {/* FIX: added ck-view-content class so bold/tables/bullets render correctly */}
              <div
                className="prose prose-sm text-gray-700 ck-view-content"
                dangerouslySetInnerHTML={{
                  __html: selectedCourse.learningPlan.tutorNotes,
                }}
              />

            </div>

          )}

   {/* ================= REVIEW TUTOR ================= */}

{selectedCourse.learningPlan.isPublished && (

  <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

    <h3 className="font-semibold text-gray-800 mb-4">
      Tutor Review
    </h3>

    {parentReview && parentReview.rating ? (

      <div>

        <Rating
          value={parentReview.rating}
          readOnly
          size="lg"
        />

        <p className="text-gray-700 mt-3">
          {parentReview.review}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          {parentReview.createdAt &&
            new Date(parentReview.createdAt).toLocaleDateString()}
        </p>

      </div>

    ) : (

      <>

        <Rating
          value={rating}
          onChange={setRating}
          size="lg"
          color="yellow"
          mb="md"
        />

        <Textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.currentTarget.value)}
          minRows={3}
        />

        <Button
          onClick={handleSubmitReview}
          disabled={!rating}
          mt="md"
          color="indigo"
          radius="md"
        >
          Submit Review
        </Button>

      </>

    )}

  </div>

)}

          <Modal
            opened={reportOpen}
            onClose={() => {
              setReportOpen(false);
              setReportReason("");
            }}
            title="Report Tutor"
            centered
            radius="md"
          >

            <Textarea
              label="Describe the issue"
              placeholder="Explain what problem you faced with the tutor..."
              minRows={4}
              value={reportReason}
              onChange={(e) => setReportReason(e.currentTarget.value)}
            />

            <Button
              fullWidth
              mt="md"
              color="red"
              onClick={handleReportTutor}
            >
              Submit Report
            </Button>

          </Modal>

        </>

      )}

    </div>

  );
};

export default ParentCourseOverview;