<template>
  <div class="layout-sider">
    <div class="logo"></div>
    <ul class="sider-menu">
      <li
        v-for="item in menuData"
        :key="item.id"
        class="menu-item"
        :class="{ active: item.path === activeMenuPath }"
        @click="menuJump(item.path)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["menuData"],
  computed: {
    activeMenuPath() {
      return this.$route.path;
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
