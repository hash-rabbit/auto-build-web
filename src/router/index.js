import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/project/list',
      name: 'project-list',
      component: () => import('../views/ProjectList.vue')
    },
    {
      path: '/task/list',
      name: 'task-list',
      component: () => import('../views/TaskList.vue')
    },
    {
      path: '/task/log/list',
      name: 'task-log-list',
      component: () => import('../views/TaskLogList.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutMe.vue')
    }
  ]
})

export default router
