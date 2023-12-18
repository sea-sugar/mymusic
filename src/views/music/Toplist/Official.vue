<template>
    <div style="display: flex; align-items: center;">
      <h1 style="font-size: 20px;">官方榜</h1>
      <svg t="1702897850207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14512" width="35" height="35"><path d="M644.266667 494.933333l-192 192-29.866667-29.866666 162.133333-162.133334-162.133333-162.133333 29.866667-29.866667 192 192z" fill="#2c2c2c" p-id="14513"></path></svg>
    </div>
    <div class="container">
      <div class="detail" v-for="(list, index) in lists.slice(0, 4)" :key="list.id" @click="goToPlaylist(list)">
        <img :src="list.coverImgUrl" alt="" class="hvr-float-shadow">
        <div class="text">
          <div class="name">{{ list.name }}</div>
          <div class="list" v-if="isfetch && index <= 3" v-for="(t, i) in top3[index]" :key="i">
            <span class="ellipsis">{{ i+1 }}  {{ t.name }} - {{ t.ar[0].name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; align-items: center;">
      <h1 style="font-size: 20px;">特色榜</h1>
      <svg t="1702897850207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14512" width="35" height="35"><path d="M644.266667 494.933333l-192 192-29.866667-29.866666 162.133333-162.133334-162.133333-162.133333 29.866667-29.866667 192 192z" fill="#2c2c2c" p-id="14513"></path></svg>
    </div>
    <div class="ordercontainer">
      <div class="order" v-for="(list, index) in lists.slice(4)" :key="list.id" @click="goToPlaylist(list)">
        <img :src="list.coverImgUrl" alt="" class="hvr-float-shadow">
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
    border-radius: 25px;
    background-color: #dddddd;
  }
  .detail:hover{
    cursor: pointer;

  }
  
  .text {
    width: 100%;

    flex-direction: column;
    display: flex;
    overflow: hidden;
    border-radius: 5%;

  }
  
  .detail img {
    width: 40%;
    height: 40%;
    border-radius: 10%;
    
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
    border-radius: 5%;

    }

    .ordername {
    font-size: 12px;
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
  
/* Float Shadow */
.hvr-float-shadow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-float-shadow:before {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  content: '';
  top: 100%;
  left: 5%;
  height: 10px;
  width: 90%;
  opacity: 0;
  background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
  /* W3C */
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform, opacity;
  transition-property: transform, opacity;
}
.hvr-float-shadow:hover, .hvr-float-shadow:focus, .hvr-float-shadow:active {
  -webkit-transform: translateY(-5px);
  transform: translateY(-5px);
  /* move the element up by 5px */
}
.hvr-float-shadow:hover:before, .hvr-float-shadow:focus:before, .hvr-float-shadow:active:before {
  opacity: 1;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  /* move the element down by 5px (it will stay in place because it's attached to the element that also moves up 5px) */
}

</style>