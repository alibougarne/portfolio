import { RouteConfig } from 'vue-router';
import MyLayout from 'layouts/myLayout/MyLayout.vue';
import Home from 'pages/home/Index.vue';
import Tags from 'pages/tags/list/Index.vue';
import CreateTag from 'pages/tags/create/Index.vue';
import Projects from 'pages/projects/Index.vue';

const routes: RouteConfig[] = [
  {
    path: '',
    component: MyLayout,
    children: [
      { name: 'Home', path: '/', component: Home },
      { name: 'Projects', path: '/projects', component: Home },
      {
        name: 'Tags',
        path: '/tags',
        component: Tags
      },
      {
        name: 'CreateTag',
        path: '/tags/create',
        component: CreateTag
      },
      {
        name: 'ProjectsPerTag',
        path: '/tags/:id',
        component: Projects
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
