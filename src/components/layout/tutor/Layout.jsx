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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { tutorLogout } from "../../../features/tutor/auth/tutorAuthSlice";

/* ================= TUTOR NAV CONFIG ================= */
const tutorNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/tutor/dashboard" },
  { label: "My Sessions", icon: Calendar, path: "/tutor/sessions" },
  { label: "My Students", icon: Users, path: "/tutor/students" },
  { label: "Courses", icon: BookOpen, path: "/tutor/courses" },
  { label: "Earnings", icon: Wallet, path: "/tutor/earnings" },
  { label: "Reviews", icon: Star, path: "/tutor/reviews" },
  { label: "Settings", icon: Settings, path: "/tutor/settings" },
];

/* ================= SIDEBAR ================= */
const TutorSidebar = ({
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
      {/* ===== HEADER ===== */}
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

      {/* ===== MENU ===== */}
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

/* ================= MAIN LAYOUT ================= */
const TutorLayout = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [drawerOpened, drawer] = useDisclosure(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* ===== MOBILE / TABLET DRAWER ===== */}
      <Drawer
        opened={drawerOpened}
        onClose={drawer.close}
        size={280}
        padding="md"
        hiddenFrom="lg"
        withCloseButton={false}
      >
        <TutorSidebar
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
        styles={{
          main: { backgroundColor: "#f8fafc" },
        }}
      >
        {/* ===== HEADER ===== */}
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
              <Avatar radius="xl" color="teal">
                T
              </Avatar>

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

        {/* ===== DESKTOP SIDEBAR ===== */}
        {isDesktop && (
          <AppShell.Navbar p="md">
            <TutorSidebar
              collapsed={collapsed}
              showCollapseToggle
              onToggleCollapse={() => setCollapsed(!collapsed)}
            />
          </AppShell.Navbar>
        )}

        {/* ===== CONTENT ===== */}
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

export default TutorLayout;
