import { request } from '../../../lib/request';
let startTime;
let endTime;
let stayTime;
const app = getApp();
Page({

  data: {
    /**
     * 视频播放url
     * @type {string[]}
     */
    vedio_src: [
      'https://video.pearvideo.com/mp4/third/20220428/cont-1760344-11980839-105330-hd.mp4',
      'https://video.pearvideo.com/mp4/third/20220428/cont-1760344-11980839-105330-hd.mp4',
      'https://video.pearvideo.com/mp4/third/20220428/cont-1760344-11980839-105330-hd.mp4',
      'https://video.pearvideo.com/mp4/third/20220428/cont-1760344-11980839-105330-hd.mp4',
    ],

    /**
     * 视频封面
     * @type {string[]}
     */
    fengmian_src: [
      'https://s1.ax1x.com/2022/05/11/Od6rin.png',
      'https://s1.ax1x.com/2022/05/11/Od6rin.png',
      'https://s1.ax1x.com/2022/05/11/Od6rin.png',
      'https://s1.ax1x.com/2022/05/11/Od6rin.png',
    ],

    /**
     * 当前播放视频index
     * @type {number}
     */
    index: 0,
  },

  onLoad: function (options) {
    this.setData({
      index: options.id,
    });
  },
  onShow () {
    setTimeout(function () {
      if (app.globalData.onShow) {
        app.globalData.onShow = 0;
        console.log('demo前后台切换之切到前台');
      } else {
        console.log('demo页面被切换显示');
        startTime = +new Date();
      }
    }, 100);
  },
  onUnload () {
    setTimeout(function () {
      if (app.globalData.onHide) {
        app.globalData.onHide = 0;
        console.log('还在当前页面活动');
      } else {
        endTime = +new Date();
        console.log('demo页面停留时间：' + (endTime - startTime));
        stayTime = endTime - startTime;
        console.log(stayTime);
        const p = request({
          url: '/v1/exercise/add',
          data: { exTime: stayTime, exType: 3, score: 0 },
          method: 'POST',
        });
        p.then(() => { console.log('push successfully'); }, () => { console.log('push fail'); });
      }
    }, 100);
  },
  ended (e) {
    wx.navigateTo({
      url: '../testing/testing',
    });
    setTimeout(function () {
      if (app.globalData.onHide) {
        app.globalData.onHide = 0;
        console.log('还在当前页面活动');
      } else {
        endTime = +new Date();
        console.log('demo页面停留时间：' + (endTime - startTime));
        stayTime = endTime - startTime;
        console.log(stayTime);
        const p = request({
          url: '/v1/exercise/add',
          data: { exTime: stayTime, exType: 3, score: 0 },
          method: 'POST',
        });
        p.then(() => { console.log('push successfully'); }, () => { console.log('push fail'); });
      }
    }, 100);
  },

});
