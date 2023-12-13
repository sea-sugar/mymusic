<template>
    <p>home</p>
    <div class="container" v-if="userInfoStore.isLogin">
        我的歌单
        <el-row :gutter="10" justify="space-between">
          <el-col v-for="(item, index) in lists" :key="item.id" :span="2">
            <div class="image-item">
              <img :src="item.coverImgUrl" :alt="item.name" @click="goToPlaylist(item.id)"/>
              <div class="name">{{ item.name }}</div>
            </div>
          </el-col>
      </el-row>

    </div>
    <div class="container" v-else>
        请先登录
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
.container {
  max-width: 100%;
  overflow: hidden;
  justify-content: space-between;
}

.image-item {
  cursor: pointer;
  width: 100%; 
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; 
  align-items: center; 
}

.image-item img {
  width: 100%;
  height: auto;
}

.name {
  text-align: center; /* 居中显示名称 */
  margin-top: 5px; /* 调整名称与图片的间距 */
  font-size:11px;
}
.image-item img:hover{
  filter: brightness(75%);
}
.image-item:hover{
  font-weight: bold;
}
</style>