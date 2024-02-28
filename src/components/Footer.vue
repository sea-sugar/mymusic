<template>
    <div class="container" part="container">
      <div class="label" @click="commentdrawer" >{{label}}</div>
      <div class="operate">
        <div class="operate-seq">
          <img src="/prev.svg" title="上一首" @click="prev">
          <img :src="!isPlaying ? '/play.svg' : '/pause.svg'"  :title="isPlaying ? '暂停' : '播放'" @click="toggle">
          <img src="/next.svg" title="下一首" @click="next">
        </div>
        <div class="operate-time">
          <output class="time-current">{{ formatTime(currentTime) }}</output>
          <input type="range" v-model="progress" class="time-range" min="0" step="0.001" max="1" @input="seekAudio">
          <output class="time-total">{{ formatTime(totalTime) }}</output>
        </div>
        <div class="operate-volume">
          <img :src=" isMuted ? '/muted.svg' : '/unmuted.svg'" :title="isMuted ? '取消静音' : '静音'" @click="toggleMute">
          <input class="volume-range" type="range" v-model="volume" min="0" step="0.01" max="1" @input="handleVolumeChange">
        </div>
        <img :src="cmode" :title="cmodetitle" @click="modeChange">
        <img src="/music_playlist.svg" title="播放列表" @click="drawer = true" >   
        
      </div>
      <audio ref="audioElement"  @timeupdate="updateProgress" @ended="next"  >
        <source :src="playListInfoStore.playList[currentAudioIndex]" type="audio/mp3">
      </audio>
    </div>

    <el-drawer v-model="drawer" title="播放列表" :with-header="false" stripe >
      <span>播放列表</span>
      <el-table :data="playListInfoStore.playList">
        <el-table-column property="name" label="歌名"  />
        <el-table-column property="ar[0].name" label="歌手" />
        <!-- <el-table-column property="dt" label="时长" /> -->
        <el-table-column fixed="right" label="是否移除该歌曲">
        <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.$index)"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <el-drawer v-model="drawer2" title="歌曲评论" direction="btt" :size="800">
      <div class="comment-container" >
        <span v-if="offset == 0" class="loading-text">努力加载中！！！</span>
        <div v-for="comment in currentComment" class="comment-item" >
          <el-avatar :src="comment.user.avatarUrl" alt="用户头像" class="comment-avatar"></el-avatar>
          <span class="comment-nickname">{{ comment.user.nickname }} : </span>
          <div class="comment-content">
            <span>{{ comment.content }}</span>
          </div>
          <span class="comment-location">{{ comment.timeStr }}&nbsp;&nbsp;{{ formatDate(comment.time) }}&nbsp;&nbsp;{{ comment.ipLocation.location }}</span>
        </div>
        <div class="loadMore" v-if="!isloading && offset != 0" @click="loadMore">加载更多......</div>
      </div>
    </el-drawer>


</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useplayListInfoStore } from '../store/index';
import { formatTime,formatDate} from "../utils/util";
import { getComment } from "../apis/http";
const playListInfoStore = useplayListInfoStore();
const drawer = ref(false);
const drawer2 = ref(false);
const audioElement = ref(null);
const label = ref('Sea-Sugar Player');
const currentTime = ref(0);
const totalTime = ref(0);
const progress = ref(0);
const volume = ref(0.7);
const isPlaying = ref(false);
const isMuted = ref(false);
const mode = ref(0);
const currentMusicId = ref(0);
let currentAudioIndex = 0;
let currentComment = ref([]) ;
const offset = ref(0);
const isloading = ref(false);

// 播放上一首
const prev = () => {
  if(mode.value === 0){
    currentAudioIndex = (currentAudioIndex - 1 + playListInfoStore.playList.length) % playListInfoStore.playList.length;
    playCurrentAudio();
    console.log("0 , 顺序播放 , 上一首");
  }
  else if(mode.value === 1){
    currentAudioIndex = (currentAudioIndex - 1 + playListInfoStore.playList.length) % playListInfoStore.playList.length;
    playCurrentAudio();
    console.log("1 , 随机播放 , 上一首 待完善");
  }
  else{
    playCurrentAudio();
    console.log("2 , 单曲循环 , 上一首");
  }
};

// 切换播放/暂停状态
const toggle = () => {
  if (playListInfoStore.playList.length === 0) {
    console.log("当前播放列表无音乐",playListInfoStore.playList.length);
    return ;
  }
  if (label.value === 'Sea-Sugar Player') {
    playCurrentAudio();
  }
  if (isPlaying.value) {
    pauseAudio();
    console.log("暂停");
  } else {
    playAudio();
    console.log("播放");
  }
  playListInfoStore.isPlaying = isPlaying.value;
  console.log("当前播放列表：",playListInfoStore.playList);
};

// 播放下一首
const next = () => {
  if(mode.value === 0){
    currentAudioIndex = (currentAudioIndex + 1) % playListInfoStore.playList.length;
    playCurrentAudio();
    console.log("0 , 顺序播放 , 下一首");
  }
  else if(mode.value === 1){
    currentAudioIndex = (currentAudioIndex + 1) % playListInfoStore.playList.length;
    playCurrentAudio();
    console.log("1 , 随机播放 , 下一首 待完善");
  }
  else{
    playCurrentAudio();
    console.log("2 , 单曲循环 , 下一首");
  }
  playListInfoStore.addhistoryList(playListInfoStore.playList[currentAudioIndex])
  
};

// 更新播放进度
const updateProgress = () => {
  currentTime.value = audioElement.value.currentTime;
  totalTime.value = audioElement.value.duration;
  progress.value = currentTime.value / totalTime.value;
};

// 跳转到指定播放时间
const seekAudio = () => {
  if (isPlaying.value) {
    pauseAudio();
  }
  const seekTime = progress.value * totalTime.value;
  audioElement.value.currentTime = seekTime;
  playAudio();
};

// 切换静音状态
const toggleMute = () => {
  isMuted.value = !isMuted.value;
  console.log(!isMuted.value ? '取消静音' : '静音');
  audioElement.value.muted = isMuted.value;
};

// 监听音量变化
const handleVolumeChange = () => {
  if(!parseFloat(volume.value)){
    isMuted.value = true ;
  }
  else{
    isMuted.value = false ;
  }
  audioElement.value.volume = volume.value;
  console.log("当前音量",volume.value);
  console.log(isMuted.value);
};

// 播放当前音频
const playCurrentAudio = () => {
  const audioUrl = playListInfoStore.playList[currentAudioIndex].url;
  audioElement.value.src = audioUrl;
  console.log("当前播放歌曲链接：",audioElement.value.src);
  label.value = playListInfoStore.playList[currentAudioIndex].name;
  audioElement.value.load();
  setTimeout(() => {
    playAudio();
  }, 1000);

};
// 播放音频
const playAudio = () => {
  audioElement.value.play();
  isPlaying.value = true;
};

// 暂停音频
const pauseAudio = () => {
  audioElement.value.pause();
  isPlaying.value = false;
};

watch(() => playListInfoStore.currentMusic,(isnew,isold)=>{
  if(isPlaying.value){
    toggle();
  }
  playListInfoStore.playList.splice(currentAudioIndex+1,0,isnew);
  next();
  console.log(playListInfoStore.playList);
})


const cmode = computed(()=>{
  if(mode.value === 0){//顺序播放
    return '/swap.svg'
  }
  else if(mode.value === 1){//随机播放
    return '/shuffle.svg'
  }
  else{// 2 单曲循环
    return '/repeat.svg'
  }
})

const cmodetitle = computed(()=>{
  if(mode.value === 0){
    return '顺序播放'
  }
  else if(mode.value === 1){
    return '随机播放'
  }
  else{
    return '单曲循环'
  }
})

const modeChange = ()=>{
  mode.value = (mode.value + 1) % 3 ;
}

const deleteRow = (index) => {
  playListInfoStore.playList.splice(index, 1)
}

const loadMore = async()=>{
  console.log("isloading is ",isloading.value);
  if (!isloading.value) {
      try {
        console.log('开始加载了!!!')
        isloading.value = true;
        let res = await getComment(playListInfoStore.currentMusic.id , offset.value ,10);
        console.log("获取的数据",res.data);
        currentComment.value.push(...res.data.comments);
        console.log("保存的评论数据",currentComment.value);
        offset.value += 1 ; 

      } catch (error) {
        console.log(error);
      }
      
    } else {
      alert('已经在加载了');
      return ;
    }
    isloading.value = false;

}


const commentdrawer = async () =>{
  drawer2.value = true ;
  if(currentMusicId.value == playListInfoStore.currentMusic.id){ //当前播放音乐一致
    try {
      isloading.value = true ;
      let res = await getComment(playListInfoStore.currentMusic.id , offset.value ,10);
      console.log("获取的数据",res.data);
      currentComment.value.push(...res.data.comments);
      console.log("保存的评论数据",currentComment.value);
      offset.value += 1 ; 
      
    } catch (error) {
      console.log(error);
    }
  }
  else{
    try {
      currentMusicId.value = playListInfoStore.currentMusic.id;
      offset.value = 0;
      let res = await getComment(playListInfoStore.currentMusic.id , offset.value ,15);
      isloading.value = true ;
      console.log("获取的数据",res.data);
      currentComment.value = res.data.comments;
      console.log("保存的评论数据",currentComment.value);
      offset.value += 1 ; 
      
    } catch (error) {
      console.log(error);
    }
  }
  isloading.value = false;
  await nextTick();
  
}


</script>



<style scoped>
input,img{
  cursor: pointer;
}
    .container {
        display: grid;
        height: 100px;
        width: 100%;
        border-radius: .5em;
        /* background:  #333; */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        color:  #ddd;
    }
    .label {
        margin-top: 10px;
        font-size: 16px;
        color: #999;
    }
   .label:hover{
      cursor: pointer;
      color:#666
    }

    .label::before {
        content: '正在播放：';
        color: #999;
    }
    .label:empty {
        display: none;
    }
    .operate {
        display: flex;
        align-items: center;
    }
    .operate-time,
    .time-range {
        flex: 1;
    }

           
    .operate-seq {
        flex: none;
    }
    .operate-time {
        display: flex;
        align-items: center;
        margin: 0 1em;
    }
    .operate-time output {
        flex: 0 0 5ch;
        font-size: 75%;
    }

    /*自定义type=range的元素  */
    [type="range"] {
        -webkit-appearance: none;/*移除浏览器默认样式 */
        appearance: none; /*移除浏览器默认样式 */
        margin: 0;
        outline: 0;
        background-color: transparent; /*滑块背景透明 */
        font-size: 16px;
    }
    /*设置滑块背景 */
    ::-webkit-slider-container {
        display: flex;
        height: 1em;
        overflow: hidden;
    }
    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background-color: #fff;
        width: .75em;
        height: .75em;
        border-radius: 50%;
        margin-top: -.25em;
        border-image: linear-gradient(#858484, #858484) 0 fill / .25em .75em .25em 0 / 0 0 0 2000px;
    }
    ::-webkit-slider-runnable-track {
        height: .25em;
        background: #ccc;
    }
    ::-moz-range-track {
        background: #ccc;
        height: .25em;
    }            
    ::-moz-range-progress {
        background: linear-gradient(#858484, #858484);
        height: .25em;
    }
    ::-moz-range-thumb {
        border: 0;
        background-color: #fff;
        width: .75em;
        height: .75em;
        border-radius: 50%;
        margin-top: -.25em;
    }
    .time-range {  margin: 0 .25em; }
    .time-total { text-align: right; color:darkgray }
    .time-current{color:darkgray }
    .operate-volume { display: flex; align-items: center; }
    .volume-range { width: 7.5em; }
    select { position: absolute; }
    .rate {
        padding: 0;
        border: 0;
        background: rgba(0,0,0,.35);
        color: inherit;
        width: 55px;
        height: 30px;
        border-radius: 8px;
        margin: 0 .5em 0 1em;
        box-shadow: 0 1px #666, 0 -1px #000;
        font-size: 16px;
    }
    
    select {
        position: absolute;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
    }
    .select-loop {
        height: calc(2.5 * var(--1rem));
        width: 60px;
    }
.comment-container {
  width: 100%;
  padding: 10px;
}

.loading-text {
  font-weight: bold;
  color: gray;
}

.comment-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.comment-item:hover{
  background-color: #cecece;
  cursor: pointer;
}

.comment-avatar {
  width: 35px;
  height: 35px;
  margin-right: 10px;
}

.comment-nickname {
  color: rgb(4, 132, 190);
  margin-right: 5px;
  font-size: 12px;
}

.comment-content {
  margin-right: 10px;
  font-size: 12px;
}

.comment-location {
  margin-left: auto;
  color: gray;
  font-size: 12px;
}

.loadMore{
  cursor: pointer;
}
</style>