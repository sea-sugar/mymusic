<template>
  <el-container>
    
    <el-aside>
      <Sidebar/>
    </el-aside>

    <el-container>
      <el-header>
        <Header/>
      </el-header>
  
      <el-main style="left: 200px;">   
        <!-- 主体部分，页面渲染区域 -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>

      </el-main>

      <el-footer>
          <Footer/>
      </el-footer>
    </el-container>

  </el-container>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style scoped>
.el-container {
  height: 100%;
  display: flex;
}

.el-header {
  /* background-color: #c7cfda; */
  color: #333;
  text-align: center;
  line-height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.el-footer {
  /* background-color: #b3c0d1; */
  color: #333;
  text-align: center;
  height: 100px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
}
.el-aside {
  /* background-color: #f4f9fc; */
  color: #333;
  text-align: center;
  height: 100%;
  width:200px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.2);
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
