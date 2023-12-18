<template>
    <div style="display: flex; align-items: center;">
      <h1 style="font-size: 20px;">推荐电台</h1>
      <svg t="1702897850207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14512" width="35" height="35"><path d="M644.266667 494.933333l-192 192-29.866667-29.866666 162.133333-162.133334-162.133333-162.133333 29.866667-29.866667 192 192z" fill="#2c2c2c" p-id="14513"></path></svg>
    </div>
    <div class="container">
      <el-row :gutter="10" justify="space-between">
          <el-col v-for="(item, index) in lists.slice(0, 6)" :key="item.id" :span="4">
            <div class="image-item">
              <img :src="item.picUrl" :alt="item.name" @click="goToPlaylist(item)"/>
              <div class="name">{{ item.name }}</div>
            </div>
          </el-col>
      </el-row>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { getDjRecommend } from '../../../apis/http';
import router from '../../../router/index'

const lists = ref([]);

const fetchData = async () => {
  try {
    const response = await getDjRecommend();
    lists.value = response.data.djRadios;
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
};

const goToPlaylist = (playlistId) => {
  console.log('点击了');
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
}

.image-item img {
  width: 100%;
  height: auto;
  border-radius: 20px;
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
</style>
