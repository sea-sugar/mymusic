<template>
  <el-main>
    <!-- 音乐馆 -->
    <div class="header">
      <el-menu
        ellipsis
        class="el-menu-popper-demo"
        mode="horizontal"
        :popper-offset="16"
        style="width: 80%"
        router
      >
        <el-menu-item index="picked">精选</el-menu-item>
        <el-menu-item index="toplist">排行</el-menu-item>
        <el-menu-item index="artist">歌手</el-menu-item>
        <el-menu-item index="category">分类歌单</el-menu-item>
      </el-menu>
    </div>
    <el-main class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      
    </el-main>

  </el-main>
</template>

<script setup>


</script>

<style scoped>
.header {
  width: 100%;
  height: auto;
  display: flex;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.header-item {
  width: 160px;
  position: relative;
  justify-items: center;
}

.active-link::before {
  content: '';
  height: 4px;
  background: black;
  display: inline-block;
  position: absolute;
  bottom: -6px;
  width: 100%;
  transition: width 0.36s;
}

a {
  font-size: 20px;
  text-decoration: none;
  color: inherit;
}
</style>