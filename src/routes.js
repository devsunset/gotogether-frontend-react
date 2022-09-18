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

const routes = [
  {
    path: '/',
    name: 'Home',
    icon: 'nc-icon nc-atom',
    component: Home,
    layout: '/',
  },
  {
    path: 'together',
    name: 'Together ',
    icon: 'nc-icon nc-chat-round',
    component: Together,
    layout: '/',
  },
  {
    path: 'member',
    name: 'Member',
    icon: 'nc-icon nc-circle-09',
    component: Member,
    layout: '/',
  },
  {
    path: 'post',
    name: 'Post',
    icon: 'nc-icon nc-notes',
    component: Post,
    layout: '/',
  },
  {
    path: 'memo',
    name: 'Memo',
    icon: 'nc-icon nc-email-85',
    component: Memo,
    layout: '/',
  },
  {
    path: 'profile',
    name: 'Profile',
    icon: 'nc-icon nc-single-02',
    component: Profile,
    layout: '/',
  },
  {
    path: 'login',
    name: 'Login',
    icon: 'nc-icon nc-single-02',
    component: Login,
    layout: '/',
    invisible: true,
  },
  {
    path: 'register',
    name: 'Register',
    icon: 'nc-icon nc-single-02',
    component: Register,
    layout: '/',
    invisible: true,
  },
  {
    path: 'togetheredit',
    name: 'TogetherEdit ',
    icon: 'nc-icon nc-chat-round',
    component: Togetheredit,
    layout: '/',
    invisible: true,
  },
  {
    path: 'togetherdetail',
    name: 'TogetherDetail',
    icon: 'nc-icon nc-chat-round',
    component: Togetherdetail,
    layout: '/',
    invisible: true,
  },
  {
    path: 'postedit',
    name: 'Postedit',
    icon: 'nc-icon nc-notes',
    component: Postedit,
    layout: '/',
    invisible: true,
  },
  {
    path: 'postdetail',
    name: 'Postdetail',
    icon: 'nc-icon nc-notes',
    component: Postdetail,
    layout: '/',
    invisible: true,
  },
];

export default routes;
