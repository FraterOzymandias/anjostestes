import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/inserir-dados' },
      { path: 'inserir-dados', component: () => import('pages/InsertData.vue') },
      { path: 'configuracoes', component: () => import('pages/ConfigPage.vue') } // Adicione outras páginas conforme necessário
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
