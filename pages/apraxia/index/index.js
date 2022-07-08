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

import { request } from './../../../lib/request';
import { cookie } from './../../../data/cloudmusic';

import Toast from '@vant/weapp/toast/toast';

const app = getApp();

Page({

  data: {
    /**
     * 歌曲列表 - 阿尔法脑波音乐
     * @type {Song[]}
     */
    songs: [],
  },

  onLoad: async function () {
    Toast.loading({
      message: '加载中',
      forbidClick: true,
      duration: 0,
    });
    const { data: res } = await request({
      url: '/cloudsearch',
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
    }, 'https://api.xaneon.com');
    this.setData({
      songs: res.result.playlists.slice(0, 9),
    });
    Toast.clear();
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
  handleMySongs: function () {
    wx.navigateTo({
      url: '../mysong/mysong',
    });
  },

});
