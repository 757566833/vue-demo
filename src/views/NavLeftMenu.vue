
<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >
    <el-menu-item index="1">
      <i class="el-icon-location"></i>
      <span>
        <router-link to="/test1">test1</router-link>
      </span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">
        <router-link to="/test2">test2</router-link>
      </span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">
        <router-link to="/test3">test3</router-link>
      </span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">
        <router-link to="/account">account</router-link>
      </span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "NavLeftMenu",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>