import { defineStore } from 'pinia';
import { getMusic } from '../apis/http';
export const useplayListInfoStore = defineStore('playListInfoStore', {
    state: () => {
        return {
            isPlaying: false,   // 当前是否播放歌曲
            currentMusic:{}, //当前歌曲信息
            playList:[],//正在播放列表
            historyList:[],//播放历史列表
        }
    },
    getters: {
        getCurrentMusic(state) {
            return state.currentMusic;
        },
    },
    actions: {
        //设置播放暂停
        setisPlaying(){
            this.isPlaying=!isPlaying;
        },
        //设置当前播放音乐
        async setCurrentMusic(music) {
            // await this.addPlayListFront(music);
            // console.log("当前播放音乐：",music.name,music.id,music.url);
            getMusic(music.id, "exhigh")
            .then(response => {
              const url = response.data.data[0].url; 
              this.currentMusic = music;
              this.currentMusic.url = url;
              console.log("当前播放音乐：",music.name,music.id,music.url);
            })
            .catch(error => {
              console.error("Error fetching music:", error);
            });
        },
        // 添加音乐到历史播放
        addhistoryList(song){
            this.historyList.unshift(song);
            console.log("acceess addhistoryList",song.name,"添加☞历史播放列表");
        },
        // 添加音乐到当前播放 放最后一个
        async addPlayListBack(song) {
            try {
              const response = await getMusic(song.id, "exhigh");
              const url = response.data.data[0].url;
              this.playList.push(song);
              this.playList[this.playList.length - 1].url = url;
              console.log("Access addPlayListBack", song.name, "添加☞播放列表");
            } catch (error) {
              console.error("Error fetching music:", error);
            }
        },
        // 添加音乐到当前播放 放第一个
        async addPlayListFront(song) {
            try {
              const response = await getMusic(song.id, "exhigh");
              const url = response.data.data[0].url;
              this.playList.unshift(song);
              this.playList[0].url = url;
              console.log("Access addPlayListFront", song.name, "添加☞播放列表");
            } catch (error) {
              console.error("Error fetching music:", error);
            }
        },
        // 删除历史播放第一个id
        delhistoryList(){
            this.historyList.shift();
        },
        // 删除播放列表第一个id
        delplayList(){
            this.playList.shift();
        },
        // 重置
        reset(){
            this.isPlaying= false;   
            this.currentMusic={};
            this.playList=[];
            this.historyList=[];
        },
        test(){
            console.log("currentMusic is",this.currentMusic);
            console.log("playList:[] is",this.playList);
            console.log("historyList:[] is",this.historyList);
        }


        
    }
});
