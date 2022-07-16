import Toast from '@vant/weapp/toast/toast';

import { addExerciseRecord } from './../../../api/exercise';

import { videos, posters } from './../../../data/sportsvideo';

const token = wx.getStorageSync('token');

Page({

  data: {
    /**
     * 视频播放url
     */
    vedio_src: '',

    /**
     * 视频封面
     */
    fengmian_src: '',

    /**
     * 当前播放视频index
     */
    index: 0,
  },
  startTimestamp: 0,
  endTimestamp: 0,
  totalTimestamp: 0,

  onLoad: function (options) {
    const { id } = options;
    const index = parseInt(id);
    this.setData({
      index: index,
      vedio_src: videos[index],
      fengmian_src: posters[index],
    });
  },

  onUnload: function () {
    this.endTimestamp = new Date().getTime();
    this.totalTimestamp += (this.endTimestamp = this.startTimestamp);
    this.startTimestamp = this.endTimestamp = 0;
    this.sendExerciseRecord(this.timestamp);
  },

  /**
   * 视频开始及继续播放方法
   * 记录开始时间戳
   */
  handleVideoPlay () {
    this.startTimestamp = new Date().getTime();
  },

  /**
   * 视频暂停播放方法
   * 记录停止时间戳并保存
   */
  handleVideoPause () {
    this.endTimestamp = new Date().getTime();
    this.totalTimestamp += (this.endTimestamp = this.startTimestamp);
    this.startTimestamp = this.endTimestamp = 0;
  },

  /**
   * 视频停止播放方法
   * 记录停止时间戳
   */
  handleVideoEnded () {
    this.endTimestamp = new Date().getTime();
    this.totalTimestamp += (this.endTimestamp = this.startTimestamp);
    this.startTimestamp = this.endTimestamp = 0;
    this.sendExerciseRecord(this.timestamp);
    setTimeout(() => {
      wx.navigateTo({
        url: '../testing/testing',
      });
    }, 3000);
  },

  /**
   * 发送视频播放时间即学习时间
   * @param {number} timestamp 播放时间戳
   */
  async sendExerciseRecord (timestamp) {
    try {
      await addExerciseRecord(token, {
        time: timestamp,
        type: 3,
        score: 0,
      });
    } catch (err) {
      console.log(err);
      Toast.fail('网络异常！');
    }
  },

});
