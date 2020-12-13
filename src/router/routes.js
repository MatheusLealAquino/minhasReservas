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
        path: ':id',
        name: 'reservations-reservation',
        component: () => import('pages/reservations/Reservation.vue'),
      },
      {
        path: ':id/operar',
        name: 'reservations-operation',
        component: () => import('pages/reservations/Operation.vue'),
      },
      {
        path: ':id/configuracoes',
        name: 'reservations-configuration',
        component: () => import('pages/reservations/Configuration.vue'),
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
