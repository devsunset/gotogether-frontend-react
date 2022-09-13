import Home from 'views/Home.js';
import Together from 'views/Together.js';
import Togetheredit from 'views/Togetheredit.js';
import Togetherdetail from 'views/Togetherdetail.js';
import Member from 'views/Member.js';
import Post from 'views/Post.js';
import Postedit from 'views/Postedit.js';
import Postdetail from 'views/Postdetail.js';
import Memo from 'views/Memo.js';
import Profile from 'views/Profile.js';
import Login from 'components/Login.js';
import Register from 'components/Register.js';

const gotogetherRoutes = [
  {
    path: '/home',
    name: 'Home',
    icon: 'nc-icon nc-atom',
    component: Home,
    layout: '/gotogether',
  },
  {
    path: '/together',
    name: 'Together ',
    icon: 'nc-icon nc-chat-round',
    component: Together,
    layout: '/gotogether',
  },
  {
    path: '/member',
    name: 'Member',
    icon: 'nc-icon nc-circle-09',
    component: Member,
    layout: '/gotogether',
  },
  {
    path: '/post',
    name: 'Post',
    icon: 'nc-icon nc-notes',
    component: Post,
    layout: '/gotogether',
  },
  {
    path: '/memo',
    name: 'Memo',
    icon: 'nc-icon nc-email-85',
    component: Memo,
    layout: '/gotogether',
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: 'nc-icon nc-single-02',
    component: Profile,
    layout: '/gotogether',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'nc-icon nc-single-02',
    component: Login,
    layout: '/gotogether',
    invisible: true,
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'nc-icon nc-single-02',
    component: Register,
    layout: '/gotogether',
    invisible: true,
  },
  {
    path: '/togetheredit',
    name: 'TogetherEdit ',
    icon: 'nc-icon nc-chat-round',
    component: Togetheredit,
    layout: '/gotogether',
    invisible: true,
  },
  {
    path: '/togetherdetail',
    name: 'TogetherDetail',
    icon: 'nc-icon nc-chat-round',
    component: Togetherdetail,
    layout: '/gotogether',
    invisible: true,
  },
  {
    path: '/postedit',
    name: 'Postedit',
    icon: 'nc-icon nc-notes',
    component: Postedit,
    layout: '/gotogether',
    invisible: true,
  },
  {
    path: '/postdetail',
    name: 'Postdetail',
    icon: 'nc-icon nc-notes',
    component: Postdetail,
    layout: '/gotogether',
    invisible: true,
  },
];

export default gotogetherRoutes;
