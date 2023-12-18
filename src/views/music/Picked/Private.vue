<template>
    <div style="display: flex; align-items: center;">
      <h1 style="font-size: 20px;">独家放送</h1>
      <svg t="1702897850207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14512" width="35" height="35"><path d="M644.266667 494.933333l-192 192-29.866667-29.866666 162.133333-162.133334-162.133333-162.133333 29.866667-29.866667 192 192z" fill="#2c2c2c" p-id="14513"></path></svg>
    </div>
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
        <!-- :pagination="{ clickable: true }" 下面的小圆点           :scrollbar="{ draggable: true }"-->
        <!--  navigation 左右指示表 -->
          <swiper-slide v-for="(item, index) in lists" :key="item.id" span="15">
            <img :src="item.sPicUrl" :alt="item.name" :class="`banner_img img-${index}`" @click="handleImageClick(item)"/>
          </swiper-slide>
          
        </swiper>
  
        </template>
      </el-skeleton>
    </div>
  </template>

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
  import { getPrivateContent } from '../../../apis/http';
  import { useplayListInfoStore } from '../../../store/index';
  const playListInfoStore = useplayListInfoStore();
  
  const lists = ref([]);//获取
  const loading = ref(true);
  
  const fetchData = async () => {
    try {
      const response = await getPrivateContent(10,0);
      lists.value = response.data.result;
      loading.value = false;
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };
  
  const handleImageClick = (i) => {
    console.log("点击了");
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
    width: 100%; 
    margin: 10px; 
    border-radius: 10px;
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