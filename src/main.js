import Vue from 'vue'
import App from './App.vue'
import router from './router'

//导入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//使用axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
//设置全局访问路径
axios.defaults.baseURL= 'http://localhost:8888/employment'
//访问携带cookie
axios.defaults.withCredentials = true



new Vue({
  router,
  render: h => h(App),
  created() {
    if(!sessionStorage.getItem('showAttention')){
      sessionStorage.setItem("showAttention",JSON.stringify(true))
    }
    
    
  },
}).$mount('#app')
