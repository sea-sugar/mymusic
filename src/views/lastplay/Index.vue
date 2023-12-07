<template>
    <div class="playlist-songs">
        <h2 >最近播放</h2>
        <div class="playlist-songs-container">
            <div class="song-info">
                <div class="song-name">歌曲名称</div>
                <div class="song-artist">歌手</div>
                <div class="song-album">专辑</div>
                <div class="song-time">歌曲时长</div>
            </div>
          <div
          v-for="song in playListInfoStore.historyList"
          :key="song.id"
          class="playlist-song"
          >
          <div class="song-info">
              <!-- <div class="song-name">{{ song.name }}</div>
              <div class="song-artist">{{ song.ar[0].name }}</div>
              <div class="song-album">{{ song.al.name }}</div>
              <div class="song-time">{{ formattedTime(song.dt) }}</div> -->
              {{song}}
          </div>
          </div>
        </div>
    </div>
</template>

<script setup>
import { useplayListInfoStore } from '../../store/index';
const playListInfoStore = useplayListInfoStore();


</script>

<style>
  .playlist-songs{
    width: 100%;
  }
  .song-info {
    flex: 1;
    margin-left: 10px;
    display: flex;
    justify-content: space-between;

    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;

  }
</style>