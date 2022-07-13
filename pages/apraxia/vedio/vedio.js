import { request } from '../../../lib/request';

import { videos, posters } from './../../../data/sportsvideo';

let startTime;
let endTime;
let stayTime;
const app = getApp();

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

  onLoad: function (options) {
    const { id } = options;
    const index = parseInt(id);
    this.setData({
      index: index,
      vedio_src: videos[index],
      fengmian_src: posters[index],
    });
  },

  onShow: function () {
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

  onUnload: function () {
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
