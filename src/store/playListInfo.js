import { defineStore } from 'pinia';

export const useplayListInfoStore = defineStore('playListInfoStore', {
    state: () => {
        return {
            isPlayed: false,   // 当前是否播放歌曲
            currentMusicId: "",
        }
    },
    getters: {
        getCurrentMusicId(state) {
            return state.currentMusicId;
        },
    },
    actions: {
        setCurrentMusicId(state, musicId) {
            state.currentMusicId = musicId;
        },
        
    }
});
