Page({

  data: {
    score:0,    //得分
    result:'xx',    //判断痴呆程度
  },
  
  backhome(){
    /**返回主页面 */
    wx.switchTab({ url:'/pages/patient/patient'})
  }

});
