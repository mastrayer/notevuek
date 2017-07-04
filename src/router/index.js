import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'

Vue.use(Router)

export default new Router({
  mode: 'history', /* vue-router의 history mode를 선택해 브라우저의 history 객체를 이용하여 route합니다 */
  routes: [
    {
      path: '/:key?', /* 'key'라는 이름으로 파라미터를 받습니다. key는 존재할 수도, 존재하지 않을 수도 있습니다 */
      name: 'App',
      component: App,
    }
  ]
})
