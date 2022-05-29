/**存新闻标题，简介...的数组 */
var alldata = Array()
/**存新闻的总条数 */
let newsquantity = 0
const token = wx.getStorageSync('token')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**首页展示新闻列表 */
    newslist:[],
    loadfail:false
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
      url: 'http://www.thylovezj.space/v1/news/get?pageNum=1&pageSize=1',
      method:'GET',
      header:{
        'authorization': token
      },
      success:function(res){
        console.log(res.data)
        alldata[0] = res.data.data.records[0]

        console.log('alldata的值')
        console.log(alldata)
        
        newsquantity = alldata.length
        console.log('alldata.length的长度')
        console.log(newsquantity)

        if(newsquantity == 0){this.setData({loadfail:true})}
      },
      fail:function(err){
        console.log(err);
      }
    })
    
    //首页渲染展示新闻列表
    setTimeout(()=>
      {
        for (let index = 0; index<newsquantity; index++) {
          this.setData({
            newslist:[{
              id:alldata[index].id,
              title:alldata[index].title,
              maincontent:alldata[index].introduction,
              poster:alldata[index].pic   //照片
            }],
          })
        }
      },1000)

      
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