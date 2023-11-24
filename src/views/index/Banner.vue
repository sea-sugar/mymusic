<template>
  <h1>推荐</h1>
  <div class="container">
    <el-skeleton :loading="loading" animated>
      <template #template> 
        <!-- 骨架屏加载ing显示 -->
        <el-skeleton-item class="skeleton-img" variant="image" />
        <el-skeleton-item class="skeleton-img" variant="image" />
        <el-skeleton-item class="skeleton-img" variant="image" />
      </template>
      <template #default>
        <!-- 骨架屏加载完成显示 -->
        <div class="banner_wrap">
          <img v-for="(item, index) in lists" :src="item.imageUrl" :alt="item.typeTitle" :key="item.imageUrl" :class="`banner_img img-${index}`" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
<!-- 待解决 -->
<!-- 图片的显示数量将根据页面宽度自适应调整，并始终显示在一行内，不会超出容器宽度 -->
<script setup>
import { ref, onMounted } from 'vue';
import { getBanner } from '../../apis/http';

const lists = ref([]);//获取
const loading = ref(true);

const fetchData = async () => {
  try {
    const response = await getBanner();
    lists.value = response.data.banners;
    loading.value = false;
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
};

onMounted(fetchData);//以确保在组件挂载后立即执行数据获取，并更新lists和loading的值。
</script>

<style scoped>

.skeleton-img,
.banner_img {
  width: auto; 
  height: 120px;
  margin: 10px; 
}
.container {
  width: 100%; 
  height: 150px; 
  top:30px;
  overflow: hidden; /* 隐藏超出容器的内容 */
  margin-left: 0;
}
.banner_wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 20px;
}
.banner_img:hover {
  transform: scale(1.05);  /*放大1.05倍*/ 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 添加阴影*/ 
}

</style>