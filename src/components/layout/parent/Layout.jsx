import {
  AppShell,
  Group,
  Text,
  Box,
  Avatar,
  Center,
} from "@mantine/core";
import {
  Home,
  BookOpen,
  Calendar,
  CreditCard,
  User,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", icon: Home, path: "/parent/dashboard" },
  { label: "Courses", icon: BookOpen, path: "/parent/courses" },
  { label: "Classes", icon: Calendar, path: "/parent/sessions" },
  { label: "Payments", icon: CreditCard, path: "/parent/payments" },
  { label: "Profile", icon: User, path: "/parent/profile" },
];

const ParentLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: 64 }}
      footer={{ height: 72 }}
      styles={{
        main: {
          backgroundColor: "#F6F7FB",
          paddingBottom: 88,
        },
      }}
    >
      {/* ================= HEADER ================= */}
      <AppShell.Header>
        <Box
          h="100%"
          px="md"
          style={{
            background: "linear-gradient(90deg,#8B5CF6,#6366F1)",
          }}
        >
          <Group h="100%" justify="space-between">
            <Text fw={600} c="white">
              Profile
            </Text>

            <Avatar radius="xl" color="white">
              S
            </Avatar>
          </Group>
        </Box>
      </AppShell.Header>

      {/* ================= MAIN ================= */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      {/* ================= BOTTOM NAV ================= */}
      <AppShell.Footer>
        <Box
          h="100%"
          bg="white"
          style={{
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <Group h="100%" grow>
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Center
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  style={{
                    flexDirection: "column",
                    cursor: "pointer",
                    gap: 4,
                  }}
                >
                  <Icon
                    size={22}
                    color={active ? "#6366F1" : "#9CA3AF"}
                  />
                  <Text
                    size="xs"
                    fw={active ? 600 : 500}
                    c={active ? "indigo.6" : "gray.5"}
                  >
                    {item.label}
                  </Text>
                </Center>
              );
            })}
          </Group>
        </Box>
      </AppShell.Footer>
    </AppShell>
  );
};

export default ParentLayout;
