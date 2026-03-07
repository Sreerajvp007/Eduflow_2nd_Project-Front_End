import {
  AppShell,
  Group,
  Text,
  Burger,
  Box,
  ScrollArea,
  ThemeIcon,
  NavLink,
  ActionIcon,
  Avatar,
  Drawer,
  Divider,
  Center,
} from "@mantine/core";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  LayoutDashboard,
  Calendar,
  Users,
  BookOpen,
  Wallet,
  Star,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tutorLogout } from "../../../features/tutor/auth/tutorAuthSlice";

const tutorNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/tutor/dashboard" },
  { label: "My Sessions", icon: Calendar, path: "/tutor/sessions" },
  { label: "My Students", icon: Users, path: "/tutor/my-students" },
  { label: "Courses", icon: BookOpen, path: "/tutor/courses" },
  { label: "Earnings", icon: Wallet, path: "/tutor/payments" },
  { label: "Reviews", icon: Star, path: "/tutor/reviews" },
  { label: "Settings", icon: Settings, path: "/tutor/settings" },
];

const TutorLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { tutor } = useSelector((state) => state.tutorAuth);

  const [drawerOpened, drawer] = useDisclosure(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (tutor && tutor.status !== "active") {
      navigate("/tutor/onboarding");
    }
  }, [tutor, navigate]);

  if (tutor && tutor.status !== "active") {
    return null;
  }

  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={drawer.close}
        size={280}
        padding="md"
        hiddenFrom="lg"
        withCloseButton={false}
      >
        <Sidebar
          collapsed={false}
          showClose
          onClose={drawer.close}
          onNavigate={drawer.close}
        />
      </Drawer>

      <AppShell
        padding="lg"
        header={{ height: 64 }}
        navbar={isDesktop ? { width: collapsed ? 88 : 280 } : undefined}
        styles={{ main: { backgroundColor: "#f8fafc" } }}
      >
        <AppShell.Header>
          <Group h="100%" px="lg" justify="space-between">
            <Group>
              <Burger
                opened={drawerOpened}
                onClick={drawer.toggle}
                hiddenFrom="lg"
              />
              <Text fw={700} size="lg">
                TutorFlow
              </Text>
            </Group>

            <Group gap="sm">
             <Group gap="sm">
  <Avatar
    radius="xl"
    size="md"
    src={tutor?.profileImage || undefined}
    alt={tutor?.fullName}
    style={{
      border: "2px solid teal"
    }}
  >
    {tutor?.fullName?.charAt(0)}
  </Avatar>
</Group>

              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => dispatch(tutorLogout())}
              >
                <LogOut size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </AppShell.Header>

        {isDesktop && (
          <AppShell.Navbar p="md">
            <Sidebar
              collapsed={collapsed}
              showCollapseToggle
              onToggleCollapse={() => setCollapsed(!collapsed)}
            />
          </AppShell.Navbar>
        )}

        <AppShell.Main>
          <Box
            bg="white"
            p="xl"
            style={{
              borderRadius: 20,
              minHeight: "calc(100vh - 120px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
            }}
          >
            <Outlet />
          </Box>
        </AppShell.Main>
      </AppShell>
    </>
  );
};

const Sidebar = ({
  collapsed,
  onNavigate,
  showClose,
  onClose,
  showCollapseToggle,
  onToggleCollapse,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      h="100%"
      bg="white"
      style={{
        borderRadius: 16,
        boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Group justify="space-between" px="md" py="sm">
        {!collapsed && (
          <Text size="xs" fw={700} c="dimmed">
            TUTOR PANEL
          </Text>
        )}

        <Group gap={4}>
          {showCollapseToggle && (
            <ActionIcon size="sm" variant="subtle" onClick={onToggleCollapse}>
              {collapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </ActionIcon>
          )}

          {showClose && (
            <ActionIcon size="sm" variant="subtle" onClick={onClose}>
              <X size={16} />
            </ActionIcon>
          )}
        </Group>
      </Group>

      <Divider />

      <ScrollArea flex={1} px={collapsed ? 0 : "xs"} py="sm">
        {tutorNavItems.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              label={collapsed ? null : item.label}
              active={active}
              onClick={() => {
                navigate(item.path);
                onNavigate?.();
              }}
              styles={{
                root: {
                  borderRadius: 12,
                  margin: "6px",
                  justifyContent: collapsed ? "center" : "flex-start",
                },
              }}
              leftSection={
                <Center w={collapsed ? "100%" : 36}>
                  <ThemeIcon
                    size={36}
                    radius="md"
                    variant={active ? "light" : "subtle"}
                    color="teal"
                  >
                    <Icon size={18} />
                  </ThemeIcon>
                </Center>
              }
            />
          );
        })}
      </ScrollArea>
    </Box>
  );
};

export default TutorLayout;
