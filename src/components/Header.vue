<template>
  <div class="header">
    <!-- 这里可以放一个前进后退的标签管理 -->
    <!-- 搜索框 -->
    <div class="search">
      <el-input class="search-input" v-model="searchWord" placeholder="请输入歌名、歌词、歌手或专辑" clearable></el-input>
    </div>
    <!-- 用户框 -->
    <div class="user-info">
      <div class="logined" v-if="isLogin">
        <!-- 用户信息展示 -->

        <el-avatar src="http://p1.music.126.net/33lWFJXzotUZ27mjk8PCfw==/109951169071632851.jpg" ></el-avatar>
        <span>海棠花未眠</span>
        <!-- <el-image :src="accountInfo.avatarUrl" class="avatar"></el-image>
        <span class="username">{{ accountInfo.avatarName }}</span> -->
      </div>
      <div v-else>
        <span class="login-btn" @click="loginHandler">登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref ,watch} from 'vue';

const searchWord = ref('');
const isLogin = ref(false);

const loginHandler = () => {
  isLogin.value=true;
  console.log("登录成功");
};
watch(isLogin, () => {
  // 在 isLogin 状态变化时触发，用于手动更新相关内容的显示
});
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
}
.login-btn {
  cursor: pointer;
}

.login-btn:hover {
  background-color: #eee;
}
</style>