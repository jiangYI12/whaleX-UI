import { login, logout, getUserById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  access_token: getToken(),
  refresh_token: '',
  token_type: 'bearer',
  customerInfo: {
    account: '',
    avatar: '',
    id: '',
    expires_in: '',
    phone: '',
    scope: '',
    username: ''
  },
  roles: [],
  rolesIds: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.access_token = token
  },
  SET_USER: (state, user) => {
    state.customerInfo = user
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROLE_IDS: (state, roleIds) => {
    state.rolesIds = roleIds
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('username', username.trim())
      formData.append('password', password)
      formData.append('grant_type', 'password')
      login(formData).then(response => {
        const data = response
        commit('SET_TOKEN', data.access_token)
        commit('SET_USER', data)
        commit('SET_ROLES', [...data.roles])
        commit('SET_ROLE_IDS', [...data.rolesIds])
        setToken(data.token_type + ' ' + data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  reloadUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserById().then(response => {
        const data = response
        commit('SET_USER', data)
        commit('SET_ROLES', [...data.roles])
        commit('SET_ROLE_IDS', [...data.rolesIds])
        setToken(data.token_type + ' ' + data.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
