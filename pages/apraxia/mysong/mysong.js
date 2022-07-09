import { request } from '../../../lib/request';

import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    /**
     * 收藏的歌曲
     * @type {Song[]}
     */
    mysongs: [],

    /**
     * 当前播放音乐index
     * @type {number}
     */
    index: Infinity,
    song_index: Infinity,
  },

  onShow: async function () {
    const token = wx.getStorageSync('token');
    try {
      const { data: res } = await request({
        url: '/v1/song/get',
        method: 'GET',
        data: {},
        header: {
          authorization: token,
          'Content-Type': 'application/json',
        },
      });

      if (res.status !== 10000) throw new Error('Service Error');

      this.setData({
        mysongs: res.data || [],
      });
    } catch (err) {
      console.log(err);
      Toast.fail('加载失败！');
    }
  },

  /**
   * 播放音乐控制
   * @param {Event} e 点击事件对象
   * @returns {void}
   */
  play: function (e) {
    const index = e.currentTarget.dataset.index;
    const preIndex = this.data.index;
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    if (index !== preIndex) {
      backgroundAudioManager.title = e.currentTarget.dataset.name;
      backgroundAudioManager.epname = e.currentTarget.dataset.album;
      backgroundAudioManager.singer = e.currentTarget.dataset.singer;
      backgroundAudioManager.src = e.currentTarget.dataset.src;
    } else if (e.currentTarget.dataset.isplay) {
      backgroundAudioManager.pause();
    } else if (!e.currentTarget.dataset.isplay) {
      backgroundAudioManager.play();
    }
    const song = 'mysongs[' + index + '].isplay';
    this.setData({
      [song]: !e.currentTarget.dataset.isplay,
      index: index,
    });
    if (e.currentTarget.dataset.index !== preIndex && preIndex !== Infinity) {
      const preSong = 'mysongs[' + preIndex + '].isplay';
      this.setData({
        [preSong]: false,
      });
    }
    console.log(this.data.mysongs);
  },

  handleSong (e) {
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    console.log(e.currentTarget.dataset);
    backgroundAudioManager.title = e.currentTarget.dataset.name;
    backgroundAudioManager.epname = e.currentTarget.dataset.album;
    backgroundAudioManager.singer = e.currentTarget.dataset.singer;
    backgroundAudioManager.src = e.currentTarget.dataset.src;
    this.setData({
      song_index: e.currentTarget.dataset.index,
    });
    console.log(this.data.song_index);
  },
});
