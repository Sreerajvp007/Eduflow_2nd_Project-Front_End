import { useState } from "react";
import {
  Box,
  Group,
  Text,
  Tooltip,
  UnstyledButton,
  Stack,
  Divider,
} from "@mantine/core";
import {
  IconGauge,
  IconUsers,
  IconCalendarStats,
  IconCreditCard,
  IconStar,
  IconSettings,
  IconChartBar,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

const mainLinks = [
  { icon: IconGauge, label: "Dashboard", path: "/admin/dashboard" },
  { icon: IconUsers, label: "Tutors", path: "/admin/tutors" },
  { icon: IconCalendarStats, label: "Sessions", path: "/admin/sessions" },
  { icon: IconCreditCard, label: "Payments", path: "/admin/payments" },
  { icon: IconStar, label: "Reviews", path: "/admin/reviews" },
  { icon: IconChartBar, label: "Reports", path: "/admin/reports" },
  { icon: IconSettings, label: "Settings", path: "/admin/settings" },
];

export const AdminDoubleSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(mainLinks[0]);

  return (
    <Group h="100%" gap={0} wrap="nowrap">
      {/* ===== ICON BAR ===== */}
      <Box
        w={72}
        p="md"
        bg="white"
        style={{
          borderRight: "1px solid #e5e7eb",
        }}
      >
        <Stack align="center" gap="md">
          {mainLinks.map((link) => (
            <Tooltip label={link.label} position="right" key={link.label}>
              <UnstyledButton
                onClick={() => {
                  setActive(link);
                  navigate(link.path);
                }}
                style={{
                  padding: 10,
                  borderRadius: 12,
                  background:
                    location.pathname === link.path ? "#eef2ff" : "transparent",
                }}
              >
                <link.icon size={22} />
              </UnstyledButton>
            </Tooltip>
          ))}
        </Stack>
      </Box>

      {/* ===== SECONDARY PANEL ===== */}
      <Box w={220} p="md">
        <Text fw={700} size="sm" mb="sm">
          {active.label}
        </Text>

        <Divider mb="sm" />

        <Stack gap={6}>
          <Text size="sm" c="dimmed">
            Overview
          </Text>
          <Text size="sm" c="dimmed">
            Manage
          </Text>
          <Text size="sm" c="dimmed">
            Analytics
          </Text>
        </Stack>
      </Box>
    </Group>
  );
};
