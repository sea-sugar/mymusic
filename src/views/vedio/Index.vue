<template>
    <el-main>   
        <el-popover
        placement="top-start"
        title="全部视频"
        width="70%"
        height="30%"
        trigger="hover"
        content="加载中"
      >
        <el-check-tag :checked="tag === t.name" @change="onChange(t.id)" v-for="(t,index) in vediotags " class="check-tag">{{ t.name }}</el-check-tag>
        <template #reference>
          <el-button class="m-2">全部视频</el-button>
        </template>
      </el-popover>

      <div class="container">
        <div class="video-list">
          <div class="video-item" v-for="item in vediolists" :key="item.id" @click="goToPlayVedio(item)">
            <div class="video-image">
              <img :src="item.data.coverUrl" :alt="item.data.title">
            </div>
            <div class="video-info">
              <div class="video-title">{{ item.data.title }}</div>
            </div>
          </div>
        </div>
      </div>



    </el-main>
</template>

<script setup>
import { getVediolist ,getVediotags } from '../../apis/http';
import { ref,onMounted,nextTick} from "vue";
import router from '../../router/index'
const vediotags = ref([]);
const vediolists = ref([]);
const tag = ref('');
const fetchData = async ()=>{
  try{
    const res = await getVediotags();
    vediotags.value = res.data.data;
    tag.value = vediotags.value[0].name;
    const resp = await getVediolist(vediotags.value[0].id);
    console.log(vediotags.value[0].id);
    vediolists.value = resp.data.datas;
    console.log(resp);
    console.log(vediolists.value);
    }catch(error){
        console.error('Error fetching lists:', error);
    }
  
}
const onChange = async (id)=>{
  const res = await getVediolist(id);
  vediolists.value = res.data.datas;
  await nextTick();
}
const goToPlayVedio = (item) =>{
  console.log(item.data);
  router.push(`/playVedio?id=${item.data.vid}`)
}
onMounted(fetchData);
</script>


<style scoped>
.container {
  margin-top: 2%;
  overflow: hidden;
  width: 100%;
  height: auto;
}

.video-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .video-item {
    width: calc(33.33% - 20px);
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  .video-item:hover {
    transform: scale(1.05);/* 缩放 */
    
  }

  .video-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .video-info {
    padding: 10px;
    background-color: #f5f5f5;
  }

  .video-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .check-tag{
  background-color: #fff;
  width: 8%;
}

  .check-tag:hover{
    background-color: #f3f3f3;
  }

</style>