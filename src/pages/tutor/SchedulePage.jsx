import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Select,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSchedule,
  createSessionAsync,
} from "../../features/tutor/scheduleSlice";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SchedulePage() {
  const dispatch = useDispatch();
  const { availability, courses } = useSelector(
    (state) => state.schedule
  );

  const [opened, setOpened] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchSchedule());
  }, [dispatch]);

  const getCourseByTime = (time) => {
    return courses.find((c) => c.timeSlot === time);
  };

  const handleCreateSession = () => {
    const course = getCourseByTime(selectedTime);

    if (!course) return alert("No student assigned");

    dispatch(
      createSessionAsync({
        courseId: course._id,
        sessionDate: selectedDate,
        startTime: selectedTime,
        endTime: selectedTime,
        title,
        description,
      })
    );

    setOpened(false);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">

        {availability.map((slot) => {
          const course = getCourseByTime(slot.time);

          return (
            <div key={slot.time} className="flex gap-2 mb-3">
              <div className="w-24 font-medium">
                {slot.time}
              </div>

              {days.map((day) => (
                <div
                  key={day}
                  className={`flex-1 p-2 rounded text-center cursor-pointer
                    ${
                      slot.status === "booked"
                        ? "bg-blue-100"
                        : "bg-green-50"
                    }
                  `}
                  onClick={() => {
                    setSelectedTime(slot.time);
                    setOpened(true);
                  }}
                >
                  {slot.status === "booked"
                    ? course?.studentId?.name
                    : ""}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Schedule Session"
      >
        <DateInput
          label="Date"
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <TextInput
          label="Session Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button fullWidth mt="md" onClick={handleCreateSession}>
          Save Session
        </Button>
      </Modal>
    </div>
  );
}