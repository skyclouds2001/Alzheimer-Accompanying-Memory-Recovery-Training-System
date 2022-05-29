// pages/evaluate/report-of-family/report-of-family.js 后端返回作答数据的接口未写 痴呆程度判断未写
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 66, // 得分
    result: '', // 判断痴呆程度

  },

  tohome () {
    /** 返回主页面 */
    wx.redirectTo({ url: '/pages/family/family' });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
});

