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

      // 保存 openid 和 token
      this.globalData.openid = openid;
      this.globalData.token = token;
      wx.setStorageSync('openid', openid);
      wx.setStorageSync('token', token);
    } catch (err) {
      console.error(err);
    }

    // 云开发初始化
    wx.cloud.init({
      traceUser: true,
      env: 'cloud1-9gkmm50g8213d619',
    });
  },

  globalData: {
    openid: '',
    token: '',
  },

});
