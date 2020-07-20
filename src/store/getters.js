const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  customerInfo: state => state.user.customerInfo,
  tokenType: state => state.user.token_type,
  token: state => state.user.access_token,
  accessToken: state => state.user.token_type + state.user.access_token,
  avatar: state => state.user.customerInfo.avatar,
  name: state => state.user.customerInfo.name,
  introduction: state => state.user.customerInfo.introduction,
  roles: state => state.user.roles,
  rolesIds: state => state.user.rolesIds,
  permission_routes: state => state.permission.routes,
  permission_routes_add_routes: state => state.permission.addRoutes,
  errorLogs: state => state.errorLog.logs
}
export default getters
