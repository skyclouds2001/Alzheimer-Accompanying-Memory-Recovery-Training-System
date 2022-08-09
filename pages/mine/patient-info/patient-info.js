import { userinfo } from './../../../data/patientinfo';

Page({

  data: {
    /**
     * 头像链接
     * @type {string}
     */
    avatar: '',

    /**
     * 用户信息
     * @type {object | null}
     */
    info: null,
  },

  onLoad () {
    const { avatarUrl } = wx.getStorageSync('userInfo');
    this.setData({
      avatar: avatarUrl,
      info: userinfo,
    });
  },

});
