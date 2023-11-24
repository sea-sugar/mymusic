<template>
    <h1>推荐新音乐</h1>
    <div class="container">
      <div class="image">
        <div class="image-item" v-for="item in lists.slice(0, 9)" :key="item.id">
          <div class="image-content">
            <img :src="item.picUrl" :alt="item.name">
            <div class="text">
              <div class="name">{{ item.name }}</div>
              <div class="artist">{{ item.song.artists[0].name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { getNewsong } from '../../apis/http';

const lists = ref([]);

const fetchData = async () => {
  try {
    const response = await getNewsong();
    lists.value = response.data.result;
    console.log(lists.value);
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
};

onMounted(fetchData);
</script>

<style scoped>
.container {
  overflow: hidden;
}

.image {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-left: 0px;
}

.image-item {
  width: 160px; /* 调整图片项的宽度，以容纳图片和文本 */
  height: auto;
  margin-right: 10px;
  margin-bottom: 10px;
}

.image-content {
  display: flex;
  align-items: center;
}

.image-item img {
  width: 60px; /* 图片宽度占满父容器 */
  height: auto;
  
}

.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px; /* 调整文本与图片的间距 */
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
