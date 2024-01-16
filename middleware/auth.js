export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useUserStore()
  const auth = user.authenticated
  const token = localStorage.getItem('token')
  if (!token) {
    return navigateTo('/')
  }
})
