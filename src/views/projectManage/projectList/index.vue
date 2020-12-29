<template>
  <div class="project-list">
    <div class="header">
      <a-button @click="addProject" type="primary" icon="plus"
        >创建项目</a-button
      >
    </div>
    <ul class="list">
      <li class="item" v-for="item in projectList" :key="item.id">
        <div class="preview">
          <a-icon class="icon" type="edit" />
        </div>
        <div class="handle">
          <div class="title">{{ item.name }}</div>
          <div class="tools">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span :style="{ fontSize: '12px' }">预览</span>
              </template>
              <a-icon class="icon" type="eye" />
            </a-tooltip>

            <a-popconfirm
              title="是否删除此项目？"
              ok-text="是"
              cancel-text="否"
              @confirm="deleteProject(item.id)"
            >
              <a-icon
                slot="icon"
                type="question-circle-o"
                :style="{ color: 'red' }"
              />
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span :style="{ fontSize: '12px' }">删除</span>
                </template>
                <a-icon class="icon" type="delete" />
              </a-tooltip>
            </a-popconfirm>
          </div>
        </div>
      </li>
    </ul>
    <a-modal
      :title="modal.title"
      :visible="modal.visible"
      :width="modal.width"
      :footer="null"
    >
      <component :is="modal.component"></component>
    </a-modal>
  </div>
</template>

<script>
import addProject from "./components/addProject";
export default {
  components: { addProject },
  data() {
    return {
      modal: {
        title: "",
        visible: false,
        width: 1000,
        component: ""
      }
    };
  },
  computed: {
    projectList() {
      return [
        { id: 1, name: "项目一" },
        { id: 2, name: "项目二" }
      ];
    }
  },
  methods: {
    addProject() {
      this.modal.title = "创建项目";
      this.modal.width = 500;
      this.modal.component = "addProject";
      this.modal.visible = true;
    },
    deleteProject(id) {
      console.log(id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
