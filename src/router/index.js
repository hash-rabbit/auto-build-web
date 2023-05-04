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
      path: '/goenv/list',
      name: 'goenv-list',
      component: () => import('../views/GoenvList.vue')
    },
    {
      path: '/goenv/add',
      name: 'goenv-add',
      component: () => import('../views/GoenvAdd.vue')
    },
    {
      path: '/project/list',
      name: 'project-list',
      component: () => import('../views/ProjectList.vue')
    },
    {
      path: '/project/add',
      name: 'project-add',
      component: () => import('../views/ProjectAdd.vue')
    },
    {
      path: '/task/list',
      name: 'task-list',
      component: () => import('../views/TaskList.vue')
    },
    {
      path: '/task/add',
      name: 'task-add',
      component: () => import('../views/TaskAdd.vue')
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
