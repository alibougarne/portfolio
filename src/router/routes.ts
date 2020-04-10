import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '',
    component: () => import('layouts/portfolio/MyLayout.vue'),
    children: [
      { name: 'Home', path: '/', component: () => import('pages/home/Home.vue') },
      { name: 'Projects', path: '/projects', component: () => import('pages/home/Home.vue') },
      {
        name: 'Tags',
        path: '/tags',
        component: () => import('pages/tags/list/Tags.vue'),
      },
      {
        name: 'CreateTag',
        path: '/tags/create',
        component: () => import('pages/admin/tags/create/CreateTag.vue'),
      },
      {
        name: 'ProjectsPerTag',
        path: '/tags/:id',
        component: () => import('pages/projects/Projects.vue'),
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/admin/adminLayout.vue'),
    children: [
      { name: 'login', path: '/', component: () => import('pages/admin/login/Login.vue') },
      { name: 'adminHome', path: 'home', component: () => import('pages/home/Home.vue') },
      { name: 'adminTags', path: 'tags', component: () => import('pages/admin/tags/list/tagsList.vue') },
      { name: 'adminProjects', path: 'projects', component: () => import('pages/admin/projects/list/projectsList.vue') },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
