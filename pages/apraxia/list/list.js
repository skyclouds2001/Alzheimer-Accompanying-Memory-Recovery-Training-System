// pages/music/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    song_array:[],
    name:'',
    coverImg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
    var that = this
    var app = getApp();
    const ts = Date.parse(new Date());
    wx.request({
      url: `https://api.xaneon.com/playlist/detail?timestamp=${ts}`, //仅为示例，并非真实的接口地址
      method:"POST",
      data: {
        id: app.globalData.id,
        cookie: getApp().globalData.cookie,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        that.setData({
          song_array:res.data.playlist.tracks,
          name:res.data.playlist.name,
          coverImg:res.data.playlist.coverImgUrl
        })
      }
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
  handleSong:function(e){
    var app = getApp();
    app.globalData.song_image = e.currentTarget.dataset.picurl
    let id =  e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.song.name
    let singer = e.currentTarget.dataset.song.ar[0].name
    let album = e.currentTarget.dataset.song.al.name
    app.globalData.song = e.currentTarget.dataset.song
    wx.navigateTo({
      url: `../play/play?id=${id}&name=${name}&singer=${singer}&album=${album}`,
    })
  }
})