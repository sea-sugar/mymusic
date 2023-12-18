<template>
    <el-main>
      <div class="playlist-details">
        <div class="playlist-header">
          <img :src="coverImgUrl" alt="Playlist Cover" class="playlist-cover" />
          <div class="playlist-info">
            <h1 class="playlist-name">{{ name }}</h1>
            <!-- <div class="playlist-creator">
              <el-avatar :src="creator.avatarUrl"></el-avatar>
              <p class="creator-name">{{ creator.nickname }}</p>
            </div> -->
            <div class="playlist-description" :class="{ collapsed: descriptionCollapsed }">
              <div v-if="!descriptionCollapsed">{{ description }}</div>
              <div v-else>{{ collapsedDescription }}</div>
              <div class="description-toggle" @click="toggleDescription">
                {{ descriptionToggleText }}
              </div>
            </div>
            <div class="playlist-tags">
              <span v-for="tag in tags" :key="tag" class="playlist-tag">{{ tag.name }} : {{ tag.size }}</span>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div @click="playAll" style="font-size: 25px; font-weight: bold; cursor: pointer;">播放全部</div>
          <div style="margin-right: 5%;">
            <el-check-tag :checked="checked=== 1" @change="onChange(1)">精选</el-check-tag>
            <el-check-tag :checked="checked=== 2" @change="onChange(2)">全部</el-check-tag>
          </div>
          
        </div>
       
        <div class="playlist-songs" v-if="checked === 1">
          <div class="playlist-songs-container">
            <div class="song-info">
              <div class="song-name" style="color:darkgray">歌曲名称</div>
                <div class="song-artist" style="color:darkgray"></div>
                <div class="song-album" style="color:darkgray">专辑</div>
                <div class="song-time" style="color:darkgray">歌曲时长</div>
              </div>
            <div
              v-for="song in hotsongs "
              :key="song.id"
              class="playlist-song"
              @mouseover="handleMouseOver(song)"
              @mouseout="handleMouseOut"
            >
              <div @click="playThis(song)" class="song-info">
                <div class="song-name">{{ song.name }}</div>
                <div class="song-artist"> </div>
                <div class="song-album">{{ song.al.name }}</div>
                <div class="song-time">{{ formattedTime(song.dt) }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="playlist-songs" v-else-if="checked === 2">
          <div class="playlist-songs-container">
            <div class="song-info">
                <div class="song-name" style="color:darkgray">歌曲名称</div>
                <div class="song-artist" style="color:darkgray"></div>
                <div class="song-album" style="color:darkgray">专辑</div>
                <div class="song-time" style="color:darkgray">歌曲时长</div>
              </div>
            <div
              v-for="song in allsongs "
              :key="song.id"
              class="playlist-song"
              @mouseover="handleMouseOver(song)"
              @mouseout="handleMouseOut"
            >
              <div @click="playThis(song)" class="song-info">
                <div class="song-name">{{ song.name }}</div>
                <div class="song-artist"> </div>
                <div class="song-album">{{ song.al.name }}</div>
                <div class="song-time">{{ formattedTime(song.dt) }}</div>
              </div>
            </div>
          </div>
          <el-link :underline="false" @click="loadMoreSongs"  style="left: 50%;">加载更多歌曲</el-link>
        </div>
      </div>
    </el-main>
  </template>
  
  <script setup>
  import { ref, onMounted,computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { getArtisthotsong , getArtistallsong ,getArtistdetail } from "../../../apis/http";

  import { useplayListInfoStore } from '../../../store/index';
  const playListInfoStore = useplayListInfoStore();

  const route = useRoute();
  const artistId = route.query.id;
  const name = ref('');
  const coverImgUrl = ref('');
  const description = ref('');
  const collapsedDescription = ref('');
  const descriptionCollapsed = ref(true);
  const tags = ref([]);
  const hotsongs = ref([]);
  const allsongs = ref([]);
  const allsongsnum = ref(0);
  const allsongsnums = ref(0);
  const checked = ref(1);
  onMounted(async () => {
    try {
      // 获取歌手详情
      const res = await getArtistdetail(artistId);
      name.value = res.data.data.artist.name;
      coverImgUrl.value = res.data.data.artist.avatar;
      description.value = res.data.data.artist.briefDesc;
      collapsedDescription.value = truncateDescription(description.value, 100); 
      tags.value.push({name:'单曲数',size:res.data.data.artist.musicSize});
      tags.value.push({name:'专辑数',size:res.data.data.artist.albumSize});
      tags.value.push({name:'MV数',size:res.data.data.artist.mvSize});
  
      // 获取精选的热门歌曲
      const resp= await getArtisthotsong(artistId);
      hotsongs.value = resp.data.songs;

      //获取全部歌曲
      const respo = await getArtistallsong(artistId, 'time', 20 , allsongsnum.value);
      allsongs.value = respo.data.songs;
      allsongsnums.value = respo.data.total;

    } catch (error) {
      console.error(error);
    }
  });
  
  const handleMouseOver = (song) => {
    // 处理鼠标悬停事件
    // 例如显示歌曲的更多信息或添加悬停样式

  };
  
  const handleMouseOut = () => {
    // 处理鼠标离开事件
    // 例如隐藏歌曲的更多信息或移除悬停样式
  };
  
  const toggleDescription = () => {
    descriptionCollapsed.value = !descriptionCollapsed.value;
  };
  
  const descriptionToggleText = computed(() => {
    return descriptionCollapsed.value ? '详情' : '收起';
  });
  
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength) + '...';
    }
  };
  const formattedTime = (duration) => {
    const minutes = Math.floor(duration / 1000 / 60);
    const seconds = Math.floor((duration / 1000) % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const playThis = (song) =>{
    playListInfoStore.setCurrentMusic(song);
    console.log("播放单曲" ,song.id , song.name);
  }
  

const playAll = async () => {    
    console.log("播放歌单:", name.value, "的全部歌曲囖");    
    if(checked.value === 1){  
      for(let song of hotsongs.value){    
        await playListInfoStore.addPlayListBack(song);    
      }  
      console.log("All songs added to playlist.");    
    }  
    else{  
      for(let song of allsongs.value){    
        await playListInfoStore.addPlayListBack(song);    
      }  
      console.log("All songs added to playlist.");    
    }  
    // playListInfoStore.isPlaying = true ;  
}


// 加载更多歌曲
const loadMoreSongs = async () => {
  try {
    if(allsongsnum.value>=allsongsnums.value){
      //加载完了
      return ;
    }
    allsongsnum.value += 20 ;
    // 获取更多歌曲
    const resp = await getArtistallsong(artistId, 'time', 20,allsongsnum.value);
    allsongs.value = [...allsongs.value, ...resp.data.songs];

  } catch (error) {
    console.error(error);
  }
};

const onChange = (i) =>{
  checked.value= i;
} 

  </script>
  
  <style scoped>
  .playlist-details {
    max-width: 100%;
    margin: 0 auto auto 10px;
    padding: 0px;
  }
  
  .playlist-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .playlist-cover {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .playlist-info {
    margin-left: 20px;
  }
  
  .playlist-name {
    font-size: 24px;
    margin-top: 10px;
  }
  
  .playlist-creator {
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 14px;
    color: #999;
    margin-top: 5px;
  }
  
  .creator-name {
    margin-left: 5px;
  }
  
  .playlist-description {
    font-size: 12px;
    margin-top: 10px;
    line-height: 1.5;
    overflow: hidden;
     transition: max-height 0.3s ease;
  }
  
  .playlist-description.collapsed {
    max-height: 80px; /* 调整收起时的高度 */
  }
  
  .description-toggle {
    color: #1890ff;
    cursor: pointer;
    margin-top: 5px;
  }
  
  .playlist-tags {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .playlist-tag {
    display: inline-block;
    font-size: 12px;
    color: #666;
    background-color: #f2f2f2;
    border-radius: 2px;
    padding: 2px 6px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  
  .playlist-song {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f2f2f2;
    cursor: pointer;
  }
  
  .playlist-song:last-child {
    border-bottom: none;
  }
  
  .song-info {
    flex: 1;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;

    font-size: 13px;
    margin-bottom: 5px;

  }
  .song-info div{
    width:20%;
  }
  .playlist-song:hover {
    background-color: #f5f7fa;
  }

  .playlist-songs{
    width: 100%;
  }
  .song-name{
    width:30%;
  }
  .song-artist{
    width:20%;
  }
  .song-album{
    width:30%;
  }
  .song-time{
    width:10%;
  }


  </style>