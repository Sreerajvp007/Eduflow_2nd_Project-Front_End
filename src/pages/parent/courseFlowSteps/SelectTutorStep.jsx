
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Text, Button, Avatar, Group } from "@mantine/core";
import {
  fetchTutors,
  setTutor,
  nextStep,
  prevStep,
} from "../../../features/parent/parentCourseSlice";

const SelectTutorStep = () => {
  const dispatch = useDispatch();

  const {
    tutors,
    selectedTutor,
    selectedSubject,
  } = useSelector((state) => state.parentCourse);

  const { activeStudent } = useSelector(
    (state) => state.parentStudents
  );

  useEffect(() => {
    if (activeStudent && selectedSubject) {
      dispatch(
        fetchTutors({
          studentId: activeStudent._id,
          subject: selectedSubject,
        })
      );
    }
  }, [dispatch, activeStudent, selectedSubject]);

  return (
   <>
  {tutors.map((tutor) => {
    const isSelected = selectedTutor?._id === tutor._id;

    return (
      <Card
        key={tutor._id}
        radius="xl"
        shadow={isSelected ? "md" : "sm"}
        style={{
          marginBottom: 20,
          padding: "20px",
          cursor: "pointer",
          transition: "all 0.25s ease",
          border: isSelected
            ? "2px solid #7C5CFA"
            : "1px solid #e5e7eb",
          background: isSelected
            ? "#f3f0ff"
            : "#ffffff",
          transform: isSelected ? "scale(1.02)" : "scale(1)",
        }}
        onClick={() => dispatch(setTutor(tutor))}
      >
        <Group align="center">
          <Avatar
            src={tutor.profileImage}
            radius="xl"
            size={56}
          />

          <div>
            <Text
              fw={600}
              size="md"
              style={{
                color: isSelected ? "#5B6EF5" : "#1f2937",
              }}
            >
              {tutor.fullName}
            </Text>

            <Text size="sm" c="dimmed">
              {tutor.teachingExperience} yrs experience
            </Text>

            <Text
              size="sm"
              fw={500}
              style={{
                marginTop: 4,
                color: "#374151",
              }}
            >
              ₹{tutor.monthlyFee}/Month
            </Text>
          </div>
        </Group>
      </Card>
    );
  })}

<div className="flex gap-4 mt-10">
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
    Back
  </Button>

  <Button
    radius="xl"
    size="lg"
    fullWidth
    disabled={!selectedTutor}
    onClick={() => dispatch(nextStep())}
    style={{
      background: selectedTutor
        ? "linear-gradient(90deg, #6366f1, #ec4899)"
        : "#e5e7eb",
      color: selectedTutor ? "white" : "#9ca3af",
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

export default SelectTutorStep;