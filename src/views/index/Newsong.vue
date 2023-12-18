<template>
  <div style="display: flex; align-items: center;">
      <h1 style="font-size: 20px;">推荐新音乐</h1>
      <svg t="1702897850207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14512" width="35" height="35"><path d="M644.266667 494.933333l-192 192-29.866667-29.866666 162.133333-162.133334-162.133333-162.133333 29.866667-29.866667 192 192z" fill="#2c2c2c" p-id="14513"></path></svg>
  </div>
  <div class="container">
    <div class="image">
      <el-row :gutter="40">
        <el-col v-for="(item, index) in lists.slice(0, 5)" :key="item.id" :span="4">
          <div class="image-item">
            <div class="image-content">
              <img :src="item.picUrl" :alt="item.name" @click="handleImageClick(item)" />
              <div class="text">
                <div class="name">{{ item.name }}</div>
                <div class="artist">{{ item.song.artists[0].name }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col v-for="(item, index) in lists.slice(5, 10)" :key="item.id" :span="4">
          <div class="image-item">
            <div class="image-content">
              <img :src="item.picUrl" :alt="item.name" @click="handleImageClick(item)" />
              <div class="text">
                <div class="name">{{ item.name }}</div>
                <div class="artist">{{ item.song.artists[0].name }}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getNewsong } from '../../apis/http';
import { useplayListInfoStore } from '../../store/index';
const playListInfoStore = useplayListInfoStore();
const lists = ref([]);

const fetchData = async () => {
  try {
    const response = await getNewsong();
    lists.value = response.data.result;
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
};

onMounted(fetchData);

// newsong点击事件
const handleImageClick = (item) => {
  // console.log(item.song);
  playListInfoStore.setCurrentMusic(item.song);
  console.log("播放单曲" ,item.song.id , item.song.name);
};
</script>

<style scoped>
.container {
  overflow: hidden;
  width:  100%;
  height: auto;
}

.image {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-left: 0px;
  margin-right: 0px;
  justify-content: flex-start; /* 左对齐显示内容 */
}

.image-item {
  cursor: pointer;
  width: 100%; /* 调整图片项的宽度，以容纳图片和文本 */
  margin-right: 30px;
  margin-left: 10px;
  margin-bottom: 10px;
  transition: filter 0.3s; /* 添加过渡效果 */
  justify-content: space-between;
  border-radius: 10px;
}
.image-item:hover{
  background-color: #cac6c6;
  animation: jelly-jump 1.2s ease 1;
 
}
/* 果冻效果 */
@keyframes jelly-jump {  
    0% {
        transform: translate(0);
    }
    10% {
        transform: translateY(5px) scale(1.2) scaleY(0.8);
    }
    30% {
        transform: translateY(-13px) scale(1) scaleY(1) rotate(5deg);
    }
    50% {
        transform: translateY(0) scale(1) rotate(0);
    }
    55% {
        transform: translateY(0) scaleX(1.1) scaleY(0.9) rotate(0);
    }
    70% {
        transform: translateY(-4px) scaleX(1) scaleY(1) rotate(0);
    }
    80% {
        transform: translateY(0) scaleX(1) scaleY(1) rotate(0);
    }
    85% {
        transform: translateY(0) scaleX(1.05) scaleY(0.95) rotate(0);
    }
    to {
        transform: translateY(0) scaleX(1) scaleY(1);
    }
}
.image-content {
  display: flex;
  align-items: flex-start;
}

.image-item img {
  width: 38%; /* 图片宽度占满父容器 */
  height: auto;
  border-radius: 10px;
}

.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px; /* 调整文本与图片的间距 */
  width:100px;
}

.name {
  text-align: left;
  font-size: 11px;
}

.artist {
  text-align: left;
  font-size: 11px;
  color: gray; /* 可以设置歌手名字的颜色为灰色 */
}

.image-item img:hover {
  filter: brightness(50%);
}

.name:hover {
  font-weight: bold;
}

</style>