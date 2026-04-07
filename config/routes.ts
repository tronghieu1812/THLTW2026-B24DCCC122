export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
    ],
  },

  ///////////////////////////////////
  // DEFAULT MENU

  {
    path: '/dashboard',
    name: 'Trang chủ',
    component: './TrangChu',
    icon: 'HomeOutlined',
  },

  {
    path: '/random-user',
    name: 'RandomUser',
    component: './RandomUser',
    icon: 'ArrowsAltOutlined',
  },

  {
    path: '/todo-list',
    name: 'TodoList',
    icon: 'OrderedListOutlined',
    component: './TodoList',
  },

  ///////////////////////////////////
  // ===== BÀI TẬP =====

  {
    path: '/bai-th06',
    name: 'Bài TH06',
    icon: 'BookOutlined',
    component: './BaiTH06',
  },

 

  ///////////////////////////////////
  // ===== NOTIFICATION =====

  {
    path: '/notification',
    layout: false,
    hideInMenu: true,
    routes: [
      {
        path: '/notification/subscribe',
        exact: true,
        component: './ThongBao/Subscribe',
      },
      {
        path: '/notification/check',
        exact: true,
        component: './ThongBao/Check',
      },
      {
        path: '/notification',
        exact: true,
        component: './ThongBao/NotifOneSignal',
      },
    ],
  },

  ///////////////////////////////////
  // ===== EXCEPTION =====

  {
    path: '/403',
    component: './exception/403/403Page',
    layout: false,
  },

  {
    path: '/hold-on',
    component: './exception/DangCapNhat',
    layout: false,
  },

  {
    component: './exception/404',
  },
];