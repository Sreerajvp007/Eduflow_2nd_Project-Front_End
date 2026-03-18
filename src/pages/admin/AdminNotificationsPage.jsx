import {
  Card,
  Text,
  Stack,
  Group,
  Badge,
  Button
} from "@mantine/core";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchProfileEditRequests } from "../../features/admin/adminTutorSlice";

export default function AdminNotificationsPage() {

  const dispatch = useDispatch();
  const notifications =
    useSelector(state => state.adminTutors.editRequests) || [];

  const navigate = useNavigate();

  // ✅ FETCH ON LOAD
  useEffect(() => {
    dispatch(fetchProfileEditRequests());
  }, [dispatch]);

  return (
    <div className="space-y-4">

      <Text fw={700} size="lg">
        Notifications
      </Text>

      {notifications.length === 0 && (
        <Text c="dimmed">No notifications</Text>
      )}

      <Stack>

        {notifications.map((n) => (

          <Card key={n._id} shadow="sm" radius="md" p="md">

            <Group justify="space-between">

              <div>
                <Text fw={500}>
                  Profile edit request from {n.tutorId?.fullName}
                </Text>

                <Text size="xs" c="dimmed">
                  {new Date(n.createdAt).toLocaleString()}
                </Text>
              </div>

              <Badge color="red" size="sm">
                New
              </Badge>

            </Group>

            <Button
              mt="sm"
              size="xs"
              variant="light"
              onClick={() => navigate("/admin/tutors")}
            >
              View Request
            </Button>

          </Card>

        ))}

      </Stack>
    </div>
  );
}