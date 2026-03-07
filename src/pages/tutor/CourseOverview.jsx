
import {
  Text,
  TextInput,
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

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");

  const [sessions, setSessions] = useState([]);

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
      setStrengths(lp.strengths || "");
      setImprovements(lp.improvements || "");

      setSessions(selectedCourse.sessions || []);

    }
  }, [selectedCourse]);

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

  /* ================= LOADING ================= */

  if (loading || !selectedCourse) {
    return (
      <div className="flex justify-center py-20">
        <Loader color="teal" />
      </div>
    );
  }

  return (

    <div className="w-full px-4 sm:px-6 lg:px-10 py-6 space-y-10">

      {/* ================= COURSE DETAILS ================= */}

      <Card radius="xl" shadow="sm" p="lg" withBorder>

        <div className="flex justify-between items-start">

          <div>
            <Text fw={600}>{selectedCourse.subject}</Text>

            <Text size="xs" c="dimmed">
              Started on {new Date(selectedCourse.startDate).toLocaleDateString()}
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

      <form onSubmit={handleSubmit} className="space-y-10">

        <Text fw={600}>Learning Plan Details</Text>

        <TextInput
          label="Course Title"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        {/* DESCRIPTION */}

        <div>
          <Text size="sm" fw={500} mb={6}>Description</Text>

          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(event, editor) => {
              setDescription(editor.getData());
            }}
          />
        </div>

        <NumberInput
          label="Expected Duration (Weeks)"
          min={1}
          value={expectedDuration}
          onChange={setExpectedDuration}
        />

        {/* TUTOR NOTES */}

        <div>
          <Text size="sm" fw={500} mb={6}>Tutor Notes</Text>

          <CKEditor
            editor={ClassicEditor}
            data={tutorNotes}
            onChange={(event, editor) => {
              setTutorNotes(editor.getData());
            }}
          />
        </div>

        {/* STRENGTHS */}

        <div>
          <Text size="sm" fw={600} mb={6}>
            Student Strengths
          </Text>

          <CKEditor
            editor={ClassicEditor}
            data={strengths}
            onChange={(event, editor) => {
              setStrengths(editor.getData());
            }}
          />
        </div>

        {/* IMPROVEMENTS */}

        <div>
          <Text size="sm" fw={600} mb={6}>
            Needs Improvement
          </Text>

          <CKEditor
            editor={ClassicEditor}
            data={improvements}
            onChange={(event, editor) => {
              setImprovements(editor.getData());
            }}
          />
        </div>

        {/* ================= SESSIONS ================= */}

        <div>

          <Group justify="space-between" mb="md">

            <Text fw={600}>Course Sessions</Text>

            <Button
              size="xs"
              leftSection={<IconPlus size={14} />}
              color="teal"
              onClick={() => setSessionModalOpen(true)}
            >
              Add Session
            </Button>

          </Group>

          <div className="space-y-3">

            {sessions.map((session, index) => (

              <Card key={index} withBorder radius="md" p="md">

                <Group justify="space-between">

                  <div>

                    <Text fw={600}>{session.title}</Text>

                    <Text size="xs" c="dimmed">
                      {session.sessionDate
                        ? new Date(session.sessionDate).toLocaleDateString()
                        : "-"}
                    </Text>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: session.description,
                      }}
                    />

                  </div>

                  <ActionIcon
                    color="red"
                    variant="subtle"
                    onClick={() => handleRemoveSession(index)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>

                </Group>

              </Card>

            ))}

          </div>

        </div>

        {/* ACTION BUTTONS */}

        <Group mt="lg">

          <Button type="submit" color="teal" radius="xl">
            Save Changes
          </Button>

          {selectedCourse.courseStatus === "active" && (
            <Button
              color="green"
              variant="outline"
              radius="xl"
              onClick={() => setCompleteModalOpen(true)}
            >
              Mark as Completed
            </Button>
          )}

        </Group>

      </form>

      {/* ================= COMPLETE MODAL ================= */}

      <Modal
        opened={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
        title="Complete Course"
        centered
      >

        <Text mb="md">
          Are you sure you want to mark this course as completed?
        </Text>

        <Group justify="flex-end">

          <Button
            variant="default"
            onClick={() => setCompleteModalOpen(false)}
          >
            Cancel
          </Button>

          <Button color="green" onClick={handleMarkCompleted}>
            Confirm Completion
          </Button>

        </Group>

      </Modal>

      {/* ================= SESSION MODAL ================= */}

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

        <div style={{ marginTop: 15 }}>

          <Text size="sm" fw={500} mb={6}>
            Session Description
          </Text>

          <CKEditor
            editor={ClassicEditor}
            data={newSession.description}
            onChange={(event, editor) =>
              setNewSession({
                ...newSession,
                description: editor.getData(),
              })
            }
          />

        </div>

        <DatePickerInput
          label="Session Date"
          value={newSession.sessionDate}
          onChange={(value) =>
            setNewSession({ ...newSession, sessionDate: value })
          }
          minDate={new Date()}
        />

        <Group justify="flex-end" mt="md">

          <Button
            variant="default"
            onClick={() => setSessionModalOpen(false)}
          >
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