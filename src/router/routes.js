const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/Index.vue'),
      },
    ],
  },
  {
    path: '/reservas',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: '/',
      },
      {
        path: 'criar',
        name: 'reservations-create',
        component: () => import('pages/reservations/Create.vue'),
      },
      {
        path: 'configuracoes',
        name: 'reservations-configurations',
        component: () => import('pages/reservations/Configurations.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
