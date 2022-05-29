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

  onShow: function () {
    const app = getApp();
    const that = this;
    // wx.request({
    //     url: 'example.php', //仅为示例，并非真实的接口地址
    //     method="GET",
    //     // data: {
    //     //   x: '',
    //     //   y: ''
    //     // },
    //     header: {
    //       'content-type': 'application/json' // 默认值
    //     },
    //     success (res) {
    //       console.log(res)
    //       that.setData({
    //         // 默认选取前9个歌单
    //         mysongs: res,
    //       });
    //     }
    //   });
    //   this.setData({
    //   // mysongs: app.globalData.mysongs,
    // });
  },

  /**
   * 播放音乐控制
   * @function
   * @param {Event} e 点击事件对象
   * @returns {void}
   */
  /*
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
  */
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
