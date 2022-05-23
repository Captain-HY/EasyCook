import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
Vue.use(Vuex)
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)
import {
  Button,
  Icon,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  NavBar,
  Search,
  Swipe,
  SwipeItem,
  Skeleton,
  Sidebar,
  SidebarItem,
  PullRefresh,
  Grid,
  GridItem,
  Toast,
  ActionSheet,
  Image as VanImage,
  Lazyload,
  ImagePreview,
  List,
  Form,
  Field,
  Popup

} from 'vant';

import 'lib-flexible/flexible'

Vue.config.productionTip = false
Vue.use(Button)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(NavBar)
  .use(Icon)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(Skeleton)
  .use(Sidebar)
  .use(SidebarItem)
  .use(PullRefresh)
  .use(Toast)
  .use(ActionSheet)
  .use(VanImage)
  .use(Lazyload)
  .use(Grid)
  .use(GridItem)
  .use(ImagePreview)
  .use(List)
  .use(Form)
  .use(Field)
  .use(Popup);

axios.defaults.baseURL = 'https://apis.netstart.cn/douguo'




axios.interceptors.request.use(config => {
  // console.log('发起请求之前执行')
  const whileList = ['/home/focus', '/home/note', '/user/:id'];
  if (!whileList.includes(config.url)) {
    Toast.loading({
      message: '加载中···',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0
    })
  }



  return config;
}, err => {
  console.log(err)

  Toast.clear();
  return Promise.reject(err)
})
axios.interceptors.response.use(res => {
  Toast.clear();
  return res;
}, err => {
  console.log('err=>', err)
  Toast.clear()
  return Project.reject(err);
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')