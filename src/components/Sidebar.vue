<template>
  <div>
    <el-col :span="20">
      <h5 class="mb-2">sea_sugar_music</h5>
      <el-menu
        default-active="index"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#ebf1f5"
        text-color="#606266"
        active-text-color="#2F74FF"
        router
      >
      <!-- 是否启用 vue-router 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu-item index="/index">
          <span>推荐</span>
        </el-menu-item>

        <el-menu-item index="/music">
          <span>音乐馆</span>
        </el-menu-item>

        <el-menu-item index="/video" >
          <span>视频</span>
        </el-menu-item>

        <el-menu-item index="/dj">
          <span>电台</span>
        </el-menu-item>

        <el-menu-item index="/home">
          <span>我的音乐</span>
        </el-menu-item>

        <el-menu-item index="/3" disabled>
          <span>下载歌曲</span>
        </el-menu-item>

        <el-menu-item index="/lastplay">
          <span>最近播放</span>
        </el-menu-item>

      </el-menu>
    </el-col>
  </div>
</template>

<script setup>
import { ElAside, ElCol, ElMenu, ElMenuItem } from 'element-plus';
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
}
</script>

<style>

</style>