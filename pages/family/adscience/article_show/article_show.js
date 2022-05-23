var alldata = Array()
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
      url: 'https://localhost:8080/v1/news/get',
      method:'GET',
      success:function(res){
        console.log(res.data);
        self.setData({
          alldata : res.data.date.records,
          newsquantity:res.data.data.total
        })
      },
      fail:function(err){
        console.log(err);
      }
    })
    // options.id是用户点击上一个页面后传回的相应的新闻的id值，根据此展示出相应的新闻
    // console.log(options.id)
    let idmatching = options.id
    for (let index = 0; idmatching != alldata.id; index++) {
      this.setData({
        title:this.data.common[index].title,
        text:this.data.common[index].content
      })
    }
   
  }


})