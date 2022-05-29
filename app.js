import { request } from './lib/request.js';

App({

  onLaunch: async function () {
    try {
      // 登录
      const { code } = await wx.login({
        timeout: 15000,
      });

      // 向服务器请求换取 openid 与 token
      const { data: res } = await request({
        url: `/v1/user/login/${code}`,
        method: 'GET',
      });

      const { openid, token } = res.data;

      // 将 openid 与 token 存至 storage 内
      wx.setStorageSync('openid', openid);
      wx.setStorageSync('token', token);
    } catch (err) {
      console.error(err);
    }
  },

  onPageNotFound: function (res) {
    wx.showToast({
      title: 'Unexpected Error!',
      icon: 'error',
    });
    wx.switchTab({
      url: './pages/index/index',
    });
    console.log({ res });
  },

  onShow () {
    if (this.globalData.firstIn) {
      this.globalData.firstIn = 0;
    } else {
      this.globalData.onShow = 1;
    }
  },
  onHide () {
    this.globalData.onHide = 1;
  },

  globalData: {
    mysongs: [],

    firstIn: 1,
    onShow: 0,
    onHide: 0,
  },

});
