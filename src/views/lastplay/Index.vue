<template>
    <div class="playlist-songs">
        <h2 >最近播放</h2>
        <div class="playlist-songs-container">
            <div class="song-info">
                <div class="song-name" style="color:darkgray">歌曲名称</div>
                <div class="song-artist" style="color:darkgray">歌手</div>
                <div class="song-album" style="color:darkgray">专辑</div>
                <div class="song-time" style="color:darkgray">歌曲时长</div>
            </div>
          <div
          v-for="song in playListInfoStore.historyList"
          :key="song.id"
          class="playlist-song"
          >
          <div class="song-info">
              <div class="song-name">{{ song.name }}</div>
              <div class="song-artist">{{ song.ar[0].name }}</div>
              <div class="song-album">{{ song.al.name }}</div>
              <div class="song-time">{{ formattedTime(song.dt) }}</div>
          </div>
          </div>
        </div>
    </div>
</template>

<script setup>
import { useplayListInfoStore } from '../../store/index';
const playListInfoStore = useplayListInfoStore();

console.log(playListInfoStore.historyList);

const formattedTime = (duration) => {
    const minutes = Math.floor(duration / 1000 / 60);
    const seconds = Math.floor((duration / 1000) % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

</script>


<style scoped>
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
  .playlist-song:hover {
    background-color: #f5f7fa;
  }

  .playlist-songs{
    width: 100%;
  }

</style>