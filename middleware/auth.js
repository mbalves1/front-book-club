export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserStore()
  const auth = user.authenticated
  if (!auth) {
    return navigateTo('/')
  }
})
