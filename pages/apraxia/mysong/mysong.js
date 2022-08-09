import { getUserFavMusic } from './../../../api/music';

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

  onLoad: async function () {
    try {
      const res = await getUserFavMusic(token);

      this.setData({
        mysongs: res,
      });
    } catch (err) {
      console.error(err);
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
      message: '加载中...',
      duration: 0,
      forbidClick: true,
    });

    const { song } = e.currentTarget.dataset;

    backgroundAudioManager.title = song.songName;
    backgroundAudioManager.epname = song.album;
    backgroundAudioManager.singer = song.singer;
    backgroundAudioManager.src = song.src;

    backgroundAudioManager.onCanplay(() => Toast.clear());
    backgroundAudioManager.onError(() => Toast.fail('播放异常！'));
    backgroundAudioManager.onEnded(() => Toast('播放结束'));
  },

});
