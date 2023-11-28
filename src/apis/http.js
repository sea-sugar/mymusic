import instance from './instance';

// 首页轮播图--Banner.vue
const getBanner = () => { return instance.get('/banner', {})};


//推荐歌单--HotPlaylist.vue
const getPersonalized = () =>{ return instance.get('/personalized', {})}

//推荐新音乐--Newsong.vue
const getNewsong = () =>{ return instance.get('/personalized/newsong', {})}

//推荐 mv
const getMV = () =>{ return instance.get('/personalized/mv', {})}

//获取音乐Url  /song/url/v1?id=33894312&level=exhigh
//必选参数 : id : 音乐 id level: 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
const getMusic = (id,level) =>{ return instance.get('/song/url/v1', { params: {
    id: id,
    level: level
  }}
)}

//获取歌单详情  /playlist/detail?id=24381616
const getPlaylistDetail = (id) => {
  return instance.get('/playlist/detail', {
    params: {
      id: id
    }
  });
};

//获取歌单所有歌曲 /playlist/track/all?id=24381616&limit=10&offset=1
const getPlaylistAll = (id, limit, offset) => {
  return instance.get('/playlist/track/all', {
    params: {
      id: id,
      limit: limit,
      offset: offset
    }
  });
};

export {
    getBanner,
    getPersonalized,
    getNewsong,
    getMV,
    getMusic,
    getPlaylistDetail,
    getPlaylistAll,
}