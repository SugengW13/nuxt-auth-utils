export default defineNuxtRouteMiddleware((to, _) => {
  const { loggedIn } = useUserSession()

  const protectedRoutePath = [
    '/authenticated'
  ]

  if (loggedIn.value && to.path === '/login') {
    return navigateTo('/authenticated')
  }

  if (!loggedIn.value && protectedRoutePath.includes(to.path)) {
    return navigateTo('/login')
  }
})