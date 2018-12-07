import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueJsonPretty from 'vue-json-pretty'

import { Button, Row, Col, Icon, Card, Table, Menu, MenuItem, Modal, Header, Layout, Sider, DatePicker, Input, Spin, Checkbox, CheckboxGroup, Poptip, Collapse, Panel, Form, FormItem } from 'iview'
Vue.component('Button', Button)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Icon', Icon)
Vue.component('Card', Card)
Vue.component('Table', Table)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Modal', Modal)
Vue.component('Header', Header)
Vue.component('Layout', Layout)
Vue.component('Sider', Sider)
Vue.component('DatePicker', DatePicker)
Vue.component('Input', Input)
Vue.component('Spin', Spin)
Vue.component('Checkbox', Checkbox)
Vue.component('CheckboxGroup', CheckboxGroup)
Vue.component('Poptip', Poptip)
Vue.component('Collapse', Collapse)
Vue.component('Panel', Panel)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('VueJsonPretty', VueJsonPretty)

const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

// Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

