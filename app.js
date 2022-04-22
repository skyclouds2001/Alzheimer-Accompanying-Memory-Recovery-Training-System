'use strict';

import { formatTime } from './utils/util.js';
import { request } from './lib/request.js';

App({

  onLaunch: async function () {
    try {
      // // 登录
      // const { code } = await wx.login({
      //   timeout: 15000,
      // });
      // console.log({ code });

      // // 获取密钥
      // const { iv, encryptedData } = await wx.getUserInfo({
      //   withCredentials: true,
      //   lang: 'zh_CN',
      // });
      // console.log({ iv });
      // console.log({ encryptedData });

      // // 向服务器请求换取 openid 与 token
      // const { data: res } = await request({
      //   url: '/v1/login/wx',
      //   method: 'POST',
      //   data: {
      //     code,
      //     iv,
      //     encryptedData,
      //   },
      //   header: {
      //     'content-type': 'application/json',
      //   },
      // });
      // console.log(res);
      // const { openid, token } = res;
      // console.log({ openid, token });

      // this.globalData.openid = openid;
      // this.globalData.token = token;
      // wx.setStorageSync('openid', openid);
      // wx.setStorageSync('token', token);
    } catch (err) {
      console.log(err);
    }

    // 存储本地日志
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(formatTime(new Date()));
    wx.setStorageSync('logs', logs);
  },

  onPageNotFound: function (res) {
    console.log({ res });
  },

  onError: function (err) {
    console.log({ err });
  },

  onUnhandledRejection: function (res) {
    console.log({ reason: res.reason });
    res.promise.catch(err => console.log({ err }));
  },

  globalData: {
    openid: '',
    token: '',
  },

});
