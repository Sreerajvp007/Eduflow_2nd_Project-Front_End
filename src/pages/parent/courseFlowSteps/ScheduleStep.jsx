
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Group, Text, Card } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  setSchedule,
  nextStep,
  prevStep,
} from "../../../features/parent/parentCourseSlice";

const ScheduleStep = () => {
  const dispatch = useDispatch();
  const { selectedTutor } = useSelector(
    (state) => state.parentCourse
  );

  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);

  if (!selectedTutor) {
    return <Text>Please select a tutor first.</Text>;
  }

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  const handleContinue = () => {
    if (!date || !slot) return;

    dispatch(
      setSchedule({
        startDate: date,
        timeSlot: slot,
      })
    );

    dispatch(nextStep());
  };

  return (
 <>
  {/* Date Picker */}
  <div className="mb-6">
    <DateInput
      label="Start Date"
      placeholder="Select start date"
      value={date}
      onChange={setDate}
      minDate={today}
      maxDate={maxDate}
      radius="xl"
      size="md"
    />
  </div>

  {/* Time Slot Title */}
  <Text fw={600} mb="sm">
    Available Time Slots
  </Text>

  {/* Time Slots */}
 <div className="grid grid-cols-2 gap-4 mb-10">
  {selectedTutor?.availability
    ?.filter((slotItem) => slotItem.status === "available")
    ?.map((slotItem) => {
      const isSelected = slot === slotItem.time;

      return (
        <Card
          key={slotItem._id}
          radius="xl"
          shadow={isSelected ? "md" : "sm"}
          onClick={() => setSlot(slotItem.time)}
          style={{
            cursor: "pointer",
            padding: "16px",
            textAlign: "center",
            transition: "all 0.25s ease",
            border: isSelected
              ? "2px solid #6366f1"
              : "1px solid #e5e7eb",
            background: isSelected
              ? "#eef2ff"
              : "#ffffff",
            transform: isSelected ? "scale(1.03)" : "scale(1)",
            fontWeight: 500,
          }}
        >
          {slotItem.time}
        </Card>
      );
    })}
</div>

  {/* Buttons */}
  <div className="flex gap-4 mt-6">
    <Button
      radius="xl"
      size="lg"
      variant="default"
      fullWidth
      onClick={() => dispatch(prevStep())}
      style={{
        border: "1px solid #e5e7eb",
        fontWeight: 500,
      }}
    >
      ← Back
    </Button>

    <Button
      radius="xl"
      size="lg"
      fullWidth
      disabled={!date || !slot}
      onClick={handleContinue}
      style={{
        background:
          date && slot
            ? "linear-gradient(90deg, #6366f1, #ec4899)"
            : "#e5e7eb",
        color: date && slot ? "white" : "#9ca3af",
        fontWeight: 600,
        transition: "all 0.3s ease",
      }}
    >
      Continue →
    </Button>
  </div>
</>
  );
};

export default ScheduleStep;