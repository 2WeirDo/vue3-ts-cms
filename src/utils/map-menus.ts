import type { RouteRecordRaw } from 'vue-router'
// 1.动态获取所有的路由对象, 放到数组中
function loadLocalRoutes() {
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []

  // 1.1.读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    // eager参数 : 立马把结果给我, 而不是懒加载
    eager: true
  })
  // 1.2.将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    // console.log(module)
    // module.default就是一个路由对象
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
// 把menu映射成routes
export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    // 一级路由不需要跳转, 只需要展开
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可), 也就是只添加第一个
        // 因为一级路由无法跳转, 这里就是给添加一级路由匹配到的第一个子路由, 以后每次一点击一级路由就跳转到第一个子路由
        if (!routes.find((item) => item.path === menu.url)) {
          // 这里的route就是上方item.path === submenu.url中的子菜单
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 2.将二级菜单对应的路径加到routes中国
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface IBreadcrumbs {
  name: string
  path: string
}

// 获取面包屑信息
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []

  // 2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 好在每一层只有两个, 都push然后顺序输出就行
        // 1.顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 2.匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 菜单映射到id的列表
 * @param menuList
 */

// 递归函数，用于遍历一个层次化的菜单结构，并提取叶子节点的 id 值。
// 将嵌套的菜单结构转换为一个扁平的 id 数组，以便于处理和使用这些 id 值。
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        // 有孩子先不设置
        recurseGetId(item.children)
      } else {
        // 没有子菜单才设置
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单的列表
 * @returns 权限的数组(字符串数组)
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      // 按钮的type都是等于3
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)

  return permissions
}
