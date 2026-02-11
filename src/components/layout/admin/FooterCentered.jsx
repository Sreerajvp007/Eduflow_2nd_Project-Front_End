import {
  ActionIcon,
  Anchor,
  Group,
  Box,
  Text,
} from "@mantine/core";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";

export function FooterCentered() {
  return (
    <Box
      mt="xl"
      bg="white"
      style={{ borderTop: "1px solid #e5e7eb" }}
    >
      <Group
        px="xl"
        py="md"
        justify="space-between"
        align="center"
      >
        {/* Left */}
        <Text fw={700}>TutorAdmin</Text>

        {/* Center */}
        <Group gap="md">
          <Anchor c="dimmed" size="sm">Contact</Anchor>
          <Anchor c="dimmed" size="sm">Privacy</Anchor>
          <Anchor c="dimmed" size="sm">Blog</Anchor>
          <Anchor c="dimmed" size="sm">Careers</Anchor>
        </Group>

        {/* Right */}
        <Group gap="xs">
          <ActionIcon variant="default" radius="xl">
            <IconBrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon variant="default" radius="xl">
            <IconBrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon variant="default" radius="xl">
            <IconBrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
}
