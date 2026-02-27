
import {
  Text,
  TextInput,
  Textarea,
  Button,
  ActionIcon,
  NumberInput,
  Modal,
  Group,
  Card,
  Loader,
  Badge,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTutorCourseById,
  saveLearningPlan,
  markCourseCompleted,
} from "../../features/tutor/course/tutorCourseSlice";

const CourseOverview = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedCourse, loading } = useSelector(
    (state) => state.tutorCourses
  );

  /* ================= STATES ================= */
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [expectedDuration, setExpectedDuration] = useState("");
  const [tutorNotes, setTutorNotes] = useState("");
  const [strengths, setStrengths] = useState([]);
  const [improvements, setImprovements] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [strengthInput, setStrengthInput] = useState("");
  const [improvementInput, setImprovementInput] = useState("");

  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);

  const [newSession, setNewSession] = useState({
    title: "",
    description: "",
    sessionDate: null,
  });

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(fetchTutorCourseById(courseId));
  }, [dispatch, courseId]);

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (selectedCourse) {
      const lp = selectedCourse.learningPlan || {};
      setCourseName(lp.courseName || "");
      setDescription(lp.description || "");
      setExpectedDuration(lp.expectedDuration || "");
      setTutorNotes(lp.tutorNotes || "");
      setStrengths(lp.strengths || []);
      setImprovements(lp.improvements || []);
      setSessions(selectedCourse.sessions || []);
    }
  }, [selectedCourse]);

  /* ================= STRENGTHS ================= */
  const addStrength = () => {
    if (!strengthInput.trim()) return;
    setStrengths([...strengths, strengthInput]);
    setStrengthInput("");
  };

  const removeStrength = (index) => {
    setStrengths(strengths.filter((_, i) => i !== index));
  };

  /* ================= IMPROVEMENTS ================= */
  const addImprovement = () => {
    if (!improvementInput.trim()) return;
    setImprovements([...improvements, improvementInput]);
    setImprovementInput("");
  };

  const removeImprovement = (index) => {
    setImprovements(improvements.filter((_, i) => i !== index));
  };

  /* ================= SESSIONS ================= */
  const handleAddSession = () => {
    if (!newSession.title.trim()) return;

    setSessions([...sessions, newSession]);

    setNewSession({
      title: "",
      description: "",
      sessionDate: null,
    });

    setSessionModalOpen(false);
  };

  const handleRemoveSession = (index) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  /* ================= SAVE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      saveLearningPlan({
        courseId,
        data: {
          courseName,
          description,
          expectedDuration,
          tutorNotes,
          strengths,
          improvements,
          sessions,
        },
      })
    );

    if (saveLearningPlan.fulfilled.match(result)) {
      navigate("/tutor/courses");
    }
  };

  /* ================= COMPLETE ================= */
  const handleMarkCompleted = async () => {
    const result = await dispatch(markCourseCompleted(courseId));

    if (markCourseCompleted.fulfilled.match(result)) {
      setCompleteModalOpen(false);
      navigate("/tutor/courses");
    }
  };

  if (loading || !selectedCourse) {
    return (
      <div className="flex justify-center py-20">
        <Loader color="teal" />
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-6 space-y-10">

      {/* ================= READONLY COURSE DETAILS ================= */}
      <Card radius="xl" shadow="sm" p="lg" withBorder>
        <div className="flex justify-between items-start">
          <div>
            <Text fw={600}>{selectedCourse.subject}</Text>
            <Text size="xs" c="dimmed">
              Started on{" "}
              {new Date(selectedCourse.startDate).toLocaleDateString()}
            </Text>
          </div>

          <Badge
            color={
              selectedCourse.courseStatus === "completed"
                ? "green"
                : selectedCourse.courseStatus === "paused"
                ? "yellow"
                : "teal"
            }
            variant="light"
          >
            {selectedCourse.courseStatus}
          </Badge>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Info label="Student" value={selectedCourse.studentId?.name} />
          <Info label="Parent" value={selectedCourse.parentId?.fullName} />
          <Info label="Grade" value={selectedCourse.studentId?.grade} />
          <Info label="Time Slot" value={selectedCourse.timeSlot} />
        </div>
      </Card>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Learning Plan */}
        <div className="space-y-5">
          <Text fw={600}>Learning Plan Details</Text>

          <TextInput
            label="Course Title"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />

          <Textarea
            label="Description"
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <NumberInput
            label="Expected Duration (Weeks)"
            min={1}
            value={expectedDuration}
            onChange={setExpectedDuration}
          />

          <Textarea
            label="Tutor Notes"
            minRows={3}
            value={tutorNotes}
            onChange={(e) => setTutorNotes(e.target.value)}
          />
        </div>

        {/* ================= SESSIONS ================= */}
    {/* ================= SESSIONS ================= */}
<div>
  <div className="flex items-center justify-between mb-4">
    <Text fw={600}>Course Sessions</Text>

    <Button
      size="xs"
      leftSection={<IconPlus size={14} />}
      color="teal"
      onClick={() => setSessionModalOpen(true)}
    >
      Add Session
    </Button>
  </div>

  {/* Grey Container */}
  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">

    {sessions.length === 0 ? (
      <div className="border border-dashed border-gray-300 rounded-xl py-8 text-center">
        <Text size="sm" c="dimmed">
          No sessions added yet.
        </Text>
      </div>
    ) : (
      <div className="space-y-3">
        {sessions.map((session, index) => (
          <div
  key={index}
  className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between hover:shadow-sm transition"
>
            {/* Left Content */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  #{index + 1}
                </span>

                <Text fw={600} size="sm" className="truncate">
                  {session.title}
                </Text>
              </div>

              <Text size="xs" c="dimmed">
                {session.sessionDate
                  ? new Date(session.sessionDate).toLocaleDateString()
                  : "-"}
              </Text>

              {session.description && (
                <Text
                  size="xs"
                  c="dimmed"
                  className="truncate max-w-xs"
                >
                  {session.description}
                </Text>
              )}
            </div>

            {/* Delete */}
            {/* Status + Delete */}
<div className="flex items-center gap-3">

  {/* Status Badge */}
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

  {/* Delete */}
  <ActionIcon
    color="red"
    variant="subtle"
    onClick={() => handleRemoveSession(index)}
  >
    <IconTrash size={16} />
  </ActionIcon>

</div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
        {/* ================= STRENGTHS ================= */}
        <Card radius="xl" p="lg" withBorder>
          <Text fw={600} mb="md">Student Strengths</Text>

          <div className="flex gap-2">
            <TextInput
              placeholder="Add strength"
              value={strengthInput}
              onChange={(e) => setStrengthInput(e.target.value)}
              className="flex-1"
            />
            <Button color="teal" onClick={addStrength}>
              <IconPlus size={16} />
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            {strengths.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-teal-50 text-teal-700 px-3 py-2 rounded-lg text-sm"
              >
                {item}
                <IconTrash size={16} onClick={() => removeStrength(i)} />
              </div>
            ))}
          </div>
        </Card>

        {/* ================= IMPROVEMENTS ================= */}
        <Card radius="xl" p="lg" withBorder>
          <Text fw={600} mb="md">Needs Improvement</Text>

          <div className="flex gap-2">
            <TextInput
              placeholder="Add improvement"
              value={improvementInput}
              onChange={(e) => setImprovementInput(e.target.value)}
              className="flex-1"
            />
            <Button color="teal" onClick={addImprovement}>
              <IconPlus size={16} />
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            {improvements.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg text-sm"
              >
                {item}
                <IconTrash size={16} onClick={() => removeImprovement(i)} />
              </div>
            ))}
          </div>
        </Card>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
  <Button
    type="submit"
    color="teal"
    radius="xl"
    fullWidth
  >
    Save Changes
  </Button>

  {selectedCourse.courseStatus === "active" && (
    <Button
      color="green"
      variant="outline"   // 🔥 changed from light → outline
      radius="xl"
      fullWidth
      onClick={() => setCompleteModalOpen(true)}
    >
      Mark as Completed
    </Button>
  )}
</div>
      </form>

      {/* ================= COMPLETE MODAL ================= */}
      <Modal
        opened={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        title="Complete Course"
        centered
      >
        <Text size="sm" mb="md">
          Are you sure you want to mark this course as completed?
        </Text>

        <Group justify="flex-end">
          <Button variant="default" onClick={() => setCompleteModalOpen(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleMarkCompleted}>
            Confirm Completion
          </Button>
        </Group>
      </Modal>

      {/* ================= ADD SESSION MODAL ================= */}
      <Modal
        opened={sessionModalOpen}
        onClose={() => setSessionModalOpen(false)}
        title="Add Course Session"
        centered
      >
        <TextInput
          label="Session Title"
          value={newSession.title}
          onChange={(e) =>
            setNewSession({ ...newSession, title: e.target.value })
          }
        />

        <Textarea
          label="Session Description"
          minRows={3}
          value={newSession.description}
          onChange={(e) =>
            setNewSession({ ...newSession, description: e.target.value })
          }
        />

        <DatePickerInput
          label="Session Date"
          value={newSession.sessionDate}
          onChange={(value) =>
            setNewSession({ ...newSession, sessionDate: value })
          }
          minDate={new Date()}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={() => setSessionModalOpen(false)}>
            Cancel
          </Button>
          <Button color="teal" onClick={handleAddSession}>
            Add Session
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <Text size="xs" c="dimmed">{label}</Text>
    <Text fw={500}>{value || "-"}</Text>
  </div>
);

export default CourseOverview;