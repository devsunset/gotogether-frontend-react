import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-atom",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Together ",
    icon: "nc-icon nc-chat-round",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Member",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Post",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Memo",
    icon: "nc-icon nc-email-85",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Profile",
    icon: "nc-icon nc-single-02",
    component: UserProfile,
    layout: "/admin",
  },

  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
];

export default dashboardRoutes;
