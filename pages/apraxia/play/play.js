// pages/music/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    song_id:0,
    imgUrl:"",
    isPlaying:true,
    isLike:false,
    isPlayingText:"正在播放",
    isLikeText:"不喜欢",
    join:false,
    name:"",
    singer:"",
    album:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      song_id:options.id,
      name:options.name,
      singer:options.singer,
      album:options.album,
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
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    var app = getApp();
    console.log(app.globalData.song)
    let src = `https://music.163.com/song/media/outer/url?id=${this.data.song_id}.mp3`
    backgroundAudioManager.title = app.globalData.song.name
    backgroundAudioManager.epname = app.globalData.song.al.name
    backgroundAudioManager.singer = app.globalData.song.ar[0].name
    backgroundAudioManager.src = src
    this.setData({
      imgUrl:app.globalData.song_image
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
  //播放暂停功能
  play:function(){
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    if(this.data.isPlaying == true){
      backgroundAudioManager.pause();
      this.setData({
        isPlaying:false,
        isPlayingText:"停止播放",
      })
    }else{
      this.setData({
        isPlaying:true,
        isPlayingText:"正在播放",
      })
      backgroundAudioManager.play();
    }
  },
  //喜欢功能
  like:function(){
    var app = getApp();
    let src = `https://music.163.com/song/media/outer/url?id=${this.data.song_id}.mp3`
    this.setData({
      isLike:!this.data.isLike,
      isLikeText:this.data.isLikeText == "不喜欢"?"喜欢":"不喜欢"
    })
    if(this.data.isLike == true && this.data.join == false){
      let song = {
        id:this.data.song_id,
        singer:this.data.singer,
        name:this.data.name,
        album:this.data.album,
        src:src,
        isplay:false,
      }
      app.globalData.mysongs.push(song)
      this.setData({
        join:true
      })
    }else if(this.data.isLike == false && this.data.join == true){
      app.globalData.mysongs.pop()
      this.setData({
        join:false
      })
    }
  }
})