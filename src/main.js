import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import ApiService from "@/services/api.service";
import InfiniteLoading from "vue-infinite-loading";
import homePage from "@/components/HomePage";

import VueRouter from "vue-router";

Vue.use(VueRouter);

let routes = [
  { path: "/", name: "Home", component: homePage },
];

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false
Vue.use(InfiniteLoading)
ApiService.init();

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
