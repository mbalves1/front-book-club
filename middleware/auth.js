export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) { // Check for client-side execution
    const token = localStorage.getItem('token');
    if (!token) {
      return navigateTo('/');
    }
  }
})
