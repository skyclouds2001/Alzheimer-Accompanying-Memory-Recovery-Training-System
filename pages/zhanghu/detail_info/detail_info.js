import { userinfo } from './../../../data/patientinfo';

Page({

  data: {
    /**
     * 头像链接
     */
    avatar: '',

    /**
     * 用户信息
     */
    info: {},
  },

  onLoad () {
    const { avatarUrl } = wx.getStorageSync('userInfo');
    this.setData({
      avatar: avatarUrl,
      info: userinfo,
    });
  },

});
