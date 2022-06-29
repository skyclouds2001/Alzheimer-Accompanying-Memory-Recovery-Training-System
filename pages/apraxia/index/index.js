import { request } from '../../../lib/request';

const cookie = 'MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/clientlog;;MUSIC_U=e84478a1b700c4d4f5f33898aa0a24fbcf34cb06c52baf0043bc2c5837c792b6519e07624a9f0053901f8918f05ad12e1901903b05cce24461dafccfd406cc3674816114a4195f687a561ba977ae766d; Max-Age=1296000; Expires=Mon, 23 May 2022 05:06:50 GMT; Path=/;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/openapi/clientlog;;__remember_me=true; Max-Age=1296000; Expires=Mon, 23 May 2022 05:06:50 GMT; Path=/;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/feedback;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/feedback;;__csrf=0a4170624e744ed399f4cadd3fa3939b; Max-Age=1296010; Expires=Mon, 23 May 2022 05:07:00 GMT; Path=/;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/feedback;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/clientlog;;MUSIC_SNS=; Max-Age=0; Expires=Sun, 08 May 2022 05:06:50 GMT; Path=/;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/feedback;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/wapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/api/clientlog;;MUSIC_R_T=1638277100823; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/eapi/feedback;;MUSIC_A_T=1638277100672; Max-Age=2147483647; Expires=Fri, 26 May 2090 08:20:57 GMT; Path=/weapi/clientlog;';

/**
 * @typedef timestamp
 * @type {number}
 */
/**
 * @typedef Song
 * @type {Object}
 * @property {string} alg
 * @property {boolean} canDislike
 * @property {string} copywriter
 * @property {boolean} highQuality
 * @property {number} id
 * @property {string} name
 * @property {string} picUrl
 * @property {number} playCount
 * @property {number} trackCount
 * @property {timestamp} trackNumberUpdateTime
 * @property {number} type
 */

const app = getApp();

Page({

  data: {
    /**
     * 歌曲列表1
     * @type {Song[]}
     */
    array1: [],

    /**
     * 歌曲列表2
     * @type {Song[]}
     */
    array2: [],
  },

  onLoad: async function () {
    const { data: res1 } = await request({
      url: 'https://api.xaneon.com/cloudsearch',
      method: 'POST',
      data: {
        cookie: cookie,
        keywords: '阿尔法脑波音乐',
        type: 1000,
        timestamp: 1503019930000,
      },
      header: {
        'Content-Type': 'application/json',
      },
    });
    const { data: res2 } = await request({
      url: 'https://api.xaneon.com/cloudsearch',
      method: 'POST',
      data: {
        cookie: cookie,
        keywords: '脑部治疗',
        type: 1000,
        timestamp: 1503019930011,
      },
      header: {
        'Content-Type': 'application/json', // 默认值
      },
    });
    this.setData({
      array1: res1.result.playlists.slice(0, 2),
      array2: res2.result.playlists.slice(0, 2),
    });
  },

  /**
   * 跳转至歌曲详情页
   * @param {TouchEvent} e
   * @returns {void}
   */
  handleItem (e) {
    const { id } = e.currentTarget.dataset;
    app.globalData.id = id;
    wx.navigateTo({
      url: `../list/list?listid=${id}`,
    });
  },

  /**
   * 跳转至我的喜欢歌曲页
   * @returns {void}
   */
  handleMySongs () {
    wx.navigateTo({
      url: '../mysong/mysong',
    });
  },

});
