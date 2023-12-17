<template>
    <div class="container">
        <div class="tag-group">
          分类：<div class="tag" v-for="(item, index) in typelist" :key="index" @click="selectType(item.id)" :class="{ 'selected': item.id === type }">{{ item.name }}</div>
        </div>
        <div class="tag-group">
          语种：<div class="tag" v-for="(item, index) in arealist" :key="index" @click="selectArea(item.id)" :class="{ 'selected': item.id === area }">{{ item.name }}</div>
        </div>
        <div class="tag-group">
          筛选：<div class="tag" @click="selectInitial(initiallist[0])" :class="{ 'selected': '-1' === initial }">{{initiallist[0]}}</div>
                <div class="tag" v-for="(item, index) in initiallist.slice(1)" :key="index" @click="selectInitial(item)" :class="{ 'selected': item === initial }">{{ item }}</div>
        </div>

        <div class="display-container"> 
            <div class="display-artists" v-for="(item, index) in artists" @click="goToArtistdetail(item)">
                <div class="artist-image">
                    <img :src="item.img1v1Url" :alt="item.name" :key="index">
                </div>
                <div class="artist-name">
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </div>
        
    </div>
  
    
</template>

<script setup>
import { getArtistlist } from '../../../apis/http'
import { ref, onMounted, watch } from "vue";
import router from '../../../router/index'


const typelist = [{ name: '全部', id: '-1' }, { name: '男歌手', id: '1' }, { name: '女歌手', id: '2' }, { name: '乐队', id: '3' }];
const arealist = [{ name: '全部', id: '-1' }, { name: '华语', id: '7' }, { name: '欧美', id: '96' }, { name: '日本', id: '8' }, { name: '韩国', id: '16' }, { name: '其他', id: '0' }];
const initiallist = ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const artists = ref([]);
const type = ref('-1');
const area = ref('-1');
const initial = ref('-1');

const fetchData = async () => {
  try {
    const res = await getArtistlist(type.value, area.value, initial.value);
    artists.value = res.data.artists;
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
}

onMounted(fetchData);

watch((type), (newone,oldone) => {
  artists.value=[];
  type.value = newone;
  // console.log(type.value,area.value,initial.value);
  fetchData();
});
watch((area), (newone,oldone) => {
  artists.value=[];
  area.value = newone;
  // console.log(type.value,area.value,initial.value);
  fetchData();
});
watch((initial), (newone,oldone) => {
  artists.value=[];
  initial.value = newone;
  // console.log(type.value,area.value,initial.value);
  fetchData();
});

const selectType = (selectedType) => {
  type.value = selectedType;
  // console.log(type.value,area.value,initial.value);
}

const selectArea = (selectedArea) => {
  area.value = selectedArea;
  // console.log(type.value,area.value,initial.value);
}

const selectInitial = (selectedInitial) => {
    if(selectedInitial === '全部'){
        initial.value = '-1';
    }
    else{
        initial.value = selectedInitial;
    }
    // console.log(type.value,area.value,initial.value);
}

const goToArtistdetail = (item) => {
    //跳转到歌手列表
    router.push(`/artistdetail?id=${item.id}`);
}

</script>

<style scoped>
.container {
  justify-content: center;
  margin-bottom: 20px;
}

.tag-group {
  font-size: 12px;
  display: flex;
  justify-content:left;
  margin-bottom: 10px;
  align-items: center;
}

.tag {
  text-align: center;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #eaeaea;
  color: #333;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.tag:hover {
  background-color: #ccc;
}
.display-container {
  cursor: pointer;
  margin-top: 2%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

.display-artists {
  width: 9%;
  margin: 10px;
  text-align: center;
  margin-right: 2%;
}

.artist-image img {
  width: 100%;
  height: auto;
  border-radius: 50%;
}
img:hover{
  transform: scale(1.1);
}
.artist-name {
  margin-top: 10px;
}
.tag.selected {
  background-color: yellow;
  font-weight: bold;
}
</style>