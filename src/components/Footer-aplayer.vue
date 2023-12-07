<template>
  <div class="player-container">
    <meting-js
      :key="id"
      :server="server"
      :type="type"
      :id="id"
      :autoplay="autoplay"
      v-loading="loading"
      :element-loading-text="'Loading...'">
    </meting-js>

    <div class="button-container" v-if="!loading">
      <el-icon size="24" color="grey" @click="playPrevious"><CaretLeft /></el-icon>
      <el-icon size="24" color="grey" @click="playNext"><CaretRight /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useplayListInfoStore } from '../store/index';
const playListInfoStore = useplayListInfoStore();

const server = ref('netease'); // 音乐服务器
const type = ref('song'); // 音乐类型
const id = ref('2097826775'); // 音乐ID
const autoplay = ref(true); // 是否自动播放
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
const play = () =>{
  console.log("666666666666");
}
// 上一首
const playPrevious = () => {
  // 执行上一首的逻辑
  const temp = playListInfoStore.currentMusicId;
  if(playListInfoStore.historyList[0]){//如果历史列表有音乐就播放上一首
    playListInfoStore.currentMusicId=playListInfoStore.historyList[0];
    playListInfoStore.addplayListfront(temp);
    playListInfoStore.delhistoryList();
    //1 2 3 4 5 6 7 8 9
    //history 
    //play 2 3 4 5 6 7 8 9
    //1
    
    //history 1
    //play 3 4 5 6 7 8 9
    //2

    //history 2 1
    //play 4 5 6 7 8 9
    //3

  }
  else{
    console.log("当前历史列表无音乐");
  }
  console.log("上一首");
};

// 下一首
const playNext = () => {
  // 执行下一首的逻辑
  const temp = playListInfoStore.currentMusicId;
  if(playListInfoStore.playList[0]){//如果播放列表有音乐就播放下一首
    playListInfoStore.currentMusicId=playListInfoStore.playList[0];
    playListInfoStore.addhistoryList(temp);
    playListInfoStore.delplayList();
  }
  else{
    console.log("当前播放列表无音乐");
  }
  console.log("下一首");
};
</script>

<style>
.player-container {
  position: relative;
  height: 100px;
  width: 100%;
}

.button-container {
  position: absolute;
  top: 25%;
  right: 0;
  left: 8%;
  transform: translateY(-50%);
  display: flex;
  justify-content:space-evenly;
}
.el-icon :hover{
  color:black;
  cursor: pointer;
}

</style>