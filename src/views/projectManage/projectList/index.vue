<template>
  <div class="project-list">
    <div class="header">
      <a-button @click="addProject" type="primary" icon="plus"
        >创建项目</a-button
      >
    </div>
    <ul class="list">
      <li class="item" v-for="item in projectList" :key="item.id">
        <div class="preview" @click="openCanvas(item.id)">
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
      :visible.sync="modal.visible"
      :width="modal.width"
      destroyOnClose
      okText="确定"
      cancelText="取消"
      @cancel="modalCancel"
      @ok="modalOk"
      :confirm-loading="modal.confirmLoading"
    >
      <component ref="modalComponent" :is="modal.component"></component>
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
        component: "",
        confirmLoading: false
      },
      projectList: []
    };
  },
  created() {
    this.getProject();
  },
  methods: {
    addProject() {
      this.modal.title = "创建项目";
      this.modal.width = 500;
      this.modal.component = "addProject";
      this.modal.visible = true;
    },
    getProject() {
      this.projectList = this.$local.get("project-list") || [];
    },
    deleteProject(id) {
      this.projectList.splice(
        this.projectList.findIndex(obj => obj.id === id),
        1
      );
      this.$local.set("project-list", this.projectList);
    },
    modalCancel() {
      this.modal.visible = false;
    },
    async modalOk() {
      this.modal.confirmLoading = true;
      try {
        await this.$refs.modalComponent.save();
        this.getProject();
        this.modal.visible = false;
      } catch (error) {
        this.modal.confirmLoading = false;
      } finally {
        this.modal.confirmLoading = false;
      }
    },
    openCanvas(id) {
      this.$router.push({ path: "/canvas/" + id });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
