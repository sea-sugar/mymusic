<template>
    <el-main>
      <div class="playlist-details">
        <div class="playlist-header">
          <img :src="coverImgUrl" alt="Playlist Cover" class="playlist-cover" />
          <div class="playlist-info">
            <h1 class="playlist-name">{{ name }}</h1>
            <div class="playlist-creator">
              <el-avatar :src="creator.avatarUrl" ></el-avatar>
              <p class="creator-name">{{ creator.nickname }}</p>
            </div>
            <div class="playlist-description" :class="{ collapsed: descriptionCollapsed }">
              <div v-if="!descriptionCollapsed">{{ description }}</div>
              <div v-else>{{ collapsedDescription }}</div>
              <div class="description-toggle" @click="toggleDescription">
                {{ descriptionToggleText }}
              </div>
            </div>
          </div>
        </div>
        <div class="playlist-tags">
          <span v-for="tag in tags" :key="tag" class="playlist-tag">{{ tag }}</span>
          
        </div>


        <div @click="playAll" style="font-size: 25px; font-weight: bold; cursor: pointer; margin-bottom: 20px;">播放全部</div>
        <div class="playlist-songs">
          
          <div class="playlist-songs-container">
            <div class="song-info">
                &nbsp;<div class="song-name" style="color:darkgray; margin-left: 4%; ">歌曲名称</div>
                <div class="song-artist" style="color:darkgray">歌手</div>
                <div class="song-album" style="color:darkgray">专辑</div>
                <div class="song-time" style="color:darkgray">歌曲时长</div>
              </div>
            <div
              v-for="(song , index) in songs"
              :key="song.id"
              class="playlist-song"
              @mouseover="handleMouseOver(song)"
              @mouseout="handleMouseOut"
            >
              <div @click="playThis(song)" class="song-info">
                <div style="display: flex; align-items: center;">{{ index + 1  }}</div>
                <el-avatar :src="song.al.picUrl" :alt="song.name" :size="35"></el-avatar>
                <div class="song-name">{{ song.name }}</div>
                <div class="song-artist">{{ song.ar[0].name }}</div>
                <div class="song-album">{{ song.al.name }}</div>
                <div class="song-time">{{ formattedTime(song.dt) }}</div>
              </div>
            </div>
          </div>
        </div>
        <el-link :underline="false" @click="loadMore" v-if="!isLoadMore" style="left: 50%; margin-top: 2%;">加载更多歌曲</el-link>
      </div>
    </el-main>
</template>
  
<script setup>
  import { ref, onMounted,computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { getPlaylistAll, getPlaylistDetail } from "../../apis/http";

  import { useplayListInfoStore } from '../../store/index';
  const playListInfoStore = useplayListInfoStore();

  const route = useRoute();
  const playlistId = route.query.id;
  
  const name = ref('');
  const coverImgUrl = ref('');
  const creator = ref('');
  const description = ref('');
  const collapsedDescription = ref('');
  const descriptionCollapsed = ref(true);
  const tags = ref([]);
  const songs = ref([]);
  const currentnums = ref(10);
  const allnums = ref(0);
  const isLoadMore = ref(false);
  onMounted(async () => {
    try {
      // 获取歌单详情
      const playlistDetailResponse = await getPlaylistDetail(playlistId);
      const playlistDetail = playlistDetailResponse.data.playlist;
      allnums.value = playlistDetail.trackCount;//歌单歌曲总数
      name.value = playlistDetail.name;
      coverImgUrl.value = playlistDetail.coverImgUrl;
      creator.value = playlistDetail.creator;
      description.value = playlistDetail.description;
      collapsedDescription.value = truncateDescription(description.value, 100); 
  
      tags.value = playlistDetail.tags;
  
      // 获取歌单全部歌曲
      const playlistSongsResponse = await getPlaylistAll(playlistId, 10, 0);
      songs.value = playlistSongsResponse.data.songs;

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
    if (!text) {
      return '暂无简介';
    }
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
 
    for(let song of songs.value){    
      await playListInfoStore.addPlayListBack(song);    
    }  
    console.log("All songs added to playlist.");    
    // playListInfoStore.isPlaying = true ;  
  }

  const loadMore = async()=>{

    try {
      
      const playlistSongsResponse = await getPlaylistAll(playlistId, 10, currentnums.value);
      currentnums.value += 10 ;
      songs.value.push(...playlistSongsResponse.data.songs);
      if(currentnums.value>=allnums.value){
        isLoadMore.value = true ;
        console.log("currentnums.value",currentnums.value);
        console.log("allnums.value",allnums.value);
        return ;
      }
      console.log(playlistSongsResponse.data.songs);
      console.log(songs.value);

    } catch (error) {
      console.log(error); 
    }
    
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
    text-align: center;
    justify-content: center;
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
    margin-left: 40px;
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
  .song-name{
    width:30%;
    display: flex;
    align-items: center;
  }
  .song-artist{
    width:20%;
    display: flex;
    align-items: center;
  }
  .song-album{
    width:30%;
    display: flex;
    align-items: center;
  }
  .song-time{
    width:10%;
    display: flex;
    align-items: center;
  }
  .playlist-song:hover {
    background-color: #f5f7fa;
  }

  .playlist-songs{
    width: 100%;
  }
</style>