import {
  AppShell,
  Group,
  Text,
  Box,
  Avatar,
  Center,
  Loader,
  NavLink,
  ActionIcon,
  ScrollArea,
  Divider,
  ThemeIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  Home,
  BookOpen,
  Calendar,
  CreditCard,
  User,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchParentStudents } from "../../../features/parent/parentStudentsSlice";
import { fetchParentProfile } from "../../../features/parent/parentProfileSlice";

const navItems = [
  { label: "Dashboard", icon: Home, path: "/parent/dashboard" },
  { label: "Courses", icon: BookOpen, path: "/parent/courses" },
  { label: "Classes", icon: Calendar, path: "/parent/sessions" },
  { label: "Payments", icon: CreditCard, path: "/parent/payments" },
  { label: "Profile", icon: User, path: "/parent/profile" },
];

const ParentSidebar = ({ collapsed, toggleCollapse }) => {
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
            PARENT PANEL
          </Text>
        )}

        <ActionIcon size="sm" variant="subtle" onClick={toggleCollapse}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </ActionIcon>
      </Group>

      <Divider />

      <ScrollArea flex={1} px={collapsed ? 0 : "xs"} py="sm">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              label={collapsed ? null : item.label}
              active={active}
              onClick={() => navigate(item.path)}
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
                    color="violet"
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

const ParentLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [collapsed, setCollapsed] = useState(false);

  const { loading } = useSelector((state) => state.parentStudents);

  useEffect(() => {
    dispatch(fetchParentStudents());
    dispatch(fetchParentProfile());
  }, [dispatch]);

  const mainPages = navItems.map((item) => item.path);
  const showBack = !mainPages.includes(location.pathname);

  const currentPage = location.pathname.split("/").pop();

  return (
    <AppShell
      padding={0}
      header={{ height: 64 }}
      navbar={isDesktop ? { width: collapsed ? 88 : 280 } : undefined}
      footer={!isDesktop ? { height: 72 } : undefined}
      styles={{
        main: {
          backgroundColor: "#f8fafc",
        },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="lg" justify="space-between">
          <Group gap={10}>
            {!isDesktop && showBack && (
              <ArrowLeft
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              />
            )}

            <Text fw={700} size="lg">
              ParentFlow
            </Text>
          </Group>

          <Avatar radius="xl" color="violet">
            P
          </Avatar>
        </Group>
      </AppShell.Header>

      {isDesktop && (
        <AppShell.Navbar p="md">
          <ParentSidebar
            collapsed={collapsed}
            toggleCollapse={() => setCollapsed(!collapsed)}
          />
        </AppShell.Navbar>
      )}

      <AppShell.Main>{loading ? <Loader mt="xl" /> : <Outlet />}</AppShell.Main>

      {!isDesktop && (
        <AppShell.Footer>
          <Box h="100%" bg="white" style={{ borderTop: "1px solid #E5E7EB" }}>
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
                    <Icon size={22} color={active ? "#7C3AED" : "#9CA3AF"} />
                    <Text
                      size="xs"
                      fw={active ? 600 : 500}
                      c={active ? "violet.6" : "gray.5"}
                    >
                      {item.label}
                    </Text>
                  </Center>
                );
              })}
            </Group>
          </Box>
        </AppShell.Footer>
      )}
    </AppShell>
  );
};

export default ParentLayout;
