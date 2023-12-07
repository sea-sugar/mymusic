<template>
  <h1>推荐新音乐</h1>
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
  console.log(item.song);
  playListInfoStore.setCurrentMusic(item.song);
  console.log("播放单曲" ,item.song.id , item.song.name);
};
</script>

<style scoped>
.container {
  overflow: hidden;
  width:  auto;
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
  width: 250px; /* 调整图片项的宽度，以容纳图片和文本 */
  height: auto;
  margin-right: 30px;
  margin-left: 10px;
  margin-bottom: 10px;
  transition: filter 0.3s; /* 添加过渡效果 */
  justify-content: space-between;
}
.image-item:hover{
  background-color: #cac6c6;
}

.image-content {
  display: flex;
  align-items: flex-start;
}

.image-item img {
  width: 80px; /* 图片宽度占满父容器 */
  height: auto;
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