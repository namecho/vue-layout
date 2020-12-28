import Vue from "vue";
import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/common.scss";

Vue.config.productionTip = false;

Vue.use(antd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
