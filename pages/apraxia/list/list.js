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

  onShow: function () {
    const that = this;
    const app = getApp();
    const ts = Date.parse(new Date());
    wx.request({
      url: `https://api.xaneon.com/playlist/detail?timestamp=${ts}`, // 仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        id: app.globalData.id,
        cookie: app.globalData.cookie,
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      success (res) {
        that.setData({
          song_array: res.data.playlist.tracks,
          name: res.data.playlist.name,
          coverImg: res.data.playlist.coverImgUrl,
        });
      },
    });
  },

  /**
   * 点击详细音乐跳转
   * @function
   * @param {Event} e 点击事件对象
   * @returns {void}
   */
  handleSong: function (e) {
    const app = getApp();
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
