import { asyncRoutes, constantRoutes } from '@/router'
import { getMenus } from '@/api/user'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles, menus, prePath) {
  const res = {
    isAdd: false,
    router: []
  }
  routes.forEach(route => {
    const tmp = { ...route }
    // 判断是否有该菜单的角色
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        // 查询是否有子路由对呀的菜单
        const newRes = filterAsyncRoutes(tmp.children, roles, menus, prePath + tmp.path + '/')
        tmp.children = newRes.router
        res.isAdd = newRes.isAdd
      }
      // 循环查询是否包含对应的路由
      for (let index = 0; index < menus.length; index++) {
        const menu = menus[index]
        if (menu.path === prePath + tmp.path) {
          res.isAdd = true
          res.router.push(tmp)
        }
        if (index === menus.length - 1 && !res.isAdd) {
          res.isAdd = false
        }
      }
      if (res.isAdd && tmp.children !== undefined) {
        res.router.push(tmp)
      }
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, { rolesIds, roles }) {
    return new Promise(resolve => {
      getMenus(rolesIds).then(response => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles, response.data, '').router
          console.log(accessedRoutes)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }
      )
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
