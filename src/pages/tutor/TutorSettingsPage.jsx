

import {
  Card,
  Text,
  Button,
  Stack,
  Group,
  ThemeIcon
} from "@mantine/core";

import { IconUser, IconBuildingBank } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function TutorSettingsPage() {

  return (

    <div className="max-w-4xl mx-auto p-6">

      <Text fw={700} size="xl" mb="md">
        Settings
      </Text>

      <Stack gap="lg">

        {/* Profile Settings */}

        <Card
          withBorder
          radius="md"
          shadow="sm"
          p="lg"
        >

          <Group justify="space-between">

            <Group>

              <ThemeIcon size="lg" variant="light" color="blue">
                <IconUser size={20} />
              </ThemeIcon>

              <div>

                <Text fw={600}>
                  Profile
                </Text>

                <Text size="sm" c="dimmed">
                  Update your personal details and profile information
                </Text>

              </div>

            </Group>

            <Link to="/tutor/settings/profile">

              <Button variant="light">
                Edit Profile
              </Button>

            </Link>

          </Group>

        </Card>


        {/* Bank Details */}

        <Card
          withBorder
          radius="md"
          shadow="sm"
          p="lg"
        >

          <Group justify="space-between">

            <Group>

              <ThemeIcon size="lg" variant="light" color="green">
                <IconBuildingBank size={20} />
              </ThemeIcon>

              <div>

                <Text fw={600}>
                  Bank Details
                </Text>

                <Text size="sm" c="dimmed">
                  Add or update your bank account for tutor payouts
                </Text>

              </div>

            </Group>

            <Link to="/tutor/settings/bank">

              <Button color="green" variant="light">
                Add / Update
              </Button>

            </Link>

          </Group>

        </Card>

      </Stack>

    </div>

  );

}