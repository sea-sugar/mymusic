<template>
  <div>
    <meting-js
      :key="id"
      :server="server"
      :type="type"
      :id="id"
      :autoplay="autoplay"
      v-loading="loading"
      :element-loading-text="'Loading...'">
    </meting-js>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useplayListInfoStore } from '../store/index';
const playListInfoStore = useplayListInfoStore();

const server = ref('netease'); // 音乐服务器
const type = ref('song'); // 音乐类型
const id = ref('2097826775'); // 音乐ID
const autoplay = ref(false); // 是否自动播放
const loading = ref(false); // 加载状态

// 监听 currentMusicId 的变化
watch(() => playListInfoStore.getCurrentMusicId, (newId, oldId) => {
  loading.value = true; // 设置加载状态为 true
  id.value = newId;
  console.log(playListInfoStore.currentMusicId);
  setTimeout(() => {
    loading.value = false; // 设置加载状态为 false
  }, 1000);
  
});

// 两种监听方法，上面的用store里面的getter，下面定义一个函数获取，也想当与getter？
// 创建一个 getter 函数
//const getCurrentMusicId = () => playListInfoStore.currentMusicId;
// watch(getCurrentMusicId, (newId, oldId) => {
//   // 更新 id 为新的音乐 ID
//   id.value = newId;
//   console.log(playListInfoStore.currentMusicId);
// });
</script>