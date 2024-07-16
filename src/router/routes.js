const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'processos', component: () => import('pages/ProcessosPage.vue') },
      { path: 'clientes', component: () => import('pages/ClientesPage.vue') },
      { path: 'contratos', component: () => import('pages/ContratosPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
