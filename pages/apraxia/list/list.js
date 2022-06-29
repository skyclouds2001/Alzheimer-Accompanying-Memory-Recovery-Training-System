import { request } from '../../../lib/request';

const cookie = 'MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/clientlog;;MUSIC_U=e84478a1b700c4d4f5f33898aa0a24fbcf34cb06c52baf0043bc2c5837c792b6519e07624a9f0053901f8918f05ad12e1901903b05cce24461dafccfd406cc3674816114a4195f687a561ba977ae766d; Max-Age=1296000; Expires=Mon, 23 May 2022 05:06:50 GMT; Path=/;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/openapi/clientlog;;__remember_me=true; Max-Age=1296000; Expires=Mon, 23 May 2022 05:06:50 GMT; Path=/;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/feedback;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/feedback;;__csrf=0a4170624e744ed399f4cadd3fa3939b; Max-Age=1296010; Expires=Mon, 23 May 2022 05:07:00 GMT; Path=/;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/feedback;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/clientlog;;MUSIC_SNS=; Max-Age=0; Expires=Sun, 08 May 2022 05:06:50 GMT; Path=/;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/feedback;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/clientlog;';

const app = getApp();

Page({

  data: {

    /**
     * 歌单歌曲列表
     * @type {Song[]}
     */
    song_array: [],

    /**
     * 歌单名称
     * @type {string}
     */
    name: '',

    /**
     * 歌单图片url
     * @type {string}
     */
    coverImg: '',
  },

  onLoad: async function () {
    const { data: res } = await request({
      url: 'https://api.xaneon.com/playlist/detail',
      method: 'POST',
      data: {
        timestamp: Date.parse(new Date()),
        id: app.globalData.id,
        cookie: cookie,
      },
      header: {
        'Content-Type': 'application/json',
      },
    });
    this.setData({
      song_array: res.playlist.tracks,
      name: res.playlist.name,
      coverImg: res.playlist.coverImgUrl,
    });
  },

  /**
   * 点击详细音乐跳转
   * @function
   * @param {TouchEvent} e 点击事件对象
   * @returns {void}
   */
  handleSong: function (e) {
    app.globalData.song_image = e.currentTarget.dataset.picurl;
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.song.name;
    const singer = e.currentTarget.dataset.song.ar[0].name;
    const album = e.currentTarget.dataset.song.al.name;
    app.globalData.song = e.currentTarget.dataset.song;
    wx.navigateTo({
      url: `../play/play?id=${id}&name=${name}&singer=${singer}&album=${album}`,
    });
  },
});
