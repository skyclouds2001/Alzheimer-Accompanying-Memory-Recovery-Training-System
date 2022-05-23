var alldata = Array()
let newsquantity = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**首页展示新闻列表 */
    newslist:[],
    loadfail:false,
    maincontent:''
  },
  gotodetail:function(e){
    //需携带data-id的数据
    let id = e.currentTarget.dataset.id
    // 需携带新闻ID进行页面跳转
    wx.navigateTo({
      url: '/pages/family/adscience/article_show/article_show?id=' + id,
    })
    // console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    
    //首页渲染展示新闻列表
    for (let index = 0; index<newsquantity; index++) {
      this.setData({
        newslist:[{
          id:alldata.id,
          title:alldata.title,
          maincontent:alldata.introduction,
          poster:alldata.pic   //照片
        }
      ]
      })
    }
    //如果未获取到内容
    if(newsquantity=='0'){this.setData({loadfail:true})}
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})