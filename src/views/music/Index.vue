<template>
  <el-main>
    <!-- 音乐馆 -->
    <div class="header">
      <div
        class="header-item "
        v-for="item in Headerlist"
        :key="item.title"
      >
      <el-check-tag :checked="$route.path === item.url" ><router-link :to="item.url" >{{ item.title }}</router-link></el-check-tag>
        
      </div>
    </div>
    <el-main class="container">
      <router-view></router-view>
    </el-main>
  </el-main>
</template>

<script setup>
const Headerlist = [{ title: '精选', url: '/music/picked' },{ title: '排行', url: '/music/toplist' },{ title: '歌手', url: '/music/artist' },{ title: '分类歌单', url: '/music/category' }];

</script>

<style scoped>
.header {
  width: 100%;
  height: auto;
  display: flex;
  /* background-color: aliceblue; */
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