<template>
  <h1 style="font-size: 25px; margin-left: 10px;">推荐</h1>
  <div class="container">
    <el-skeleton :loading="loading" animated>
      <template #template> 
        <!-- 骨架屏加载ing显示 -->
        <el-skeleton-item class="skeleton-img" variant="image" />
      </template>
      <template #default>
        <!-- 骨架屏加载完成显示 -->
        <swiper
        :modules="modules"
        :slides-per-view="4"
        :space-between="25"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        
      >
      <!-- :pagination="{ clickable: true }" 下面的小圆点 :scrollbar="{ draggable: true }"-->
      <!--  navigation 左右指示表 -->
        <swiper-slide v-for="(item, index) in lists" :key="item.imageUrl" span="15">
          <img :src="item.imageUrl" :alt="item.typeTitle" :class="`banner_img img-${index}`" @click="handleImageClick(item)"/>
        </swiper-slide>
        
      </swiper>

      </template>
    </el-skeleton>
  </div>
</template>
<!-- 待解决 -->
<!-- 图片的显示数量将根据页面宽度自适应调整，并始终显示在一行内，不会超出容器宽度 -->
<script setup>

// 使用swiper
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
const modules = [Navigation, Pagination, Scrollbar, A11y]
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};

import { ref, onMounted } from 'vue';
import { getBanner,getMusic } from '../../apis/http';
import { useplayListInfoStore } from '../../store/index';
const playListInfoStore = useplayListInfoStore();

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

const handleImageClick = (i) => {
  getMusic(i.targetId, "exhigh")
    .then((res) => {
      const song = res.data.data[0];
      song.name = "sea_sugar_music"
      if(!song.url){
        console.log('no a song');
        return ;
      }
      playListInfoStore.setCurrentMusic(song);
      console.log("播放单曲" ,song.id);

    })
    .catch((error) => {
      console.error("请求音乐数据出错", error);
    });
};

onMounted(fetchData);//以确保在组件挂载后立即执行数据获取，并更新lists和loading的值。
</script>

<style scoped>
.swiper{
  cursor: pointer;
}
.skeleton-img{
  width: auto; 
  height: 120px;
  margin: 10px; 
}
.banner_img {
  border-radius: 10px;
  width: 100%; 
  margin: 10px; 
}
.container {
  width: 100%; 
  height: auto; 
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