
import {
  Card,
  TextInput,
  Select,
  Button,
  Stack,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../../features/parent/parentStudentsSlice";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    grade: "",
    board: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(addStudent(form));

    if (addStudent.fulfilled.match(result)) {
      navigate("/parent/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md">

        <Card
          radius="xl"
          shadow="md"
          withBorder
          p="xl"
          className="bg-white"
        >
          <Title order={4} mb="lg" ta="center">
            Add Student
          </Title>

          <form onSubmit={handleSubmit}>
            <Stack>

              {/* Student Name */}
              <TextInput
                label="Student Name"
                placeholder="Enter student name"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              {/* Grade */}
              <TextInput
                label="Grade"
                placeholder="Eg: 5, 6, 7"
                required
                value={form.grade}
                onChange={(e) =>
                  setForm({ ...form, grade: e.target.value })
                }
              />

              {/* Board */}
              <Select
                label="Board"
                placeholder="Select board"
                required
                data={[
                  { value: "STATE", label: "STATE" },
                  { value: "CBSE", label: "CBSE" },
                  { value: "ICSE", label: "ICSE" },
                ]}
                value={form.board}
                onChange={(value) =>
                  setForm({ ...form, board: value })
                }
              />

              {/* Submit */}
              <Button
                type="submit"
                radius="xl"
                mt="md"
                fullWidth
                disabled={
                  !form.name || !form.grade || !form.board
                }
                style={{
                  background:
                    "linear-gradient(90deg,#8B5CF6,#6366F1)",
                }}
              >
                Save Student
              </Button>

            </Stack>
          </form>

        </Card>

      </div>

    </div>
  );
};

export default AddStudent;