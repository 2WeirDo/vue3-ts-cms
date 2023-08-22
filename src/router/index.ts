import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
      // 后面会有导航守卫进行判断 : 判断用户是否登录
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      // 这里要加name, 后面才能用addRoute
      name: 'main',
      component: () => import('../views/main/main.vue')

      // 动态路由: 根据用户的权限信息, 动态的添加路由 ,有两种方式 :
      // 1. 基于角色的动态路由管理 2. 基于菜单的动态路由管理 (第二种用得较多)
      // 我们要实现动态路由, 而不是像下面一样一次性全部注册
      // 我们将每个路由放置在一个文件夹内, 是为了方便搞一个自动化工具

      // children: [
      //   {
      //     path: '/main/analysis/overview',
      //     component: () => import('../views/main/analysis/overview/overview.vue')
      //   },
      //   {
      //     path: '/main/analysis/dashboard',
      //     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
      //   },
      //   {
      //     path: '/main/system/user',
      //     component: () => import('../views/main/system/user/user.vue')
      //   },
      //   {
      //     path: '/main/system/role',
      //     component: () => import('../views/main/system/role/role.vue')
      //   }
      // ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})

// 导航守卫
// to:跳转到的位置
// from:从哪里跳转
// 返回值 : 决定导航的路径
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    // 只有登录成功才可以进入到/main
    return '/login'
  }
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
