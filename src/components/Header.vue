<template>
  <div class="header">
    <!-- 这里可以放一个前进后退的标签管理 -->
    <!-- 搜索框 -->
    <div class="search">
      <!-- <el-input class="search-input" v-model="searchWord" placeholder="请输入歌名、歌词、歌手或专辑" clearable></el-input> -->

      <el-popover
        ref="popover"
        placement="bottom"
        :width="300"
        trigger="click"
        content="暂无搜索建议"
        
        
      >

      <div class="searchlist" v-for="(item,index) in searchHotlist" :key="index" v-if="!isSuggest" @click="handleSelectHot(item)">{{item.first}}</div>
      <!-- <el-divider content-position="left"  v-if="isSuggest">单曲</el-divider> -->
      <div class="searchlist" v-for="(item,index) in searchSuggestsongslist" :key="index" v-if="isSuggest" @click="handleSelectsong(item)">{{item.name}}-{{ item.artists[0].name }} <div style="margin-left: auto;">——单曲</div></div>
      <!-- <el-divider content-position="left"  v-if="isSuggest">歌手</el-divider> -->
      <div class="searchlist" v-for="(item,index) in searchSuggestartistslist" :key="index" v-if="isSuggest" @click="handleSelectartist(item)">{{item.name}} <div style="margin-left: auto; font-size: 12px;">——歌手</div></div>
      <!-- <el-divider content-position="left"  v-if="isSuggest"></el-divider> -->
      <div class="searchlist" v-for="(item,index) in searchSuggestalbumslist" :key="index" v-if="isSuggest" @click="handleSelectalbum(item)">{{item.name}}-{{ item.artist.name }} <div style="margin-left: auto;">——专辑</div></div>
      <!-- <el-divider content-position="left"  v-if="isSuggest">歌单</el-divider> -->
      <div class="searchlist" v-for="(item,index) in searchSuggestplaylist" :key="index" v-if="isSuggest" @click="handleSelectplaylist(item)">{{item.name}} <div style="margin-left: auto; font-size: 12px;">——歌单</div></div>

        <template #reference>
          <el-input class="search-input" v-model="searchWord" @keyup.enter="search" placeholder="请输入歌名、歌词、歌手或专辑" clearable ></el-input>
        </template>
      </el-popover>



      </div>
    <!-- 用户框 -->
    <div class="user-info">
      <div v-if="userInfoStore.isLogin" style=" display: flex; margin-right: 30px;">
        <!-- 用户信息展示 -->
        <!-- <el-avatar :src="userInfoStore.userInfo.avatarUrl" ></el-avatar>
        <span style="font-size: 14px;">{{userInfoStore.userInfo.nickname}}</span> -->
        <div class="github">
          <el-avatar src="/GitHub.svg" alt="GitHub for sea-sugar" @click="openGitHubLink"></el-avatar>
        </div>
        <el-popover
          placement="top-start"
          title="用户信息"
          width="12%"
          height="50%"
          trigger="hover"
          content="UserInfo"
        >
          <div style= " justify-items: center ;">
            <div >生日:{{ timestampToTime(userInfoStore.userInfo.birthday) }}</div>
            <!-- <div >个性签名:{{ userInfoStore.userInfo.signature }}</div> -->
            <div >上次登录ip:{{ userInfoStore.userInfo.lastLoginIP}}</div>
            <div >上次登录时间:{{ timestampToTime(userInfoStore.userInfo.lastLoginTime)}}</div>
          </div>
          
          <el-divider><el-icon><star-filled /></el-icon></el-divider>
          <div @click="out" class="icon"><el-icon  size="20px" ><Promotion /></el-icon><span>退出登录</span></div> 
          <template #reference>
            <div class="logined">
              <el-avatar :src="userInfoStore.userInfo.avatarUrl" ></el-avatar>
              <span style="font-size: 14px;">{{userInfoStore.userInfo.nickname}}</span>
            </div>
          </template>
        </el-popover>

      </div>
      <div v-else style="display: flex; align-items: center;">
        <el-icon><Avatar /></el-icon><el-link :underline="false"  @click="loginHandler">登录</el-link>
      </div>
    </div>
  </div>

  <!-- draggable 弹出框可拖拽 -->
  <el-dialog v-model="showLogin" title="登录" width="30%" draggable>
    <div class="block">
      <div class="demonstration">使用 网易云音乐APP 扫码登录</div>
      <el-image :src="qrurl" @click="Refresh" title="点击刷新" class="qr">
        <template #error>
          <div class="image-slot">
            <el-icon size="100" color="#A8ABB2" ><icon-picture/></el-icon>
          </div>
        </template>
      </el-image>
      <div class="demonstration" @click="loginagain">{{msg}}</div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="showLogin = false">Cancel</el-button>
        <el-button type="primary" @click="showLogin = false">
          Confirm
        </el-button> -->
      </span>
    </template>
  </el-dialog>

  
</template>

<script setup>
import { ref ,watch, onMounted, nextTick,computed} from 'vue';
import { getCheck,getQr,getKey,getLoginstatus,getAccount,logout,searchHot,searchSuggest} from '../apis/http';
import { useuserInfoStore } from "../store/index";
import { Picture as IconPicture ,Avatar} from '@element-plus/icons-vue'
import router from '../router/index'
import { ElNotification } from 'element-plus'
import { useplayListInfoStore } from '../store/index';
const playListInfoStore = useplayListInfoStore()
const userInfoStore = useuserInfoStore();
const searchWord = ref('');
const showLogin = ref(false);
const qrkey = ref('');
const qrurl = ref('');
const msg = ref('');
const qrtime = ref(0);
const searchHotlist = ref([]);
const searchSuggestsongslist = ref([]);
const searchSuggestartistslist = ref([]);
const searchSuggestalbumslist = ref([]);
const searchSuggestplaylist = ref([]);
const isSuggest = ref(false);
const loginHandler = ()=>{
  //打开弹出框
  showLogin.value = true;
  login();
}

const loginsuccess = () => {
  ElNotification({
    message: '登录成功',
    type: 'success',
  })
}

const login = async () => {
  let nowtime = Date.now();
  if((nowtime - qrtime.value) / 1000 > 300){  //超时 或者 第一次登录 
    qrtime.value = nowtime;
    qrkey.value = (await getKey(nowtime)).data.data.unikey;  
    qrurl.value = (await getQr(qrkey.value)).data.data.qrimg;
  }
  console.log('key',qrkey.value);
  console.log('qr', qrurl.value);
  let check = setInterval(async () =>{
    let nowtime2 = Date.now();
    const res = await getCheck(qrkey.value,nowtime2);
    console.log('check',res.data);
    if(res.data.code === 800 ){ //800 为二维码过期  5min的有效期 实践出真知
      console.info(res.data.message);
      msg.value = '二维码已过期，请刷新重试';
      clearInterval(check);
    }
    else if(res.data.code === 801 ){ // 801 为等待扫码 
      console.info(res.data.message);
      msg.value = '请扫码登录';
    }
    else if(res.data.code === 802 ){ // 802 为待确认
      console.info(res.data.message);
      msg.value = '扫码待确认';
    }
    else if(res.data.code === 803 ){ //803 为授权登录成功,会返回 cookies
      console.info(res.data.message);
      msg.value = '登录成功';
      loginsuccess();
      console.log('登录成功的返回的res',res);
      clearInterval(check);
      const resp = await getAccount(res.data.cookie);
      console.log('获取账户信息',resp);
      userInfoStore.isLogin = true ;
      userInfoStore.userInfo = resp.data.profile;
      console.log(userInfoStore.userInfo);
      window.localStorage.setItem('isLogin',true);
      
      // console.log('111',typeof(resp.data.profile)); object  // window.localStorage.setItem('userInfo',resp.data.profile); 错误的
      // console.log('222',typeof(JSON.stringify(resp.data.profile))); string
      window.localStorage.setItem('userInfo',JSON.stringify(resp.data.profile));      
      window.localStorage.setItem('cookie',res.data.cookie);
      console.log("登录成功时的localstorge : ");
      console.log(window.localStorage.getItem('isLogin'));
      console.log(window.localStorage.getItem('userInfo'));
      console.log(window.localStorage.getItem('cookie'));
      showLogin.value = false ; 
      console.log("登录成功");
    }
  },3000);
};

onMounted(async () =>{
  // console.log("挂载时的localstorge : ");
  // console.log(window.localStorage.getItem('isLogin'));
  // console.log(window.localStorage.getItem('userInfo'));
  // console.log(window.localStorage.getItem('cookie'));
  // console.log('localStorage[isLogin]',localStorage['isLogin']);
  if(localStorage['isLogin']){
    const res = await getLoginstatus(localStorage['cookie']);
    console.log("挂载时校验",res);
    if(res.data.data.profile){
      userInfoStore.isLogin = true ;
      userInfoStore.userInfo = res.data.data.profile;
      console.log("挂载的时已经登录");
    }
  }
  const res = await searchHot();
  searchHotlist.value = res.data.result.hots;
  // console.log(searchHotlist.value);

})


const loginagain =()=>{
  if(msg.value === '二维码已过期，请刷新重试'){
    login();
  }
  return ;
}

const size = ref('200px')
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})

/* 时间戳转换为时间 */
const timestampToTime = (timestamp) => {
    timestamp = timestamp ? timestamp : null;
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D ;
}


const logoutsuccess = () => {
  ElNotification({
    message: '账号退出成功',
    type: 'success',
  })
}

const out = async ()=>{
  const res = await logout();
  console.log(res);
  window.localStorage.clear();//清空所有的存储数据
  userInfoStore.isLogin = false;
  userInfoStore.userInfo = null;
  logoutsuccess()
}

watch(searchWord, (newword) => {
  // 监听searchWord变化
  if (newword === '') {
    isSuggest.value = false ;
  }
  remoteMethod(newword);
  console.log("监听searchWord变化为: ",newword);
});

const remoteMethod = async (searchWord)=>{
  console.log("获取新的搜索建议");
  try {
      const res = await searchSuggest(searchWord);
      searchSuggestsongslist.value = [];
      searchSuggestartistslist.value = [];
      searchSuggestalbumslist.value = [];
      searchSuggestplaylist.value = [];
      let temp = res.data.result;
      console.log(res.data);
      console.log(temp);
      if (temp.songs) {
        temp.songs.forEach(song => {
        searchSuggestsongslist.value.push(song);
      });
      }
      if (temp.artists) {
        temp.artists.forEach(song => {
        searchSuggestartistslist.value.push(song);
      });
      }
      if (temp.albums) {
        temp.albums.forEach(song => {
          searchSuggestalbumslist.value.push(song);
      });
      }
      if (temp.playlists) {
        temp.playlists.forEach(song => {
          searchSuggestplaylist.value.push(song);
      });
      }
      isSuggest.value = true;
    } catch (error) {
      console.log('获取新的搜索建议error',error);
    }
  
}

const handleSelectplaylist = (item) =>{
  console.log("handleSelectplaylist",item.name);
  router.push(`/playlist?id=${item.id}`);
  searchWord.value = item.name ;
}

const handleSelectalbum = (item) =>{
  console.log("handleSelectalbum",item.name);
  router.push(`/playlist?id=${item.id}`);
  searchWord.value = item.name + item.artist.name ;
}
const handleSelectartist = (item) =>{
  console.log("handleSelectartist",item.name);
  router.push(`/artistdetail?id=${item.id}`);
  searchWord.value = item.name ;
}

const handleSelectHot = (item) =>{
  console.log("handleSelectHot",item.first);
  searchWord.value = item.first ;
}

const handleSelectsong = (item) =>{
  console.log("handleSelectsong",item.name);
  playListInfoStore.setCurrentMusic(item);
  searchWord.value = item.name + item.artists[0].name ;
}

const search = () =>{
  console.log("好好好你搜索了，但是我没有写！");
}
const Refresh = async()=>{
  qrtime.value = 0;
  login();
}

const openGitHubLink = ()=>{
  window.open('https://github.com/sea-sugar/mymusic', '_blank'); // 替换为您想要跳转的链接  
}

</script>


<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 250px;
  right: 0;
  max-width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.search {
  margin-right: auto;
}
.search-input{
  width:300px;
}
.user-info {
  display: flex;
  align-items: center;
}

.logined {
  margin-left: auto;
  display: flex; 
  align-items: center;
}

.login-btn:hover {
  background-color: #eee;
}

.demo-image__error .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__error .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}


.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.icon{
  text-align: center;
  font-size: 15px;  
}
.icon:hover{
  cursor: pointer;
  text-align: center;
}
.searchlist{
  font-size: 12px;
  display: flex;
  margin: 5px;
  padding: 5px;
}
.searchlist:hover{
  background-color: #d8d2d2;
  cursor: pointer;
}
.qr:hover{
  cursor: pointer;
}

.github{
  margin-right: 30px; 
  align-items: center; 
  display: flex; 
}
.github:hover{
  cursor: pointer;
}
</style>