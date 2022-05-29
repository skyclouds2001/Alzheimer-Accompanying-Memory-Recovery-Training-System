// pages/evaluate/report-of-family/report-of-family.js 后端返回作答数据的接口未写 痴呆程度判断未写
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 32.5, // 得分
    result: '正常', // 判断痴呆程度
  },

  tohome () {
    /** 返回主页面 */
    wx.redirectTo({ url: '/pages/family/family' });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: '', 
      method: 'GET',
      header: {
        'authorization': token
	  }, 
      success: function (res) {
        // 等后端接口写好，这里给相关参数赋值
       console.log(res.data)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  }


});

