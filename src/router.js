import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index'
import Layout from './views/Layout'

import Log from './components/Log'
import Config from './components/Config'
import Account from './components/Account'
import About from './components/About'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Index
  }, {
    path: '/layout',
    component: Layout,
    children: [{
      path: 'log',
      component: Log
    }, {
      path: 'config',
      component: Config
    }, {
      path: 'account',
      component: Account
    }, {
      path: 'about',
      component: About
    }]
  }]
})
