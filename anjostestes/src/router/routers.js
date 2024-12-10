const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/inserir-dados' },
      { path: 'inserir-dados', component: () => import('pages/InsertData.vue') },
      { path: 'configuracoes', component: () => import('pages/ConfigPage.vue') } // Adicione mais páginas conforme necessário
    ]
  }
]

export default routes
