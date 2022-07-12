import { request } from './../../../lib/request';

import { getUserFavMusic } from './../../../api/music';

import Toast from '@vant/weapp/toast/toast';

const app = getApp();

const backgroundAudioManager = wx.getBackgroundAudioManager();

const token = wx.getStorageSync('token');

Page({

  data: {
    /** 歌曲ID */
    song_id: 0,
    /** 歌曲名称 */
    song_name: '',
    /** 歌曲歌手 */
    song_singer: '',
    /** 歌曲专辑 */
    song_album: '',
    /** 歌曲封面图 */
    song_img: '',
    /** 歌曲收藏与否 */
    isLike: false,
    /** 歌曲是否播放中 */
    isPlay: false,

    join: false,
  },

  /**
   * 收藏歌曲列表
   * @type {any[]}
   */
  mysongs: [],

  onLoad: async function (options) {
    Toast.loading({
      message: '加载中...',
      duration: 0,
      forbidClick: true,
    });

    // 初始化音频
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
      // 播放开始回调
      backgroundAudioManager.onCanplay(() => {
        Toast.clear();
        this.setData({
          isPlay: true,
        });
      });
      // 播放错误回调
      backgroundAudioManager.onError(() => {
        Toast.fail('播放异常');
        this.setData({
          isPlay: false,
        });
      });
      // 播放结束回调
      backgroundAudioManager.onEnded(() => {
        Toast('播放结束');
        this.setData({
          isPlay: false,
        });
        backgroundAudioManager.startTime = 0;
      });

      this.setData({
        song_id: id,
        song_name: name,
        song_singer: singer,
        song_album: album,
        song_img: img,
      });
    });

    // 获取个人喜欢音乐参数
    try {
      const data = await getUserFavMusic(token);
      this.mysongs = data;
      this.setData({
        isLike: this.mysongs.some(v => v.songName === this.data.song_name),
      });
    } catch (err) {
      Toast.fail('网络异常!');
      console.log(err);
    }
  },

  /**
   * 播放开始及暂停功能
   * @returns {void}
   */
  handlePlayMusic () {
    if (backgroundAudioManager.paused) {
      backgroundAudioManager.play();
      this.setData({
        isPlay: true,
      });
    } else {
      backgroundAudioManager.pause();
      this.setData({
        isPlay: false,
      });
    }
  },

  /**
   * 收藏功能
   * @returns {void}
   */
  async handleLikeMusic () {
    const src = `https://music.163.com/song/media/outer/url?id=${this.data.song_id}.mp3`;
    this.setData({
      song_like: !this.data.song_like,
    });
    console.log(this.data.song_like);
    console.log(this.data.join);
    if (this.data.song_like && !this.data.join) {
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
    } else if (!this.data.song_like && this.data.join) {
      app.globalData.mysongs.pop();
      this.setData({
        join: false,
      });
    }
  },
});
