import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/Router'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import {
  Button,
  Select,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Input,
  Message,
  Dialog,
  MessageBox
} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Dialog)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
})