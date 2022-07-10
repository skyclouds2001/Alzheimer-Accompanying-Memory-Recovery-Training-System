import { request } from '../../../lib/request';

import Toast from '@vant/weapp/toast/toast';

const token = wx.getStorageSync('token');

const backgroundAudioManager = wx.getBackgroundAudioManager();

Page({
  data: {
    /**
     * 收藏的歌曲
     * @type {Song[]}
     */
    mysongs: [],
  },

  onShow: async function () {
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

      if (res.status !== 10000) throw new Error('Request Error!');

      this.setData({
        mysongs: res.data || [],
      });
    } catch (err) {
      console.log(err);
      Toast.fail('加载失败！');
    }
  },

  /**
   * 开始播放音乐控制
   * @param {TouchEvent} e 点击事件对象
   * @returns {void}
   */
  handleSong (e) {
    Toast.loading({
      duration: 0,
    });

    const { song } = e.currentTarget.dataset;

    backgroundAudioManager.title = song.songName;
    backgroundAudioManager.epname = song.album;
    backgroundAudioManager.singer = song.singer;
    backgroundAudioManager.src = song.src;

    backgroundAudioManager.onCanplay(() => setTimeout(() => Toast.clear(), 1000));
    backgroundAudioManager.onError(() => Toast.fail('播放异常！'));
  },

});
