// pages/music/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://api.xaneon.com/personalized', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        that.setData({
          //默认选取前9个歌单
          array:res.data.result.slice(0,9)
        })
      }
    })
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
  handleItem(id){
    var app = getApp();
    app.globalData.id = id.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../list/list?listid='+id.currentTarget.dataset.id,
    })
  },
  handleMySongs:function(){
    wx.navigateTo({
      url: '../mysong/mysong'
    })
  }
})