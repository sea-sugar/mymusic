<template>
    <h1>你的专属歌单</h1>
    <div class="container">
      <div class="image">
        <div class="image-item" v-for="item in lists.slice(0, 9)" :key="item.id">
          <img :src="item.picUrl" :alt="item.name">
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { getPersonalized } from '../../apis/http';

const lists = ref([]);

const fetchData = async () => {
  try {
    const response = await getPersonalized();
    lists.value = response.data.result;
    console.log(lists.value);
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
};

onMounted(fetchData);
</script>

<style>
.container {
  overflow: hidden;
}

.image {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; /* 修改为 flex-start，确保名称在图片下方 */
  margin-left: 30px;
}

.image-item {
  width: 120px; /* 调整图片项的宽度 */
  height: auto;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; /* 将图片和名称垂直排列 */
  align-items: center; /* 居中对齐图片和名称 */
}

.image-item img {
  width: 100%; /* 图片宽度占满父容器 */
  height: auto;
}

.name {
  text-align: center; /* 居中显示名称 */
  margin-top: 5px; /* 调整名称与图片的间距 */
  font-size:11px;
}
.image-item img:hover{
  filter: brightness(50%);
}
.name:hover{
  font-weight: bold;
}
</style>