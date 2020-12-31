<template>
  <div class="canvas">
    <div class="header-tools">
      <div class="left">
        <a-popconfirm
          title="是否确认退出？退出会清除未保存信息！"
          ok-text="是"
          cancel-text="否"
          @confirm="exit"
          placement="bottomRight"
        >
          <a-tooltip placement="bottomLeft">
            <template slot="title">
              <span>返回</span>
            </template>
            <a-icon class="icon" type="arrow-left" />
          </a-tooltip>
        </a-popconfirm>
      </div>
      <div class="center">
        <div>{{ projectInfo.name }}</div>
      </div>
      <div class="right">
        <a-tooltip placement="bottomRight">
          <template slot="title">
            <span>预览</span>
          </template>
          <a-icon class="icon" type="eye" />
        </a-tooltip>
        <a-tooltip placement="bottomRight">
          <template slot="title">
            <span>保存</span>
          </template>
          <a-icon @click="save" class="icon" type="save" />
        </a-tooltip>
      </div>
    </div>
    <div class="body">
      <div class="layer">
        <div class="header">
          <span>图层</span>
        </div>
        <ul class="list">
          <li
            v-for="item in projectComponentsConfig.components"
            :key="item.id"
            class="item"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="components">
        <div class="header">
          <span>组件</span>
        </div>
        <div class="components-wrap">
          <ul class="type">
            <a-tooltip
              placement="right"
              v-for="item in templates"
              :key="item.type"
            >
              <template slot="title">
                <span>{{ item.name }}</span>
              </template>
              <li
                class="item"
                :class="{ active: item.type === currentTemplate }"
                @click="templateChange(item.type)"
              >
                <a-icon :type="item.icon" />
              </li>
            </a-tooltip>
          </ul>
          <ul class="list">
            <a-popover
              placement="rightTop"
              v-for="item in components"
              :key="item.templateName"
            >
              <template slot="content">
                <div
                  :style="{
                    width: '500px',
                    height: '300px',
                    background: '#000'
                  }"
                >
                  <component
                    title="dv-border-box-11"
                    :is="item.templateName"
                  ></component>
                </div>
              </template>
              <li
                class="item"
                draggable="true"
                @dragstart="componentDragStart($event, item)"
              >
                {{ item.name }}
              </li>
            </a-popover>
          </ul>
        </div>
      </div>
      <div class="window">
        <div class="header">
          <span>图层</span>
        </div>
        <div class="wrap">
          <div
            class="canvas"
            @dragover.prevent
            @drop="componentDrop"
            :style="{
              width: projectInfo.options.width + 'px',
              height: projectInfo.options.height + 'px',
              background: projectInfo.options.background
            }"
          >
            <component
              v-for="item in projectComponentsConfig.components"
              :key="item.id"
              :is="item.templateName"
            />
          </div>
        </div>
      </div>
      <div class="option">
        <div class="header">
          <span>组件配置</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  data() {
    return {
      // 当前模板类型
      currentTemplate: "",
      // 模板中的组件
      components: [],
      // 项目配置信息
      projectComponentsConfig: {},
      visible: false
    };
  },
  computed: {
    // 项目信息
    projectInfo() {
      return this.$local
        .get("project-list")
        .find(obj => obj.id === this.$route.params.id);
    },
    // 模板
    templates() {
      return this.$store.state.templates;
    }
  },
  created() {
    // 首次进入默认选择边框模板类型
    this.templateChange("border");
    // 获取项目配置信息
    this.getProjectComponentsConfig();
  },
  methods: {
    // 获取项目配置信息
    getProjectComponentsConfig() {
      this.projectComponentsConfig = (
        this.$local.get("project-components-config") || []
      ).find(obj => obj.id === this.$route.params.id) || {
        id: this.$route.params.id,
        components: []
      };
    },
    // 退出
    exit() {
      this.$router.push({ path: "/project-manage/project-list" });
    },
    // 开始拖动组件到画布
    componentDragStart(e, data) {
      e.dataTransfer.setData("data", JSON.stringify(data));
    },
    // 拖动组件到画布完成
    componentDrop(e) {
      let data = JSON.parse(e.dataTransfer.getData("data"));
      this.projectComponentsConfig.components.push({
        id: nanoid(),
        name: data.name + "-" + nanoid(5),
        templateName: data.templateName
      });
    },
    // 当前模板切换
    templateChange(type) {
      this.currentTemplate = type;
      // 提取模板中的组件
      this.components = this.templates.find(
        obj => obj.type === type
      ).components;
    },
    // 项目保存
    save() {
      // 获取全局项目配置
      let globalProjectComponentsConfig =
        this.$local.get("project-components-config") || [];
      // 判断全局项目配置里面是否有当前项目配置
      if (
        globalProjectComponentsConfig.find(
          obj => obj.id === this.$route.params.id
        )
      ) {
        // 有就更改全局配置
        globalProjectComponentsConfig = globalProjectComponentsConfig.map(obj =>
          obj.id === this.$route.params.id ? this.projectComponentsConfig : obj
        );
      } else {
        // 没有就新增全局配置
        globalProjectComponentsConfig.push(this.projectComponentsConfig);
      }
      this.$local.set(
        "project-components-config",
        globalProjectComponentsConfig
      );
      this.$message.success("保存成功");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
