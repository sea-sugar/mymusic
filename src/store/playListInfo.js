import { defineStore } from 'pinia';
import { getMusic , getSongDeatil } from '../apis/http';
export const useplayListInfoStore = defineStore('playListInfoStore', {
    state: () => {
        return {
            isPlaying: false,   // 当前是否播放歌曲
            currentMusic: null, //当前歌曲信息
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
            try {
                console.log("开始设置当前播放音乐", this.playList);
                const [detailResponse, urlResponse] = await Promise.all([
                  getSongDeatil(music.id),
                  getMusic(music.id, "higher")
                ]);
                const newMusic = { ...detailResponse.data.songs[0] }; 
                const url = urlResponse.data.data[0].url;
                newMusic.url = url;
                this.playList.unshift(newMusic);
                this.currentMusic = newMusic;
                this.playList.shift();

            } catch (error) {
                console.error("Error fetching music:", error);
            }
            console.log("111",this.playList[0]);
            console.log("222",this.currentMusic);
            console.log("333",this.playList);

            
        },
        // 添加音乐到历史播放
        addhistoryList(song){
            this.historyList.unshift(song);
            console.log("acceess addhistoryList",song.name,"添加☞历史播放列表");
        },
        // 添加音乐到当前播放 放最后一个
        async addPlayListBack(song) {
            try {
              const response = await getMusic(song.id, "higher");
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
              const response = await getMusic(song.id, "higher");
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
