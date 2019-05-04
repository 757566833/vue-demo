<template>
    <div>
        <h1>这是login组件，使用.vue文件定义出来的</h1>
    </div>
</template>
 
<script>
    // export default 是 es6 模块中向外暴露成员的语法，只能使用一次，接收时的变量名可以自定义
    // 也可以用 export 暴露成员，不过接收时要用 {变量名(必须与导出时的变量名一致)} 接收，可以使用多次，按需导出，需要哪个变量就接收哪个变量
    export default {
        name: "login"
    }
</script>
 
<style scoped lang="less">
// <!--这里 scoped 表示作用域，也就是说样式只作用于当前组件及其子组件，如果不加就会作用于所有组件-->
// <!--lang 表示当前使用的 样式语言类型 有 less scss css-->
</style>