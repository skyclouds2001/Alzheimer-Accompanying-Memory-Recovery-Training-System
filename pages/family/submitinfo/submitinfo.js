// pages/submitinfo/submitinfo.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    nickName:'',
    // 性别
    array1:['男','女'],
    index1:0,
    // 国家和地区
    array2:['中国','其他'],
    index2:0,
    // 文化程度
    index3:0,
    array3:['低','中',"高"],
    // 出生地
    place1:['无'],
    customitem:"无",
    // 居住地
    place2:["无"],
    // 照片
    fileList: [{url: 'https://img.yzcdn.cn/vant/leaf.jpg'}]


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
    });
  },

//  选项处理
  bindPickerChange1(event){
    const {value} = event.detail;
    this.setData({
      index1:Number(value)
    })
  },

  bindPickerChange2(event){
    const {value} = event.detail;
    this.setData({
      index2:Number(value)
    })
  },
  bindPickerChange3(event){
    const {value} = event.detail;
    this.setData({
      index3:value
    })
  },

  bindPickerChange4(event){
    const {value} = event.detail;
    this.setData({
      place1:value
    })
      
  },
  bindPickerChange5(event){
    const {value} = event.detail;
    this.setData({
      place2:value
    })
      
  },
  formSubmit(event){

    let {value}= event.detail
    value.img = this.data.fileList
    console.log(value);
    Toast.success("上传成功")
  },
  // 文件上传
  uoload(event){
     console.log(event);
  }
})