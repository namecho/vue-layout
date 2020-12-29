import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuList: [
      {
        id: 1,
        name: "项目管理",
        icon: "appstore",
        path: "/project-manage",
        children: [
          { id: 1, name: "项目列表", path: "/project-manage/project-list" },
          { id: 2, name: "模板管理", path: "/project-manage/template-manage" }
        ]
      },
      {
        id: 2,
        name: "数据管理",
        icon: "database",
        path: "/data-manage",
        children: [
          {
            id: 1,
            name: "数据源管理",
            path: "/data-manage/data-source-manage"
          }
        ]
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
});
