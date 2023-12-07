<template>
    <div class="video_test">
      <div class="player_audio" >
        <div>
          <button @click="play(true)" v-show="!playing">播放</button>
          <button @click="pause(true)" v-show="playing">暂停</button>
          <button @click="stop" v-show="playing">停止</button>
        </div>
        <div v-show="playing">
          <div>
            音量：
            <input type="range" min="0" max="1" step="0.1" v-model="volume"  @input="volumeChange" />
            <button @click="mute(true)" v-show="!muted">静音</button>
            <button @click="mute(false)" v-show="muted">解除静音</button>
          </div>
          <div>
            播放速度：
            <select @change="rateChange" v-model="rate">
              <option :value ="0.5">0.5</option>
              <option :value ="1.0">1.0</option>
              <option :value ="1.25">1.25</option>
              <option :value ="1.5">1.5</option>
              <option :value ="2.0">2.0</option>
            </select>
          </div>
          <div>
            播放进度条：
            <input type="range" v-model="value" min="0" max="100"  @drag-start="pause" @drag-end="play"  @input="change" />
          </div>
          <button @click="pre">上一首</button>
          <button @click="next">下一首</button>
        </div>
      </div>
    </div>
  </template>
<script>
import {Howl} from 'howler'
export default {
  name:'video-test',
  data() {
    return {
      rate: 1,
      volume: 1,
      audioSrc:[
      "http://m8.music.126.net/20231205003702/f35050bce55273bd49b28f53f6e372d9/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
      ],
      value:0,
      timer:'',
      playing:false,
      currentIndex:0,
      muted:false
    }
  },
  components:{
    // slider
  },
  created() {
  },
  mounted(){
    this.audioPlayer()
  },
  methods: {
    audioPlayer(){
      let that = this
      this.sound = new Howl({
        src: this.audioSrc[this.currentIndex % this.audioSrc.length],
        autoplay: true,
        loop: true,
        volume: this.volume,
        html5: true,
        preload:true,
        rate:this.rate,
        mute:that.muted,
        onload() {
          console.log('onload!',this);
        },
        onplay() {
          that.playing = true
          //that.duration = that.formatTime(Math.round(this._duration));
          that.step()
          console.log('onload!',this);
        },
        onmute() {
          that.muted = this._muted
        },
        onpause() {
          that.playing = false
          that.cancelAF()
        },
        onstop() {
          that.playing = false
          that.setTimerAndValue()
          that.cancelAF()
        },
        onend() {
          console.log('end')
          that.cancelAF()
          that.next()
        },
      });

    },
    formatTime(secs) {
      let minutes = Math.floor(secs / 60) || 0;
      let seconds = (secs - minutes * 60) || 0;
      return minutes + ':' + (seconds < 10 ? '0': '') + seconds;
    },
    play(){
      this.sound.play();
    },
    pause(){
      this.sound.pause()
    },
    stop(){
      this.sound.stop()
    },
    volumeChange(e){
      this.sound.volume(e.target.value)
    },
    mute(boolean){
      this.sound.mute(boolean)
    },
    rateChange(e){
      this.sound.rate(e.target.value)
    },
    pre(){
      this.stop()
      this.currentIndex = this.currentIndex >= 1 ? this.currentIndex - 1 : 0
      this.audioPlayer(this.currentIndex)
      this.play()
    },
    next(){
      this.stop()
      this.currentIndex = this.currentIndex + 1
      this.audioPlayer(this.currentIndex)
      this.play()
    },
    setTimerAndValue(){

      let seek = this.sound.seek();
      if (typeof seek === 'number'){
        this.timer = this.formatTime(Math.round(seek));
        this.value = Math.round((seek / this.sound._duration) * 100) || 0
      }
    },
    step(){
      this.setTimerAndValue()
      this.s = requestAnimationFrame(this.step);
    },

    cancelAF(){
      cancelAnimationFrame(this.s)
    },
    change(e){
      this.sound.seek(this.sound._duration * e.target.value / 100);
      this.setTimerAndValue()
    },

  },
  beforeDestroy(){
    this.cancelAF()
  }
}
</script>
<style scoped>
  .video_test{
    text-align: center;
  }
  .player_audio{
    display: inline-block;
    padding-bottom: 0.3rem;
    text-align: left;
  }
  .player_audio div{
    padding: 0.1rem 0.15rem
  }
</style>
