Page({

  data: {
    song_id: 0,
    imgUrl: '',
    isPlaying: true,
    isLike: false,
    isPlayingText: '正在播放',
    isLikeText: '不喜欢',
    join: false,
    name: '',
    singer: '',
    album: '',
  },

  onLoad: function (options) {
    this.setData({
      song_id: options.id,
      name: options.name,
      singer: options.singer,
      album: options.album,
    });
  },

  onShow: function () {
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    const app = getApp();
    console.log(app.globalData.song);
    const src = `https://music.163.com/song/media/outer/url?id=${this.data.song_id}.mp3`;
    backgroundAudioManager.title = app.globalData.song.name;
    backgroundAudioManager.epname = app.globalData.song.al.name;
    backgroundAudioManager.singer = app.globalData.song.ar[0].name;
    backgroundAudioManager.src = src;
    this.setData({
      imgUrl: app.globalData.song_image,
    });
  },

  /**
   * 播放暂停功能
   * @function
   * @returns {void}
   */
  play: function () {
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    if (this.data.isPlaying === true) {
      backgroundAudioManager.pause();
      this.setData({
        isPlaying: false,
        isPlayingText: '停止播放',
      });
    } else {
      this.setData({
        isPlaying: true,
        isPlayingText: '正在播放',
      });
      backgroundAudioManager.play();
    }
  },

  /**
   * 喜欢功能
   * @function
   * @returns {void}
   */
  like: function () {
    const app = getApp();
    const src = `https://music.163.com/song/media/outer/url?id=${this.data.song_id}.mp3`;
    this.setData({
      isLike: !this.data.isLike,
      isLikeText: this.data.isLikeText === '不喜欢' ? '喜欢' : '不喜欢',
    });
    if (this.data.isLike && !this.data.join) {
      const song = {
        id: this.data.song_id,
        singer: this.data.singer,
        name: this.data.name,
        album: this.data.album,
        src: src,
        isplay: false,
      };
      app.globalData.mysongs.push(song);
      this.setData({
        join: true,
      });
    } else if (!this.data.isLike && this.data.join) {
      app.globalData.mysongs.pop();
      this.setData({
        join: false,
      });
    }
  },
});
