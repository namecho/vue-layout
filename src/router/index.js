import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/views/layout"),
    redirect: "/project-manage",
    children: [
      {
        path: "/project-manage",
        name: "projectManage",
        component: () => import("@/components/Inherit"),
        redirect: "/project-manage/project-list",
        children: [
          {
            path: "/project-manage/project-list",
            name: "projectList",
            component: () => import("@/views/projectManage/projectList")
          },
          {
            path: "/project-manage/template-manage",
            name: "templateManage",
            component: () => import("@/views/projectManage/templateManage")
          }
        ]
      },
      {
        path: "/data-manage",
        name: "dataManage",
        component: () => import("@/components/Inherit"),
        redirect: "/data-manage/data-source-manage",
        children: [
          {
            path: "/data-manage/data-source-manage",
            name: "dataSourceManage",
            component: () => import("@/views/dataManage/dataSourceManage")
          }
        ]
      }
    ]
  },
  {
    path: "/canvas/:id",
    name: "Canvas",
    component: () => import("@/views/canvas")
  }
];

const router = new VueRouter({
  routes
});

export default router;
