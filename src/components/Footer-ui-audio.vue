<template>
    <ui-audio
    :key="src"
    :label="lable"
    :prevsrc="prevsrc"
    :src="src"
    :nextsrc="nextsrc"
    controls
    ></ui-audio>
</template>
<!-- 播放单曲 1901371647 孤勇者
播放单曲 1940109458 云还在唱歌
播放单曲 1811921555 星辰大海 -->

<!-- prevsrc="http://m802.music.126.net/20231205123314/c17d0a3a59f7fa774a21647d26169b5b/jd-musicrep-ts/5fd8/e5e9/c086/3dd9c911a0a8a933679c4f51392570d6.mp3" 
src="http://m701.music.126.net/20231205123350/094e88f5d2ca98cb77fe1d9b9972adce/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14047864595/91d6/bbb8/8fa1/8fada29d2931e504b8bb3fc0a453618c.mp3" 
nextsrc="http://m802.music.126.net/20231205123417/13567a764938f495b9aa13f642703f95/jd-musicrep-ts/e486/b782/9c1d/e69c7a226f503b54caead52bfc730f88.mp3" -->
<script setup>
import  './ui-audio';
import { ref,watch ,onMounted} from 'vue';
import { useplayListInfoStore } from '../store/index';
const playListInfoStore = useplayListInfoStore();

const audio = document.querySelector('ui-audio');

const prevsrc = ref('')
const src = ref('')
const nextsrc = ref('')
const lable = ref('')

// 监听 currentMusic 的变化
watch(() => playListInfoStore.getCurrentMusic, (newmusic,oldmusic) => {
    lable.value=newmusic.name;
    src.value=newmusic.url;
    console.log("111",playListInfoStore.playList);
    // console.log("-----------");
    // console.log("222",playListInfoStore.test());
    // console.log("-----------");
    nextsrc.value=playListInfoStore.playList[0].url;
    console.log("next",nextsrc.value);
    // prevsrc.value=playListInfoStore.historyList[0].url;
    console.log("prev",prevsrc.value);
    console.log("切换歌曲",src.value);
});

</script>