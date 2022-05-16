Page({

  data: {
    /**
     * 头像链接
     * @type {string}
     */
    avatar: '',
  },

  onLoad () {
    const { avatarUrl } = wx.getStorageSync('userInfo');
    this.setData({
      avatar: avatarUrl,
    });
  },

});
