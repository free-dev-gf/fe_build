// remind 需要用vscode在项目根目录打开这个项目，否则有些ts报错不好解决
import Vue from "vue";
import router from "./router";
import store from "./store";
import App from './app.vue';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
