
<template>
    <div>
      <el-main>  
         <!--推荐  -->
        <Banner/>
        <!-- 推荐歌单 -->
        <Personalized/>
        <!-- 推荐新音乐  -->
        <Newsong/>
        <!-- 推荐MV  -->
        <MV/>
      </el-main>
    </div>
  </template>

<script setup>
import Banner from './Banner.vue';
import Personalized from './Personalized.vue';
import Newsong from './Newsong.vue';
import MV from './MV.vue';

</script>
