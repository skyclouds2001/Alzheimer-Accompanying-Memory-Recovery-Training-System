// pages/music/mysong/mysong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mysongs:[],
    index:Infinity,
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
    var app = getApp();
    this.setData({
      mysongs:app.globalData.mysongs
    })
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
  play:function(e){
    let index = e.currentTarget.dataset.index
    let pre_index = this.data.index
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    if(index != pre_index){
      backgroundAudioManager.title =  e.currentTarget.dataset.name
      backgroundAudioManager.epname =  e.currentTarget.dataset.album
      backgroundAudioManager.singer =  e.currentTarget.dataset.singer
      backgroundAudioManager.src = e.currentTarget.dataset.src
    }else if(e.currentTarget.dataset.isplay){
      backgroundAudioManager.pause()
    }else if(!e.currentTarget.dataset.isplay){
      backgroundAudioManager.play()
    }
    var song='mysongs['+index+'].isplay'
    this.setData({
      [song]:!e.currentTarget.dataset.isplay,
      index:index
    })
    if(e.currentTarget.dataset.index != pre_index && pre_index!=Infinity ){
      let pre_song = 'mysongs['+pre_index+'].isplay'
      this.setData({
        [pre_song]:false,
      })
    }
    console.log(this.data.mysongs)
  }
})