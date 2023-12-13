<template>
    <!-- Category.vue 歌单分类 -->
    <div class="container">
        <div class="tag-group">
            <el-check-tag v-for="(item, index) in taglist" :key="index" :checked="tag === item.name" @change="onChange(item.name)" >{{ item.name }}</el-check-tag>
        </div>

        <div class="display-container"> 
            <div class="display-artists" v-for="(item, index) in categorizeplaylist" :key="item.id" @click="goToPlaylist(item.id)">
                <div class="artist-image">
                    <img :src="item.coverImgUrl" :alt="item.name" :key="index">
                </div>
                <div class="artist-name">
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </div>

        <el-link :underline="false" @click="loadMore"  style="left: 50%; margin-top: 2%;">加载更多歌曲</el-link>
        
    </div>
  
    
</template>

<script setup>
import { getCatlist , getPlaylistcate } from '../../../apis/http'
import { ref, onMounted, watch, nextTick } from "vue";
import router from '../../../router/index'

const taglist = ref([]);
const tag = ref('全部')
const playlistnum = ref(24);
const categorizeplaylist = ref([]); 

const fetchData = async () => {
  try {
    const res = await getCatlist();
    taglist.value = res.data.tags;
    taglist.value.unshift({name:'全部'});

    const resp = await getPlaylistcate( playlistnum.value , tag.value)
    categorizeplaylist.value = resp.data.playlists;

  } catch (error) {
    console.error('Error fetching lists:', error);
  }
}

onMounted(fetchData);

// watch((type), (newone,oldone) => {
//   type.value = newone;
//   console.log(type.value,area.value,initial.value);
//   fetchData();
// });


const onChange = async (name) => {
    tag.value = name ;
    playlistnum.value = 24 ;
    const resp = await getPlaylistcate( 24 , name)
    await nextTick(); // 等待DOM渲染完成
    categorizeplaylist.value = resp.data.playlists;
    // console.log(tag.value);
    // console.log(categorizeplaylist.value);
    // console.log(resp.data.playlists);

}


const goToPlaylist = (playlistId) => {
  router.push(`/playlist?id=${playlistId}`);
};

const loadMore = async ()=>{
    playlistnum.value *= 2 ;
    const resp = await getPlaylistcate( playlistnum.value , tag.value)
    categorizeplaylist.value = resp.data.playlists;
}

</script>

<style scoped>
.container {
  justify-content: center;
  margin-bottom: 20px;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
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
  border-radius: 10%;
}

.artist-name {
  margin-top: 10px;
  font-size: 12px;
}
</style>