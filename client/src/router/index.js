import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Detail from '@/components/Detail'
import MyQuest from '@/components/MyQuest'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/home/read/:slug',
      name: 'Detail',
      component: Detail,
      props: true
    },
    {
      path: '/home/my-questions',
      name: 'My Quest',
      component: MyQuest
    }
  ]
})
