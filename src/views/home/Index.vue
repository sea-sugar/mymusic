<template>
    <div class="container" v-if="userInfoStore.isLogin">
        <h1>我的歌单</h1>
        <div class="playlist">
          <div class="image-item" v-for="(item, index) in lists" :key="item.id">
            <img :src="item.coverImgUrl" :alt="item.name" @click="goToPlaylist(item.id)"/>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
        

    </div>
    <div class="container" v-else>
        请先点击右上角登录
    </div>
</template>

<script setup>
import { useuserInfoStore } from '../../store/index';
const userInfoStore = useuserInfoStore();

import { ref, onMounted } from 'vue';
import { getUserplaylist } from '../../apis/http';
import router from '../../router/index'

const lists = ref([]);
const uid = ref(0);
const fetchData = async () => {
    if (!localStorage['isLogin']) {
        console.log('没登录');
        return ;
    }
    try {
        console.log('登录了');
        console.log(JSON.parse(localStorage.getItem('userInfo')));
        uid.value = (JSON.parse(localStorage.getItem('userInfo'))).userId;
        const response = await getUserplaylist(uid.value,30,0);
        lists.value = response.data.playlist;
    } catch (error) {
        console.error('Error fetching lists:', error);
    }
};

const goToPlaylist = (playlistId) => {
  router.push(`/playlist?id=${playlistId}`);
};

onMounted(fetchData);
</script>

<style scoped>

/* 果冻效果 */
@keyframes jelly-jump {  
    0% {
        transform: translate(0);
    }
    10% {
        transform: translateY(5px) scale(1.2) scaleY(0.8);
    }
    30% {
        transform: translateY(-13px) scale(1) scaleY(1) rotate(5deg);
    }
    50% {
        transform: translateY(0) scale(1) rotate(0);
    }
    55% {
        transform: translateY(0) scaleX(1.1) scaleY(0.9) rotate(0);
    }
    70% {
        transform: translateY(-4px) scaleX(1) scaleY(1) rotate(0);
    }
    80% {
        transform: translateY(0) scaleX(1) scaleY(1) rotate(0);
    }
    85% {
        transform: translateY(0) scaleX(1.05) scaleY(0.95) rotate(0);
    }
    to {
        transform: translateY(0) scaleX(1) scaleY(1);
    }
}
.container {
  margin: 20px auto;
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.playlist {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}

.image-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-item:hover {
  transform: translateY(-5px);
  animation: jelly-jump 1.2s ease 1;
}

.image-item img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
}


</style>