import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  HomeOutlined,
  BedOutlined,
  ContactsOutlined,
  ReceiptOutlined,
  PersonOutlined,
  CalendarTodayOutlined,
  HelpOutlineOutlined,
  BarChartOutlined,
  PieChartOutlineOutlined,
  TimelineOutlined,
  MapOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme";

const groupedMenu = [
  {
    title: "Main",
    items: [{ label: "Dashboard", icon: <HomeOutlined />, path: "/admin" }],
  },
  {
    title: "Data",
    items: [
      { label: "Quản lý phòng", icon: <BedOutlined />, path: "/admin/team" },
      {
        label: "Contacts",
        icon: <ContactsOutlined />,
        path: "/admin/contacts",
      },
      { label: "Invoices", icon: <ReceiptOutlined />, path: "/admin/invoices" },
    ],
  },
  {
    title: "Pages",
    items: [
      { label: "Profile Form", icon: <PersonOutlined />, path: "/admin/form" },
      {
        label: "Calendar",
        icon: <CalendarTodayOutlined />,
        path: "/admin/calendar",
      },
      { label: "FAQ", icon: <HelpOutlineOutlined />, path: "/admin/faq" },
    ],
  },
  {
    title: "Charts",
    items: [
      { label: "Bar Chart", icon: <BarChartOutlined />, path: "/admin/bar" },
      {
        label: "Pie Chart",
        icon: <PieChartOutlineOutlined />,
        path: "/admin/pie",
      },
      { label: "Line Chart", icon: <TimelineOutlined />, path: "/admin/line" },
      { label: "Geography", icon: <MapOutlined />, path: "/admin/geography" },
    ],
  },
];

const drawerWidth = 240;

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:768px)");
  const location = useLocation();
  const [open, setOpen] = useState(!isMobile);

  const handleToggle = () => setOpen(!open);

  return (
    <>
      {/* Toggle Button */}
      <IconButton
        onClick={handleToggle}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1300,
          color: colors.grey[100],
          background: colors.primary[500],
          "&:hover": { background: colors.primary[400] },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          },
        }}
      >
        <Box className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <Box className="p-4 text-center">
            <Typography variant="h4" fontWeight="bold">
              ADMINIS
            </Typography>
          </Box>

          {/* Avatar + Info */}
          <Box className="text-center mb-4">
            <Avatar
              src="/assets/user.png"
              sx={{ width: 80, height: 80, margin: "0 auto" }}
            />
            <Typography variant="h6" className="mt-2">
              Ed Roh
            </Typography>
            <Typography variant="body2" sx={{ color: colors.greenAccent[500] }}>
              VP Fancy Admin
            </Typography>
          </Box>

          <Divider sx={{ borderColor: colors.grey[600] }} />

          {/* Menu */}
          <Box className="flex-1 overflow-y-auto">
            {groupedMenu.map((group) => (
              <Box key={group.title} className="mb-2">
                <Typography
                  variant="subtitle2"
                  className="text-gray-300 px-6 pt-3 text-xs tracking-wider uppercase"
                >
                  {group.title}
                </Typography>
                <nav>
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link to={item.path} key={item.label}>
                        <div
                          className={`flex items-center gap-4 px-6 py-2 cursor-pointer rounded-lg transition-colors ${
                            isActive
                              ? "bg-primary-600 text-green-400"
                              : "hover:bg-primary-500 text-white"
                          }`}
                        >
                          <div className="text-inherit">{item.icon}</div>
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </Box>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
