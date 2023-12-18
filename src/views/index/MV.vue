<template>
    <div style="display: flex; align-items: center;">
        <h1 style="font-size: 20px;">推荐MV</h1>
        <svg t="1702897850207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14512" width="35" height="35"><path d="M644.266667 494.933333l-192 192-29.866667-29.866666 162.133333-162.133334-162.133333-162.133333 29.866667-29.866667 192 192z" fill="#2c2c2c" p-id="14513"></path></svg>
    </div>
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
  border-radius: 5px;
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