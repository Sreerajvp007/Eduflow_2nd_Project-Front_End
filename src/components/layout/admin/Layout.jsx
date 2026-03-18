
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
  Indicator, 
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
  Bell, 
  BookOpen
} from "lucide-react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";

import { adminLogout } from "../../../features/admin/adminAuthSlice";
import { fetchProfileEditRequests } from "../../../features/admin/adminTutorSlice"; 


const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Tutor Management", icon: GraduationCap, path: "/admin/tutors" },
  { label: "Students & Parents", icon: Users, path: "/admin/students" },
  { label: "Classes & Subjects", icon: BookOpen, path: "/admin/classes" },
  { label: "Payments & Revenue", icon: CreditCard, path: "/admin/payments" },
  { label: "Reviews & Feedback", icon: Star, path: "/admin/feedback" },
  { label: "Reports", icon: BarChart3, path: "/admin/reports" },
  { label: "Platform Settings", icon: Settings, path: "/admin/settings" },
];

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
      <Group justify="space-between" px="md" py="sm">
        {!collapsed && (
          <Text size="xs" fw={700} c="dimmed">
            ADMIN PANEL
          </Text>
        )}

        <Group gap={4}>
          {showCollapseToggle && (
            <ActionIcon size="sm" variant="subtle" onClick={onToggleCollapse}>
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
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
        {navItems.map((item) => {
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

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [drawerOpened, drawer] = useDisclosure(false);
  const [collapsed, setCollapsed] = useState(false);

  const { admin } = useSelector((state) => state.admin);
 
const { editRequests } = useSelector((state) => state.adminTutors);

const notificationCount = editRequests?.length || 0;
 
  useEffect(() => {
    console.log("🔌 ADMIN SSE CONNECTING...");

const es = new EventSource(
  `${import.meta.env.VITE_API_BASE_URL}/admin/notifications/stream`
);

    es.onopen = () => {
      console.log("✅ ADMIN SSE CONNECTED");
    };

    es.onmessage = (e) => {
      console.log("🔥 SSE RECEIVED:", e.data);

      const data = JSON.parse(e.data);

if (data.type === "NEW_PROFILE_REQUEST") {
  dispatch(fetchProfileEditRequests());
}
    };

    es.onerror = (err) => {
      console.log("❌ SSE ERROR", err);
    };

    return () => es.close();
  }, [dispatch]);
  useEffect(() => {
  
  dispatch(fetchProfileEditRequests());
}, [dispatch]);

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
        navbar={isDesktop ? { width: collapsed ? 88 : 280 } : undefined}
        styles={{
          main: { backgroundColor: "#f8fafc" },
        }}
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
                {admin?.fullName}
              </Text>
            </Group>

            {/* 🔔 RIGHT SIDE */}
            <Group gap="sm">

              {/* 🔔 NOTIFICATION ICON */}
              <Indicator
                inline
                label={notificationCount}
                size={16}
                disabled={notificationCount === 0}
              >
                <ActionIcon
                  variant="subtle"
                  onClick={() => navigate("/admin/notifications")}
                >
                  <Bell size={20} />
                </ActionIcon>
              </Indicator>

              <Avatar radius="xl" color="indigo">
                {admin?.fullName?.charAt(0)}
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

        {isDesktop && (
          <AppShell.Navbar p="md">
            <SidebarContent
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

export default AdminLayout;