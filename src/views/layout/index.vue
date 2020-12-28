<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header">
      <LayoutHeader @headerMenuChange="headerMenuChange" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="layout-sider">
        <LayoutSider :menuData="subMenu" />
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import LayoutHeader from "./components/LayoutHeader";
import LayoutSider from "./components/LayoutSider";
export default {
  components: { LayoutHeader, LayoutSider },
  data() {
    return {
      subMenu: []
    };
  },
  computed: {
    menuList() {
      return this.$store.state.menuList;
    }
  },
  methods: {
    headerMenuChange(path) {
      this.subMenu = this.menuList[
        this.menuList.findIndex(obj => obj.path == path)
      ].children;
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  .layout-header {
    height: 160px;
    background-image: linear-gradient(to bottom, #09608e, #12243b);
    padding: 0;
    line-height: normal;
  }
  .layout-sider {
    background: #12243b;
  }
  .layout-content {
    background: #122f42;
    padding: 10px;
  }
}
</style>
