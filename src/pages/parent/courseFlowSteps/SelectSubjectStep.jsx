
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Card, Text, Button, Loader } from "@mantine/core";
import {
  fetchSubjects,
  setSubject,
  nextStep,
} from "../../../features/parent/parentCourseSlice";

const SelectSubjectStep = () => {
  const dispatch = useDispatch();

  const { subjects, selectedSubject, loading } = useSelector(
    (state) => state.parentCourse
  );

  const { activeStudent } = useSelector(
    (state) => state.parentStudents
  );

  useEffect(() => {
    if (activeStudent) {
      dispatch(fetchSubjects({ studentId: activeStudent._id }));
    }
  }, [dispatch, activeStudent]);

 if (!activeStudent) return null;

  if (loading) return <Loader />;

 return (
  <>
    <Grid gutter="lg">
      {subjects.map((subject) => {
        const isSelected = selectedSubject === subject;

        return (
          <Grid.Col span={6} md={3} key={subject}>
            <Card
              radius="xl"
              shadow={isSelected ? "md" : "sm"}
              onClick={() => dispatch(setSubject(subject))}
              style={{
                cursor: "pointer",
                padding: "28px 16px",
                textAlign: "center",
                transition: "all 0.25s ease",
                border: isSelected
                  ? "2px solid #6366f1"
                  : "1px solid #e5e7eb",
                background: isSelected
                  ? "#eef2ff"
                  : "#ffffff",
                transform: isSelected ? "scale(1.03)" : "scale(1)",
              }}
            >
              <Text
                fw={600}
                size="md"
                style={{
                  color: isSelected ? "#4f46e5" : "#374151",
                }}
              >
                {subject}
              </Text>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>

    <div className="mt-10">
      <Button
        fullWidth
        radius="xl"
        size="lg"
        disabled={!selectedSubject}
        onClick={() => dispatch(nextStep())}
        style={{
          background: selectedSubject
            ? "linear-gradient(90deg, #6366f1, #ec4899)"
            : "#e5e7eb",
          color: selectedSubject ? "white" : "#9ca3af",
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

export default SelectSubjectStep;