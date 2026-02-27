
import {
  Card,
  TextInput,
  Button,
  Stack,
  Title,
  Select,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateStudent } from "../../../features/parent/parentStudentsSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeStudent } = useSelector(
    (state) => state.parentStudents
  );

  const [name, setName] = useState(activeStudent?.name || "");
  const [grade, setGrade] = useState(activeStudent?.grade || "");
  const [board, setBoard] = useState(activeStudent?.board || "STATE");

  const handleUpdate = async () => {
    await dispatch(
      updateStudent({
        studentId: activeStudent._id,
        data: { name, grade, board },
      })
    );

    navigate("/parent/profile");
  };

  return (
    <div className="p-4">
      <Card radius="xl" shadow="sm" withBorder p="lg">
        <Title order={4} mb="md">
          Edit Student Profile
        </Title>

        <Stack>

          {/* Name */}
          <TextInput
            label="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Grade */}
          <TextInput
            label="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />

          {/* Board Dropdown */}
          <Select
            label="Board"
            value={board}
            onChange={setBoard}
            data={[
              { value: "STATE", label: "STATE" },
              { value: "CBSE", label: "CBSE" },
              { value: "ICSE", label: "ICSE" },
            ]}
          />

          <Button
            radius="xl"
            onClick={handleUpdate}
            style={{
              background:
                "linear-gradient(90deg,#8B5CF6,#6366F1)",
            }}
          >
            Update
          </Button>

        </Stack>
      </Card>
    </div>
  );
};

export default EditProfile;