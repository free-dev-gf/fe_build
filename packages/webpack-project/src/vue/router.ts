import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import Home from "./home.vue";
import Mine from "./mine.vue";

Vue.use(Router);

export const constantRoutes: RouteConfig[] = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/mine",
    component: Mine,
  }
];

const createRouter = () =>
  new Router({
    routes: constantRoutes
  });

const router = createRouter();

export default router;