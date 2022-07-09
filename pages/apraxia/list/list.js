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

  onLoad: async function (options) {
    const { id } = options;
    Toast.loading('加载中');

    try {
      const { data: res } = await request({
        url: `/playlist/detail?timestamp=${new Date().getTime()}`,
        method: 'POST',
        data: {
          id: id,
          cookie: cookie,
        },
        header: {
          'Content-Type': 'application/json',
        },
      }, 'https://api.xaneon.com');

      const { tracks, name, coverImgUrl } = res.playlist;
      this.setData({
        song_array: tracks,
        name: name,
        coverImg: coverImgUrl,
      });
      setTimeout(() => Toast.clear(), 2500);
    } catch (err) {
      console.log(err);
      Toast.fail('加载失败！');
    }
  },

  /**
   * 点击详细音乐跳转
   * @param {TouchEvent} e 点击事件对象
   * @returns {void}
   */
  handleSong: function (e) {
    const { id, name, album, singer } = e.currentTarget.dataset;

    app.globalData.song_image = e.currentTarget.dataset.picurl;
    app.globalData.song = e.currentTarget.dataset.song;

    wx.navigateTo({
      url: `./../play/play?id=${id}&name=${name}&singer=${singer}&album=${album}`,
    });
  },
});
