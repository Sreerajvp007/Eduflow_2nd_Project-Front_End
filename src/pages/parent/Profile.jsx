
import {
  Card,
  Text,
  Button,
  Group,
  Avatar,
  Stack,
  Modal,
} from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchParentProfile,
  deleteParentProfile,
} from "../../features/parent/parentProfileSlice";
import {
  setActiveStudent,
} from "../../features/parent/parentStudentsSlice";
import { useNavigate } from "react-router-dom";
import { parentLogoutThunk } from "../../features/parent/auth/parentAuthSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  const { profile } = useSelector(
    (state) => state.parentProfile
  );

  const { students, activeStudent } = useSelector(
    (state) => state.parentStudents
  );

  useEffect(() => {
    dispatch(fetchParentProfile());
  }, [dispatch]);

  return (
    <div className="p-4 space-y-6">
      {/* ================= ACTIVE STUDENT CARD ================= */}
      <Card radius="xl" shadow="sm" withBorder p="lg">
        <Group justify="space-between">
          <Group>
            <Avatar
              radius="xl"
              size="lg"
              src={activeStudent?.profileImage}
            >
              {activeStudent?.name?.charAt(0)}
            </Avatar>
            {/* <Avatar radius="xl" size="lg">
              {activeStudent?.name?.charAt(0)}
            </Avatar> */}

            <div>
              <Text fw={600}>{activeStudent?.name}</Text>
              <Text size="sm" c="dimmed">
                Grade {activeStudent?.grade}
              </Text>
              <Text size="xs" c="gray">
                English Medium
              </Text>
            </div>
          </Group>

          <Button
            variant="outline"
            radius="xl"
            onClick={() => setOpened(true)}
            styles={{
              root: {
                borderColor: "#8B5CF6",
                color: "#8B5CF6",
              },
            }}
          >
            Switch
          </Button>
        </Group>
      </Card>

      {/* ================= OPTIONS CARD ================= */}
      <Card radius="xl" shadow="sm" withBorder>
        <Stack>
          {[
            { label: "Edit Profile", path: "/parent/edit-profile" },
            { label: "Edit Parent Details", path: "/parent/edit-parent" },
            { label: "Delete this Profile", action: "delete" },
          ].map((item) => (
            <Group
              key={item.label}
              justify="space-between"
              style={{
                padding: "12px 8px",
                cursor: "pointer",
                borderBottom: "1px solid #F1F3F5",
              }}
              onClick={() => {
                if (item.action === "delete") {
                  dispatch(deleteParentProfile());
                  navigate("/");
                } else {
                  navigate(item.path);
                }
              }}
            >
              <Text>{item.label}</Text>
              <ChevronRight size={18} />
            </Group>
          ))}
        </Stack>
      </Card>

      {/* ================= LOGOUT ================= */}
     <Button
  fullWidth
  radius="xl"
  style={{
    background: "linear-gradient(90deg,#6366F1,#EC4899)",
  }}
  onClick={async () => {
    await dispatch(parentLogoutThunk());
    navigate("/parent/login");
  }}
>
  Log Out
</Button>

      {/* ================= SWITCH MODAL ================= */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        radius="xl"
        title={<Text fw={600}>Switch Student</Text>}
      >
        <div className="space-y-3">
          {students.map((student) => {
            const isActive =
              activeStudent?._id === student._id;

            return (
              <Card
                key={student._id}
                withBorder
                radius="xl"
                onClick={() => {
                  dispatch(setActiveStudent(student));
                  setOpened(false);
                }}
                style={{
                  cursor: "pointer",
                  border: isActive
                    ? "2px solid #8B5CF6"
                    : "1px solid #E5E7EB",
                  backgroundColor: isActive
                    ? "#F5F3FF"
                    : "white",
                }}
              >
                <Group justify="space-between">
                  <div>
                    <Text fw={600}>{student.name}</Text>
                    <Text size="sm" c="dimmed">
                      Grade {student.grade}
                    </Text>
                  </div>

                  {isActive && (
                    <Text size="xs" c="violet.6" fw={600}>
                      Active
                    </Text>
                  )}
                </Group>
              </Card>
            );
          })}

          <Button
            fullWidth
            mt="md"
            radius="xl"
            onClick={() => {
              setOpened(false);
              navigate("/parent/add-student");
            }}
            style={{
              background:
                "linear-gradient(90deg,#8B5CF6,#6366F1)",
            }}
          >
            + Add Student
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;