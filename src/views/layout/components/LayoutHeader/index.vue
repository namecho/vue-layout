<template>
  <div class="layout-header">
    <h1 class="title">NAMECHO 可视化开发工具</h1>
    <ul class="header-menu">
      <li
        v-for="item in menuList"
        :key="item.id"
        class="menu-item"
        :class="{ active: item.path === activeMenuPath }"
        @click="menuJump(item.path)"
      >
        <a-icon :type="item.icon" />
        <span class="menu-text">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    menuList() {
      return this.$store.state.menuList;
    },
    activeMenuPath() {
      let path = this.$route.matched[1].path;
      this.$emit("headerMenuChange", path);
      return path;
    }
  },
  methods: {
    menuJump(path) {
      if (path !== this.activeMenuPath) {
        this.$router.push({ path });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
