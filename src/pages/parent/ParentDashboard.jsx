import { Card, Text, Stack } from "@mantine/core";

const ParentDashboard = () => {
  return (
    <Stack gap="md">
      <Card radius="lg" shadow="sm">
        <Text fw={600}>Emily Davis</Text>
        <Text size="sm" c="dimmed">
          English • Medium
        </Text>
      </Card>

      <Card radius="lg" shadow="sm">
        <Text fw={600}>Explore Our Courses</Text>
        <Text size="sm" c="dimmed">
          Choose a subject and start learning
        </Text>
      </Card>
    </Stack>
  );
};

export default ParentDashboard;
