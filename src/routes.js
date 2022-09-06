import Home from "views/Home.js";
import Together from "views/Together.js";
import Member from "views/Member.js";
import Post from "views/Post.js";
import Memo from "views/Memo.js";
import Profile from "views/Profile.js";

const gotogetherRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-atom",
    component: Home,
    layout: "/admin",
  },
  {
    path: "/together",
    name: "Together ",
    icon: "nc-icon nc-chat-round",
    component: Together,
    layout: "/admin",
  },
  {
    path: "/member",
    name: "Member",
    icon: "nc-icon nc-circle-09",
    component: Member,
    layout: "/admin",
  },
  {
    path: "/post",
    name: "Post",
    icon: "nc-icon nc-notes",
    component: Post,
    layout: "/admin",
  },
  {
    path: "/memo",
    name: "Memo",
    icon: "nc-icon nc-email-85",
    component: Memo,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-single-02",
    component: Profile,
    layout: "/admin",
  },
];

export default gotogetherRoutes;
