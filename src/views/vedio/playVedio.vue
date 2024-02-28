<template>
  <div class="container">
    <videoPlay
      v-bind="options"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @canplay="onCanplay"
    />
    <div class="detail" v-if="isfetchData">
      <p class="mv-name"> {{ VedioDetail.title }}</p><!-- MV名字: -->
      <p class="mv-desc">简介: {{ VedioDetail.description }}</p><!-- MV简介: -->
      
      <img
        :src="VedioDetail.creator.avatarUrl"
        :title="VedioDetail.creator.nickname"
        alt=""
        class="artist-image"
      />
      <p class="mv-artist">发布者: {{ VedioDetail.creator.nickname }}</p>
      <!-- <p class="mv-publish">发布时间: {{ VedioDetail.publishTime }}</p> -->
    </div>
    <div class="detail" v-else="!isfetchData">加载中</div>
  </div>
</template>

<script setup>
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";
// https://github.com/xdlumia/vue3-video-play/issues/129 解决vue3-video-play导入报错问题
// 将packages.json中的"module": "./dist/index.es.js"改为"module": "./dist/index.mjs"后，可以正常使用

import { ref, onMounted,onBeforeMount,computed,reactive,watch,nextTick} from 'vue';
import { useRoute } from 'vue-router';
import { useplayListInfoStore } from '../../store/index';
import { getVedioDetail,getVediourl } from '../../apis/http';
const playListInfoStore = useplayListInfoStore();
const route = useRoute();
const VedioId = route.query.id;
const VedioDetail = ref(null);
const Vediourl = ref(null);

const isfetchData = ref(false);

const fetchData = async () =>{
  try{
      const [res, ress] = await Promise.all([getVedioDetail(VedioId), getVediourl(VedioId)]);
      VedioDetail.value = res.data.data;
      Vediourl.value = ress.data.urls;
      console.log("VedioDetail.value",VedioDetail.value);
      console.log("Vediourl.value",Vediourl.value);
      options.title=VedioDetail.value.title;
      options.src=Vediourl.value[0].url;
      console.log(Vediourl.value);
      console.log(options.src);
      options.poster=VedioDetail.value.coverUrl;
      await nextTick();//等待 Vue 组件完成数据更新和 DOM 渲染之后再将 isfetchData 的值设置为 true
      //可以确保在下一次 DOM 更新循环结束之后才执行后续代码，避免在数据更新期间访问不一致的 DOM
      isfetchData.value = true;
  }catch(error){
      console.error('Error fetching lists:', error);
  }

}

const options = reactive({
width: "70%", //播放器宽度
height: "40%", //播放器高度
color: "#409eff", //主题色
title: 'VedioDetail.value.name', //视频名称
src: 'Vediourl.value.url', //视频源
poster: 'VedioDetail.value.cover', //封面
muted: false, //静音
webFullScreen: false,
speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
autoPlay: false, //自动播放
loop: false, //循环播放
mirror: false, //镜像画面
ligthOff: false, //关灯模式
volume: 0.5, //默认音量大小
control: true, //是否显示控制
controlBtns: [
  "audioTrack",
  "quality",
  "speedRate",
  "volume",
  "setting",
  "pip",
  "pageFullScreen",
  "fullScreen",
], //显示所有按钮,
});
const onPlay = (ev) => {
//   console.log('播放')
}
const onPause = (ev) => {
//   console.log(ev, '暂停')
}

const onTimeupdate = (ev) => {
//   console.log(ev, '时间更新')
}
const onCanplay = (ev) => {
//   console.log(ev, '可以播放')
}

onMounted(fetchData);
</script>

<style scoped>
.container {
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
}

.detail {
margin-top: 20px;
text-align: center;
}

.mv-name {
font-size: 20px;
font-weight: bold;
}

.mv-desc {
font-size: 16px;
}

.mv-artist {
font-size: 16px;
color: #666;
}

.artist-image {
width: 100px;
height: 100px;
border-radius: 50%;
margin: 10px auto;
}

.mv-publish {
font-size: 14px;
color: #999;
}

.detail.loading {
display: flex;
justify-content: center;
align-items: center;
height: 200px;
font-size: 20px;
font-weight: bold;
color: #666;
}
</style>