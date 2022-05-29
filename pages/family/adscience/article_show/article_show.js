var alldata = Array()
// 为了解决未“登录”的问题
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    text:''
  },
  onLoad: function (options){
    //调用后端接口
    self = this,
    wx.request({
      url: 'http://www.thylovezj.space/v1/news/get?pageNum=1&pageSize=1',
      method:'GET',
      header:{
        // 为了解决未“登录”的问题
        'authorization': token
      },
      success:function(res){
        console.log(res.data);
        newsquantity = res.data.data.records.length
        for (let index = 0; index < newsquantity; index++) {
          alldata[index] = res.data.data.records[index]
        }
      },
      fail:function(err){
        console.log(err);
      }
    })
    // options.id是用户点击上一个页面后传回的相应的新闻的id值，根据此展示出相应的新闻
    // console.log(options.id)
    let idmatching = options.id
    //依次检索，为了让前端用户已点击的新闻的id与后端的新闻的id匹配，从而展示目标新闻内容
    setTimeout(()=>{
      for (let index = 0; idmatching != alldata[index].id; index++) {
        this.setData({
          title:alldata[index].title,
          text:alldata[index].content
        })
      }
    },1000)
   
  }


})