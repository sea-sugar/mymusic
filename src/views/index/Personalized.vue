<template>
    <div style="display: flex; align-items: center;">
      <h1 style="font-size: 20px;">你的专属歌单</h1>
      <svg t="1702897850207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14512" width="35" height="35"><path d="M644.266667 494.933333l-192 192-29.866667-29.866666 162.133333-162.133334-162.133333-162.133333 29.866667-29.866667 192 192z" fill="#2c2c2c" p-id="14513"></path></svg>
    </div>
    <div class="container">
      <el-row :gutter="10" justify="space-between">
          <el-col v-for="(item, index) in lists.slice(0, 12)" :key="item.imageUrl" :span="2">
            <div class="image-item">
              <img :src="item.picUrl" :alt="item.name" @click="goToPlaylist(item.id)" class="hvr-float-shadow"/>
              <div class="name">{{ item.name }}</div>
              <div class="play-count">{{ formatNumber(item.playCount) }}</div>
            </div>
          </el-col>
      </el-row>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { getPersonalized } from '../../apis/http';
import router from '../../router/index'
import { formatNumber  } from "../../utils/util";
const lists = ref([]);

const fetchData = async () => {
  try {
    const response = await getPersonalized();
    lists.value = response.data.result;
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
};

const goToPlaylist = (playlistId) => {
  router.push(`/playlist?id=${playlistId}`);
};

onMounted(fetchData);
</script>

<style scoped>
.container {
  max-width: 100%;
  overflow: hidden;
  justify-content: space-between;
}

.image-item {
  cursor: pointer;
  width: 100%; 
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  position: relative;  /* 设置父容器为相对定位 */

}

.image-item img {
  width: 100%;
  height: auto;
  border-radius: 10%;
}

.name {
  text-align: center; /* 居中显示名称 */
  margin-top: 5px; /* 调整名称与图片的间距 */
  font-size:11px;
}
.image-item img:hover{
  filter: brightness(75%);
}
.image-item:hover{
  font-weight: bold;
}


/* Float Shadow */
.hvr-float-shadow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-float-shadow:before {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  content: '';
  top: 100%;
  left: 5%;
  height: 10px;
  width: 90%;
  opacity: 0;
  background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
  /* W3C */
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform, opacity;
  transition-property: transform, opacity;
}
.hvr-float-shadow:hover, .hvr-float-shadow:focus, .hvr-float-shadow:active {
  -webkit-transform: translateY(-5px);
  transform: translateY(-5px);
  /* move the element up by 5px */
}
.hvr-float-shadow:hover:before, .hvr-float-shadow:focus:before, .hvr-float-shadow:active:before {
  opacity: 1;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  /* move the element down by 5px (it will stay in place because it's attached to the element that also moves up 5px) */
}

.play-count {
    position: absolute;  /* 设置子容器为绝对定位 */
    top: 0;  
    right: 0;  
    background-color: #353535;  
    color: #ffffff;  
    padding: 2% 5%;  
    border-radius: 5px; 
    font-size: 12px;
  }
</style>