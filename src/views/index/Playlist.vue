<template>
    <el-main>
      <div class="playlist-details">
        <div class="playlist-header">
          <img :src="coverImgUrl" alt="Playlist Cover" class="playlist-cover" />
          <div class="playlist-info">
            <h1 class="playlist-name">{{ name }}</h1>
            <div class="playlist-creator">
              <el-avatar :src="creator.avatarUrl"></el-avatar>
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
        <div class="playlist-songs">
          <h2 class="playlist-songs-title">Songs</h2>
          <div class="playlist-songs-container">
            <div
              v-for="song in songs"
              :key="song.id"
              class="playlist-song"
              @mouseover="handleMouseOver(song)"
              @mouseout="handleMouseOut"
            >
              <div class="song-info">
                <div class="song-name">{{ song.name }}</div>
                <div class="song-details">
                  <span class="song-artist">{{ song.ar.name }}</span>
                  <span class="song-album">{{ song.al.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </template>
  
  <script setup>
  import { ref, onMounted,computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { getPlaylistAll, getPlaylistDetail } from "../../apis/http";
  
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
  
  onMounted(async () => {
    try {
      // 获取歌单详情
      const playlistDetailResponse = await getPlaylistDetail(playlistId);
      const playlistDetail = playlistDetailResponse.data.playlist;
  
      name.value = playlistDetail.name;
      coverImgUrl.value = playlistDetail.coverImgUrl;
      creator.value = playlistDetail.creator;
      description.value = playlistDetail.description;
      collapsedDescription.value = truncateDescription(description.value, 100); // 修改部分
  
      tags.value = playlistDetail.tags;
  
      // 获取歌单全部歌曲
      const playlistSongsResponse = await getPlaylistAll(playlistId, 10, 1);
      songs.value = playlistSongsResponse.data.songs;
    } catch (error) {
      console.error(error);
    }
  });
  
  const handleMouseOver = (song) => {
    // 处理鼠标悬停事件
    // 例如显示歌曲的更多信息或添加悬停样式
    song.isHovered = true;
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
  
  </script>
  
  <style scoped>
  .playlist-details {
    max-width: 800px;
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
  
  .playlist-songs-title {
    font-size: 18px;
    margin-bottom: 10px;
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
  }
  
  .song-name {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .song-details {
    font-size: 12px;
    color: #999;
  }
  
  .song-artist {
    margin-right: 5px;
  }
  
  .song-album {
    margin-left: 5px;
  }
  
  .playlist-song:hover {
    background-color: #f5f7fa;
  }
  </style>