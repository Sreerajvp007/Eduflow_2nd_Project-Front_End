
import {
  Text,
  TextInput,
  Button,
  ActionIcon,
  NumberInput,
  Modal,
  Group,
  Loader,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchTutorCourseById,
  saveLearningPlan,
} from "../../features/tutor/course/tutorCourseSlice";

const LearningPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { selectedCourse, loading } = useSelector(
    (state) => state.tutorCourses
  );

  const course = selectedCourse;

  const [sessions, setSessions] = useState([]);
  const [opened, setOpened] = useState(false);

  const [newSession, setNewSession] = useState({
    title: "",
    description: "",
    sessionDate: null,
  });

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [expectedDuration, setExpectedDuration] = useState("");
  const [tutorNotes, setTutorNotes] = useState("");

  useEffect(() => {
    dispatch(fetchTutorCourseById(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    if (course?.learningPlan) {
      setCourseName(course.learningPlan.courseName || "");
      setDescription(course.learningPlan.description || "");
      setExpectedDuration(course.learningPlan.expectedDuration || "");
      setTutorNotes(course.learningPlan.tutorNotes || "");
    }
  }, [course]);

  if (loading || !course) {
    return (
      <div className="flex justify-center py-20">
        <Loader color="teal" />
      </div>
    );
  }

  const handleAddSession = () => {
    if (!newSession.title) return;

    setSessions([...sessions, newSession]);

    setNewSession({
      title: "",
      description: "",
      sessionDate: null,
    });

    setOpened(false);
  };

  const removeSession = (index) => {
    setSessions(sessions.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const result = await dispatch(
      saveLearningPlan({
        courseId,
        data: {
          courseName,
          description,
          expectedDuration,
          tutorNotes,
          sessions,
          isPublished: true,
        },
      })
    );

    if (saveLearningPlan.fulfilled.match(result)) {
      navigate("/tutor/dashboard");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-6">

      <div className="mb-8">
        <Text fw={700} size="xl">
          Create Learning Plan
        </Text>
      </div>

      {/* Course Details */}
      <div className="border border-gray-200 rounded-xl p-6 bg-white mb-10">
        <Text fw={600} mb="md">Course Overview</Text>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Info label="Student" value={course.studentId?.name} />
          <Info label="Parent" value={course.parentId?.fullName} />
          <Info label="Subject" value={course.subject} />
          <Info label="Grade" value={course.classLevel} />
          <Info label="Time Slot" value={course.timeSlot} />
        </div>
      </div>

      {/* Learning Plan */}
      <div className="space-y-6">

        <TextInput
          label="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        <div>
          <Text size="sm" fw={500} mb={6}>Course Description</Text>

          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(event, editor) =>
              setDescription(editor.getData())
            }
          />
        </div>

        <NumberInput
          label="Expected Duration (Months)"
          min={1}
          value={expectedDuration}
          onChange={setExpectedDuration}
        />

        <div>
          <Text size="sm" fw={500} mb={6}>Tutor Notes</Text>

          <CKEditor
            editor={ClassicEditor}
            data={tutorNotes}
            onChange={(event, editor) =>
              setTutorNotes(editor.getData())
            }
          />
        </div>
      </div>

      {/* Sessions */}
      <div className="mt-10">

        <Group justify="space-between" mb="md">
          <Text fw={600}>Course Sessions</Text>

          <Button
            size="xs"
            leftSection={<IconPlus size={14} />}
            color="teal"
            onClick={() => setOpened(true)}
          >
            Add Session
          </Button>
        </Group>

        {sessions.map((session, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 mb-4 bg-white"
          >
            <Group justify="space-between">
              <Text fw={600}>{session.title}</Text>

              <ActionIcon
                color="red"
                variant="subtle"
                onClick={() => removeSession(index)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>

            <div
              className="mt-2 text-sm text-gray-700"
              dangerouslySetInnerHTML={{
                __html: session.description,
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <Button color="teal" radius="xl" onClick={handleSubmit}>
          Publish Learning Plan
        </Button>
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
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

        <div className="mt-4">
          <Text size="sm" fw={500} mb={6}>Session Description</Text>

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
          <Button variant="default" onClick={() => setOpened(false)}>
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

export default LearningPlan;