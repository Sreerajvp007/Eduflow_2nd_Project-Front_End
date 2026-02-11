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
  Users,
  GraduationCap,
  Calendar,
  CreditCard,
  Star,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../../features/admin/adminAuthSlice";

/* ================= NAV CONFIG ================= */
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Tutor Management", icon: GraduationCap, path: "/admin/tutors" },
  { label: "Students & Parents", icon: Users, path: "/admin/students" },
  { label: "Sessions & Bookings", icon: Calendar, path: "/admin/sessions" },
  { label: "Payments & Revenue", icon: CreditCard, path: "/admin/payments" },
  { label: "Reviews & Feedback", icon: Star, path: "/admin/reviews" },
  { label: "Reports", icon: BarChart3, path: "/admin/reports" },
  { label: "Platform Settings", icon: Settings, path: "/admin/settings" },
];

/* ================= SIDEBAR CONTENT ================= */
const SidebarContent = ({
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
      {/* ===== SIDEBAR HEADER ===== */}
      <Group justify="space-between" px="md" py="sm">
        {!collapsed && (
          <Text size="xs" fw={700} c="dimmed">
            ADMIN PANEL
          </Text>
        )}

        <Group gap={4}>
          {/* Collapse toggle (DESKTOP ONLY) */}
          {showCollapseToggle && (
            <ActionIcon
              size="sm"
              variant="subtle"
              onClick={onToggleCollapse}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </ActionIcon>
          )}

          {/* Close button (MOBILE + TABLET) */}
          {showClose && (
            <ActionIcon
              size="sm"
              variant="subtle"
              onClick={onClose}
            >
              <X size={16} />
            </ActionIcon>
          )}
        </Group>
      </Group>

      <Divider />

      {/* ===== MENU ===== */}
      <ScrollArea flex={1} px={collapsed ? 0 : "xs"} py="sm">
        {navItems.map((item) => {
          // const active = location.pathname === item.path;
          const active = location.pathname.startsWith(item.path);

          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              label={collapsed ? null : item.label}
              onClick={() => {
                navigate(item.path);
                onNavigate?.();
              }}
              active={active}
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
                    color="indigo"
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
const AdminLayout = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [drawerOpened, drawer] = useDisclosure(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* ===== MOBILE + TABLET DRAWER ===== */}
      <Drawer
        opened={drawerOpened}
        onClose={drawer.close}
        size={280}
        padding="md"
        hiddenFrom="lg"
        withCloseButton={false}
      >
        <SidebarContent
          collapsed={false}
          showClose
          onClose={drawer.close}
          onNavigate={drawer.close}
        />
      </Drawer>

      <AppShell
        padding="lg"
        header={{ height: 64 }}
        navbar={
          isDesktop
            ? { width: collapsed ? 88 : 280 }
            : undefined
        }
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
                TutorAdmin
              </Text>
            </Group>

            <Group gap="sm">
              <Avatar radius="xl" color="indigo">
                A
              </Avatar>

              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => dispatch(adminLogout())}
              >
                <LogOut size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </AppShell.Header>

        {/* ===== DESKTOP SIDEBAR ===== */}
        {isDesktop && (
          <AppShell.Navbar p="md">
            <SidebarContent
              collapsed={collapsed}
              showCollapseToggle
              onToggleCollapse={() => setCollapsed(!collapsed)}
            />
          </AppShell.Navbar>
        )}

        {/* ===== MAIN CONTENT ===== */}
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

export default AdminLayout;
