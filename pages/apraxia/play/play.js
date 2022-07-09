import { request } from '../../../lib/request';

const app = getApp();

const backgroundAudioManager = wx.getBackgroundAudioManager();

Page({

  data: {
    song_id: 0,
    song_name: '',
    song_singer: '',
    song_album: '',
    song_img: '',
    isPlaying: true,
    isLike: false,
    isPlayingText: '正在播放',
    isLikeText: '不喜欢',
    join: false,
  },

  onLoad: function (options) {
    this.getOpenerEventChannel().on('send-song-data', (data) => {
      const { id, album, name, singer } = options;
      const { img } = data;
      const src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;

      // 音频的数据源
      backgroundAudioManager.src = src;
      // 音频标题
      backgroundAudioManager.title = name;
      // 专辑名
      backgroundAudioManager.epname = album;
      // 歌手名
      backgroundAudioManager.singer = singer;
      // 封面图 URL
      backgroundAudioManager.coverImgUrl = img;

      this.setData({
        song_id: id,
        song_name: name,
        song_singer: singer,
        song_album: album,
        song_img: img,
      });
    });
  },

  /**
   * 播放暂停功能
   * @returns {void}
   */
  play () {
    if (this.data.isPlaying) {
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
   * @returns {void}
   */
  like () {
    const src = `https://music.163.com/song/media/outer/url?id=${this.data.song_id}.mp3`;
    this.setData({
      isLike: !this.data.isLike,
      isLikeText: this.data.isLikeText === '不喜欢' ? '喜欢' : '不喜欢',
    });
    console.log(this.data.isLike);
    console.log(this.data.join);
    if (this.data.isLike && !this.data.join) {
      const song = {
        id: this.data.song_id,
        singer: this.data.song_singer,
        name: this.data.song_name,
        album: this.data.song_album,
        src: src,
        isplay: false,
      };
      app.globalData.mysongs.push(song);

      const p = request({
        url: '/v1/song/add',
        data: {
          songId: this.data.song_id,
          songName: this.data.song_name,
          album: this.data.song_album,
          src: src,
          singer: this.data.song_singer,
        },
        method: 'POST',
        header: {
          authorization: wx.getStorageSync('token'),
          'content-type': 'application/json',
        },
      });
      p.then((res) => { console.log(res.data); }, (err) => { console.log(err); });
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
