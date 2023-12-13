<template>
    <h1>官方榜</h1>
    <div class="container">
      <div class="detail" v-for="(list, index) in lists.slice(0, 4)" :key="list.id" @click="goToPlaylist(list)">
        <img :src="list.coverImgUrl" alt="">
        <div class="text">
          <div class="name">{{ list.name }}</div>
          <div class="list" v-if="isfetch && index <= 3" v-for="(t, i) in top3[index]" :key="i">
            <span class="ellipsis">{{ i+1 }}  {{ t.name }} - {{ t.ar[0].name }}</span>
          </div>
        </div>
      </div>
    </div>
    <h1>特色榜</h1>
    <div class="ordercontainer">
      <div class="order" v-for="(list, index) in lists.slice(4)" :key="list.id" @click="goToPlaylist(list)">
        <img :src="list.coverImgUrl" alt="">
        <div class="ordername">{{ list.name }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { getToplist, getPlaylistAll } from '../../../apis/http';
  import { onMounted, ref, nextTick } from 'vue';
  import router from '../../../router/index'

  const lists = ref([]); // 榜单数据
  const top3 = ref([]); // 前三数据
  const isfetch = ref(false);
  
  const fetchData = async () => {
    try {
      const res = await getToplist();
      lists.value = res.data.list;
  
      for (const item of lists.value.slice(0, 4)) {
        const ress = await getPlaylistAll(item.id, 3, 0);
        top3.value.push(ress.data.songs.slice(0, 3));
      }
  
      await nextTick();
      isfetch.value = true;
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };
  
  const goToPlaylist = (item)=>{
    router.push(`/playlist?id=${item.id}`);
  }
  onMounted(fetchData);
  </script>
  
  <style scoped>
  .container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .detail {
    display: flex;
    width: 23%;
    margin-bottom: 20px;
  }
  .detail:hover{
    cursor: pointer;
  }
  
  .text {
    width: 100%;
    background-color: #c9c3c3;
    flex-direction: column;
    display: flex;
    overflow: hidden;
  }
  
  .detail img {
    width: 40%;
    height: 40%;
  }
  
  .name {
    margin-left: 6%;
    margin-bottom: 7%;
    font-size: 20px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .list {

    margin-left: 5%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .ellipsis {
    font-size: 12px;
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: hidden;
  }
  .ordercontainer{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    
  }
    .order {
    width: 7%;
    margin-bottom: 20px;
    margin-right:2% ;
    }
    .order:hover{
        cursor: pointer;
    }
  .order img {
    width: 100%;
    height: auto;
    }

    .ordername {
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
  h1 {
    margin-bottom: 20px;
  }
</style>