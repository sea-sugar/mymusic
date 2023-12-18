<template>
    <div>
        <!-- Picked.vue 精选 -->
        <Banner />
        <Private />
        <DjRecommend />
        <MV />
    </div>
    
</template>

<script setup>
import Banner from '../../index/Banner.vue';
import MV from '../../index/MV.vue';
import Private from './Private.vue';
import DjRecommend from './DjRecommend.vue';
</script>