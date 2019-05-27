import Cookies from 'js-cookie'

export default ({ app, $axios }) => {
  app.router.beforeEach((to, from, next) => {
    next()
  })
}