import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    templates: [
      {
        type: "border",
        name: "边框",
        icon: "border",
        components: [
          { name: "边框一", templateName: "dv-border-box-1" },
          { name: "边框二", templateName: "dv-border-box-2" },
          { name: "边框三", templateName: "dv-border-box-3" },
          { name: "边框四", templateName: "dv-border-box-4" },
          { name: "边框五", templateName: "dv-border-box-5" },
          { name: "边框六", templateName: "dv-border-box-6" },
          { name: "边框七", templateName: "dv-border-box-7" },
          { name: "边框八", templateName: "dv-border-box-8" },
          { name: "边框九", templateName: "dv-border-box-9" },
          { name: "边框十", templateName: "dv-border-box-10" },
          { name: "边框十一", templateName: "dv-border-box-11" },
          { name: "边框十二", templateName: "dv-border-box-12" },
          { name: "边框十三", templateName: "dv-border-box-13" }
        ]
      },
      { type: "star", name: "装饰", icon: "border-outer", components: [] }
    ],
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
