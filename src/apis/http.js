import instance from './instance';

// 首页轮播图--Banner.vue
const getBanner = () => { return instance.get('/banner', {})};


//推荐歌单--HotPlaylist.vue
const getPersonalized = () =>{ return instance.get('/personalized', {})}

const getNewsong = () =>{ return instance.get('/personalized/newsong', {})}



export {
    getBanner,
    getPersonalized,
    getNewsong
}