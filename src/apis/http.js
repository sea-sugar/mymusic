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

// 获取歌曲详情 /song/detail?ids=347230
const getSongDeatil = (ids)=>{
  return instance.get('/song/detail', {
    params: {
      ids: ids
    }
  });
}

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

// 获取 mv 的基本数据 /mv/detail?mvid=10973299 
const getMVDetail = (id) =>{
  return instance.get('/mv/detail',{
    params:{
      mvid:id
    }
  })
}

//获取 mv 地址 /mv/url?id=10896407&r=1080
const getMVurl = (id) =>{
  return instance.get('/mv/url',{
    params:{
      id:id,
      r:'1080'
    }
  })
}

// 独家放送列表 /personalized/privatecontent/list?limit=10&offset=2
const getPrivateContent = (l,o) =>{
  return instance.get('/personalized/privatecontent/list',{
    params:{
      limit:l,
      offset:o,
    }
  })
}

//推荐电台 /dj/recommend
const getDjRecommend = ()=>{
  return instance.get('/dj/recommend');
}

// 所有榜单 /toplist
const getToplist = ()=>{
  return instance.get('/toplist');
}

// 歌手分类列表 /artist/list?type=1&area=96&initial=b  返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
// type 取值:

// -1:全部
// 1:男歌手
// 2:女歌手
// 3:乐队
// area 取值:

// -1:全部
// 7华语
// 96欧美
// 8:日本
// 16韩国
// 0:其他
const getArtistlist = (t,a,i)=>{
  return instance.get('/artist/list',{
    params:{
      type:t,
      area:a,
      initial:i
    }
  });
}

// 歌手热门 50 首歌曲 /artist/top/song?id=6452
const getArtisthotsong = (id)=>{
  return instance.get('/artist/top/song',{
    params:{
      id:id
    }
  })
}

// 歌手全部歌曲 /artist/songs?id=6452
// 必选参数 :id : 歌手 id
// 可选参数 :
// order : hot ,time 按照热门或者时间排序
// limit: 取出歌单数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
const getArtistallsong = (id,ord,l,off) =>{
  return instance.get('/artist/songs',{
    params:{
      id:id,
      order:ord,
      limit:l,
      offset:off
    }
  })
}

// 获取歌手详情 /artist/detail?id=11972054
const getArtistdetail = (id)=>{
  return instance.get('/artist/detail',{
    params:{
      id:id
    }
  })
}

// 歌单分类接口获取(/playlist/catlist)
const getCatlist = ()=>{
  return instance.get('/playlist/highquality/tags')
}

// 获取 查询分类歌单 /top/playlist/highquality?before=1503639064232&limit=3&cat=日语
const getPlaylistcate = (i,or)=>{
  return instance.get('/top/playlist/highquality',{
    params:{
      limit:i,
      before:0,
      cat:or
    }
  })
}

// 获取视频标签列表 /video/group/list
const getVediotags = (i,or)=>{
  return instance.get('/video/group/list')
}

// 获取视频标签/分类下的视频 /video/group?id=9104
const getVediolist = (i)=>{
  return instance.get('/video/group',{
    params:{
      id:i,
      offset:0,
      timestamp :Date.now(),
    }
  })
}

// 二维码 key 生成接口 调用此接口可生成一个 key /login/qr/key
const getKey = (t)=>{
  return instance.get('/login/qr/key',{
    params:{
      timestamp:t
    }
  })
}

// 二维码生成接口 /login/qr/create?key=xxx
const getQr = (i)=>{
  return instance.get('/login/qr/create',{
    params:{
      key:i,
      qrimg:1
    }
  })
}

// 二维码检测扫码状态接口  /login/qr/check?key=xxx
const getCheck = (i,t)=>{
  return instance.get('/login/qr/check',{
    params:{
      key:i,
      timestamp:t
    }
  })
}

//根据返回的cookies，获取用户登录的状态 /login/status 返回 code message
const getLoginstatus = (c) => { 
  return instance.get('/login/status', {
    params:{
      cookie: c,
      timestamp :Date.now(),
    }
  })
}

// 获取账号信息 /user/account
const getAccount = (c) => { 
  return instance.get('/user/account', {
    params:{
      cookie: c,
      timestamp :Date.now(),
    }
  })
}

// 退出登录 /logout
const logout = ()=>{
  return instance.get('/logout');
}


// 获取视频播放地址 /video/url?id=89ADDE33C0AAE8EC14B99F6750DB954D
const getVediourl = (i)=>{
  return instance.get('/video/url',{
    params:{
      id:i
    }
  })
}

// 获取视频详情 /video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D
const getVedioDetail = (i)=>{
  return instance.get('/video/detail',{
    params:{
      id:i
    }
  })
}

// 获取用户歌单 /user/playlist?uid=32953014  limit  offset
const getUserplaylist = (i,l,o)=>{
  return instance.get('/user/playlist',{
    params:{
      uid:i,
      limit:l,
      offset:o
    }
  })
}

// 获取热门搜索列表/search/hot
const searchHot= ()=>{
  return instance.get('/search/hot');
}

// 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单信息 /search/suggest?keywords=海阔天空
const searchSuggest= (k)=>{
  return instance.get('/search/suggest',{
    params:{
      keywords:k
    }
  });
}

// 音乐是否可用  /check/music?id=33894312  //还未使用
const checkMusic= (k)=>{
  return instance.get('/check/music',{
    params:{
      id:k
    }
  });
}

//得该音乐的所有评论 ( 不需要登录 )  /comment/music?id=186016&limit=1
const getComment = (i,o,l)=>{
  return instance.get('/comment/music',{
    params:{
      id:i,
      offset:o,
      limit:l,
    }
  })
}


export {
    getBanner,
    getPersonalized,
    getNewsong,
    getMV,
    getMusic,
    getSongDeatil,
    getPlaylistDetail,
    getPlaylistAll,
    getMVDetail,
    getMVurl,
    getPrivateContent,
    getDjRecommend,
    getToplist,
    getArtistlist,
    getArtisthotsong,
    getArtistallsong,
    getArtistdetail,
    getCatlist,
    getPlaylistcate,
    getVediotags,
    getVediolist,

    getKey,
    getQr,
    getCheck,
    getLoginstatus,
    getAccount,
    logout,
    getUserplaylist,

    getVediourl,
    getVedioDetail,
    searchHot,
    searchSuggest,
    checkMusic,
    getComment
    
}