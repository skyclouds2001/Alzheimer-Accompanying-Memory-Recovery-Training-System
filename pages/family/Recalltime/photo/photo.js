// pages/family/Recalltime/Recalltime.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 相册数量 */
    albumquantity: 0,
    /** 照片数量 */
    photoquantity: 0,
    /** 视频数量 */
    videoquantity: 0,
  },
  // 实现falshtabbar
  album () {
    wx.redirectTo({
      url: '/pages/family/Recalltime/Recalltime',
    });
  },
  vedio () {
    wx.redirectTo({
      url: '/pages/family/Recalltime/vedio/vedio',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // tabbar页面相关
    // if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    //   this.getTabBar().setData({
    //     select: 1,
    //     kind: 2
    //   });
    // }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

  },
});
