import Vue from "vue";
import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import storejs from "storejs";
import dataV from "@jiaminghi/data-view";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/common.scss";

Vue.config.productionTip = false;

Vue.use(antd);
Vue.use(dataV);

Vue.prototype.$local = storejs;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
