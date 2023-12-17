<template>
    <h1>推荐MV</h1>
    <div class="container">
      <div class="image">
        <el-row :gutter="10">
          <el-col v-for="item in lists" :key="item.id" :span="12">
            <div class="image-item">
              <div class="image-content" @click="goToPlayMV(item)">
                <img :src="item.picUrl" :alt="item.name" />
                <div class="text">
                  <div class="name">{{ item.name }}</div>
                  <div class="artist">{{ item.artists[0].name }}</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { getMV } from "../../apis/http";
import router from '../../router/index'
const lists = ref([]);

const fetchData = async () =>{
    try{
        const res = await getMV();
        lists.value = res.data.result;

    }catch(error){
        console.error('Error fetching lists:', error);
    }
}

const goToPlayMV = (item) =>{
  router.push(`/playMV?id=${item.id}`)
}

onMounted(fetchData);
</script>


<style scoped>
.container {
  overflow: hidden;
  width: 100%;
  height: auto;
}

.image {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-left: 0px;
  margin-right: 0px;
  justify-content: flex-start;
}

.image-item {
  cursor: pointer;
  width: auto;
  height: auto;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  transition: filter 0.3s;
}

.image-content {
  position: relative;
}

.image-item img {
  width: 400px;
  height: auto;
}

.text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 380px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 10px;
  color: #fff;
  display: none;
}

.image-item:hover .text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.name {
  text-align: left;
  font-size: 11px;
  margin-bottom: 5px;
}

.artist {
  text-align: left;
  font-size: 11px;
  color: gray;
}

.image-item img:hover {
  filter: brightness(50%);
  
}

.name:hover {
  font-weight: bold;
}
</style>