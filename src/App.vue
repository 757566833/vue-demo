
<template>
  <div>
    <NavTopMenu/>
    <el-row class="tac">
      <el-col :span="4">
        <NavLeftMenu/>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavTopMenu from "./views/NavTopMenu.vue";
import NavLeftMenu from "./views/NavLeftMenu.vue";
export default {
  name: "app",
  components: {
    NavTopMenu,
    NavLeftMenu
  }
};
</script>