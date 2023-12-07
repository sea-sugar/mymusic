<template>
    <div class="container" part="container">
      <div class="label">label</div>
      <div class="operate">
        <div class="operate-seq">
          <img src="/prev.svg" title="上一首">
          <img src="/play.svg" title="播放" @click="toggleAudio">
          <img src="/next.svg" title="下一首" @click="next">
        </div>
        <div class="operate-time">
          <output class="time-current">{{ formatTime(currentTime) }}</output>
          <input type="range" v-model="progress" class="time-range" min="0" step="0.001" max="1" @input="seekAudio">
          <output class="time-total">{{ formatTime(totalTime) }}</output>
        </div>
        <div class="operate-volume">
          <img src="/muted.svg" title="静音" @click="toggleMute">
          <input class="volume-range" type="range" v-model="volume" min="0" step="0.01" max="1">
        </div>
        <!-- 其他操作区代码 -->
      </div>
    </div>
</template>
  
<script setup>
    import { Howl, Howler } from 'howler';
    import { onMounted, ref, watch } from "vue";
    const playlist = [
        'http://m702.music.126.net/20231206194029/b8196b95c195e6ab8cdc852895c639de/jd-musicrep-ts/6269/cb92/f918/d859a5152659296b2f23e273c7303988.mp3',
        'http://m801.music.126.net/20231206200534/56c210694b89a5675f4bc8136bb739e4/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/28481675631/f606/2c21/7810/08f72d2b021e58bc0d9f4fefc43b0deb.mp3'
        ];

    const currentIndex = ref(0);
    
    const sound = new Howl({
        src: playlist[currentIndex.value],
        html5: true,
        volume: 0.5,
        preload:true,
    });
    
    const currentTime = ref(0);
    const totalTime = ref(0);
    const progress = ref(0);
    const volume = ref(0.5);
    const isMuted = ref(false);
    const pausedPosition = ref(0);
    
    sound.on('end', function() {
        console.log('播放结束！');
    });
    
    // 监听音频加载完成事件
    sound.on('load', function() {
        totalTime.value = sound.duration();
        console.log("音频加载成功");
        // console.log("totalTime.value is",totalTime.value);
    });
  
    // 监听音频时间更新事件
    sound.on('play', function() {
    const updateProgress = () => {
        currentTime.value = sound.seek();
        progress.value = currentTime.value / totalTime.value;
        if (sound.playing()) {
        requestAnimationFrame(updateProgress);
        }
    };
    updateProgress();
    });    

    // 播放/暂停音频
    function toggleAudio() {
    if (sound.playing()) {
        // 暂停音频，并记录当前播放位置
        sound.pause();
        pausedPosition.value = sound.seek();
        console.log('暂停');
    } else {
        // 继续播放音频，从暂停的位置开始
        sound.seek(pausedPosition.value);
        sound.play();
        console.log('播放');
    }
    }
    // 跳转到指定时间
    function seekAudio() {
        const seekTime = totalTime.value * progress.value;
        sound.seek(seekTime);
        console.log('跳转到时间：', seekTime);
    }
    
    // 切换静音状态
    function toggleMute() {
        isMuted.value = !isMuted.value;
        sound.mute(isMuted.value);
        console.log(isMuted.value ? '静音' : '取消静音');
    }
    
    // 格式化时间
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        return formattedTime;
    }
    
    // 监听音量变化
    watch(volume, (newVolume) => {
        sound.volume(newVolume);
        console.log('音量：', newVolume);
    });
    const next = () => {
        if (sound.playing()) {
            sound.pause();
        }
        sound.unload();

        currentIndex.value = (currentIndex.value + 1) % playlist.length;

        sound = new Howl({
            src: playlist[currentIndex.value],
            html5: true,
            volume: volume.value,
            preload: true,
        });

        sound.once('load', () => {
            sound.play();
            console.log("下一首");
        });
    }
    // 在组件加载完成后自动播放音频
    //   onMounted(() => {
    //     sound.play();
    //     console.log('播放');
    //   });
    

</script>

<style scoped>
            /* :host {
                --1rem: 1rem;
                --ui-audio-icon-prev: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M341.333 746.667A21.333 21.333 0 0 1 320 768h-42.667A21.333 21.333 0 0 1 256 746.667V277.333A21.333 21.333 0 0 1 277.333 256H320a21.333 21.333 0 0 1 21.333 21.333zM768 280.32a32.853 32.853 0 0 0-15.787-27.733l-5.12-2.56a31.147 31.147 0 0 0-34.133 0L398.507 472.32a32 32 0 0 0-13.654 26.027V524.8a32 32 0 0 0 13.654 26.027L712.96 771.84a31.147 31.147 0 0 0 34.133 0l5.12-2.56A32.427 32.427 0 0 0 768 741.547z'/%3E%3C/svg%3E");
                --ui-audio-icon-next: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M768 277.333v469.334A21.333 21.333 0 0 1 746.667 768H704a21.333 21.333 0 0 1-21.333-21.333V277.333A21.333 21.333 0 0 1 704 256h42.667A21.333 21.333 0 0 1 768 277.333zm-456.96-25.6a31.147 31.147 0 0 0-34.133 0l-5.12 2.56A32.427 32.427 0 0 0 256 280.32v462.933a32.853 32.853 0 0 0 15.787 27.734l5.12 2.56a32 32 0 0 0 34.133 0l314.453-221.014a32 32 0 0 0 13.654-26.026v-26.454a32 32 0 0 0-13.654-26.026z'/%3E%3C/svg%3E");
                --ui-audio-icon-play: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M768 506.027v11.946a32.427 32.427 0 0 1-15.787 27.734L370.347 768c-23.04 13.653-34.987 13.653-45.227 7.68l-10.667-5.973a32.427 32.427 0 0 1-15.786-26.88V281.173a32.427 32.427 0 0 1 15.786-27.733l10.667-5.973c10.24-5.974 22.187-5.974 52.053 11.52l375.04 219.306A32.427 32.427 0 0 1 768 506.027z'/%3E%3C/svg%3E");
                --ui-audio-icon-pause: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M426.667 288v448a32.427 32.427 0 0 1-32 32h-64a32.427 32.427 0 0 1-32-32V288a32.427 32.427 0 0 1 32-32h64a32.427 32.427 0 0 1 32 32zm266.666-32h-64a32.427 32.427 0 0 0-32 32v448a32.427 32.427 0 0 0 32 32h64a32.427 32.427 0 0 0 32-32V288a32.427 32.427 0 0 0-32-32z'/%3E%3C/svg%3E");
                --ui-audio-icon-muted: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M554.667 213.333v597.334A42.667 42.667 0 0 1 512 853.333h-25.173a42.667 42.667 0 0 1-29.867-12.373L293.547 677.547A128 128 0 0 0 203.093 640 75.093 75.093 0 0 1 128 564.907V459.093A75.093 75.093 0 0 1 203.093 384a128 128 0 0 0 90.454-37.547L456.96 183.04a42.667 42.667 0 0 1 29.867-12.373H512a42.667 42.667 0 0 1 42.667 42.666zM820.907 512l68.693-69.12a20.48 20.48 0 0 0 0-29.867L866.987 390.4a20.48 20.48 0 0 0-29.867 0L768 459.093 698.88 390.4a20.48 20.48 0 0 0-29.867 0L646.4 413.013a20.48 20.48 0 0 0 0 29.867L715.093 512 646.4 581.12a20.48 20.48 0 0 0 0 29.867l22.613 22.613a20.48 20.48 0 0 0 29.867 0L768 564.907l69.12 68.693a20.48 20.48 0 0 0 29.867 0l22.613-22.613a20.48 20.48 0 0 0 0-29.867z'/%3E%3C/svg%3E");
                --ui-audio-icon-unmuted: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M554.667 213.333v597.334A42.667 42.667 0 0 1 512 853.333h-25.173a42.667 42.667 0 0 1-29.867-12.373L293.547 677.547A128 128 0 0 0 203.093 640 75.093 75.093 0 0 1 128 564.907V459.093A75.093 75.093 0 0 1 203.093 384a128 128 0 0 0 90.454-37.547L456.96 183.04a42.667 42.667 0 0 1 29.867-12.373H512a42.667 42.667 0 0 1 42.667 42.666zm256 73.814a24.747 24.747 0 0 0-15.36-7.254 21.333 21.333 0 0 0-15.787 6.4l-30.293 30.294a21.333 21.333 0 0 0 0 29.013 256 256 0 0 1 0 332.8 21.333 21.333 0 0 0 0 29.013l30.293 30.294a21.333 21.333 0 0 0 15.787 6.4 23.893 23.893 0 0 0 15.36-7.254 341.333 341.333 0 0 0 0-449.706zM675.84 401.067a22.613 22.613 0 0 0-16.64 6.4l-30.293 30.72a21.333 21.333 0 0 0-2.987 26.88 85.333 85.333 0 0 1 0 93.866 21.333 21.333 0 0 0 2.987 26.88l30.293 30.72a22.187 22.187 0 0 0 16.64 5.974 22.187 22.187 0 0 0 15.787-8.107 170.667 170.667 0 0 0 0-204.8 24.32 24.32 0 0 0-15.787-8.533z'/%3E%3C/svg%3E");
                --ui-audio-icon-more: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M426.667 256A85.333 85.333 0 1 1 512 341.333 85.333 85.333 0 0 1 426.667 256zM512 426.667A85.333 85.333 0 1 0 597.333 512 85.333 85.333 0 0 0 512 426.667zm0 256A85.333 85.333 0 1 0 597.333 768 85.333 85.333 0 0 0 512 682.667z'/%3E%3C/svg%3E");
                --ui-audio-icon-shuffle: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M416.853 624.64l-80.64 81.067A213.333 213.333 0 0 1 185.173 768h-35.84A21.333 21.333 0 0 1 128 746.667V704a21.333 21.333 0 0 1 21.333-21.333h35.84a128 128 0 0 0 90.454-37.547l81.066-80.64zm185.6 81.067a215.893 215.893 0 0 0 122.88 59.733v87.893a21.333 21.333 0 0 0 36.267 14.934l128-128a21.76 21.76 0 0 0 0-30.294l-128-128a21.333 21.333 0 0 0-36.267 15.36v81.92a128 128 0 0 1-62.293-34.133L529.493 512 663.04 378.88a128 128 0 0 1 62.293-34.133v81.92A21.333 21.333 0 0 0 761.6 441.6l128-128a21.76 21.76 0 0 0 0-30.293l-128-128a21.333 21.333 0 0 0-36.267 15.36v87.893a215.893 215.893 0 0 0-122.88 59.733L469.333 451.84l-133.12-133.547A213.333 213.333 0 0 0 185.173 256h-35.84A21.333 21.333 0 0 0 128 277.333V320a21.333 21.333 0 0 0 21.333 21.333h35.84a128 128 0 0 1 90.454 37.547z'/%3E%3C/svg%3E");
                --ui-audio-icon-swap: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M298.667 810.667a170.667 170.667 0 0 1 0-341.334h426.666a85.333 85.333 0 0 0 0-170.666H256V384a21.333 21.333 0 0 1-36.267 14.933l-128-128a21.76 21.76 0 0 1 0-30.293l128-128A21.333 21.333 0 0 1 256 128v85.333h469.333a170.667 170.667 0 0 1 0 341.334H298.667a85.333 85.333 0 0 0 0 170.666H768V640a21.333 21.333 0 0 1 36.267-15.36l128 128a21.76 21.76 0 0 1 0 30.293l-128 128A21.333 21.333 0 0 1 768 896v-85.333z'/%3E%3C/svg%3E");
                --ui-audio-icon-repeat: url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M810.667 533.333v192a85.333 85.333 0 0 1-85.334 85.334H298.667V896a21.333 21.333 0 0 1-36.267 15.36l-128-128a21.76 21.76 0 0 1 0-30.293l128-128A21.333 21.333 0 0 1 298.667 640v85.333h426.666v-192A21.333 21.333 0 0 1 746.667 512h42.666a21.333 21.333 0 0 1 21.334 21.333zm79.36-292.693l-128-128A21.333 21.333 0 0 0 725.333 128v85.333H298.667a85.333 85.333 0 0 0-85.334 85.334v192A21.333 21.333 0 0 0 234.667 512h42.666a21.333 21.333 0 0 0 21.334-21.333v-192h426.666V384a21.333 21.333 0 0 0 36.267 15.36l128-128a21.76 21.76 0 0 0 .427-30.72z'/%3E%3C/svg%3E");
            } */

    .container {
        display: grid;
        height: 100px;
        width: 100%;
        border-radius: .5em;
        background:  #333;
        color:  #ddd;
    }
    .label {
        font-size: 16px;
        color: #999;
    }
    .label::before {
        content: '正在播放：';
        color: #999;
    }
    .label:empty {
        display: none;
    }
    .operate {
        display: flex;
        align-items: center;
    }
    .operate-time,
    .time-range {
        flex: 1;
    }

           
    .operate-seq {
        flex: none;
    }
    .operate-time {
        display: flex;
        align-items: center;
        margin: 0 1em;
    }
    .operate-time output {
        flex: 0 0 5ch;
        font-size: 75%;
    }

    /*自定义type=range的元素  */
    [type="range"] {
        -webkit-appearance: none;/*移除浏览器默认样式 */
        appearance: none; /*移除浏览器默认样式 */
        margin: 0;
        outline: 0;
        background-color: transparent; /*滑块背景透明 */
        font-size: 16px;
    }
    /*设置滑块背景 */
    ::-webkit-slider-container {
        display: flex;
        height: 1em;
        overflow: hidden;
    }
    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background-color: #fff;
        width: .75em;
        height: .75em;
        border-radius: 50%;
        margin-top: -.25em;
        border-image: linear-gradient(#f44336, #f44336) 0 fill / .25em .75em .25em 0 / 0 0 0 2000px;
    }
    ::-webkit-slider-runnable-track {
        height: .25em;
        background: #ccc;
    }
    ::-moz-range-track {
        background: #ccc;
        height: .25em;
    }            
    ::-moz-range-progress {
        background: linear-gradient(#f44336, #f44336);
        height: .25em;
    }
    ::-moz-range-thumb {
        border: 0;
        background-color: #fff;
        width: .75em;
        height: .75em;
        border-radius: 50%;
        margin-top: -.25em;
    }
    .time-range {  margin: 0 .25em; }
    .time-total { text-align: right; }
    .operate-volume { display: flex; align-items: center; }
    .volume-range { width: 7.5em; }
    select { position: absolute; }
    .rate {
        padding: 0;
        border: 0;
        background: rgba(0,0,0,.35);
        color: inherit;
        width: 55px;
        height: 30px;
        border-radius: 8px;
        margin: 0 .5em 0 1em;
        box-shadow: 0 1px #666, 0 -1px #000;
        font-size: 16px;
    }
    
    select {
        position: absolute;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
    }
    .select-loop {
        height: calc(2.5 * var(--1rem));
        width: 60px;
    }
</style>