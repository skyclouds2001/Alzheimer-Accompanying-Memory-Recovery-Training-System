// pages/submitinfo/submitinfo.js
import Toast from '@vant/weapp/toast/toast';
import { request } from '../../../lib/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: '',
    // 性别
    array1: ['点击选择', '男', '女'],
    index1: 0,
    // 国家和地区
    array2: ['点击选择', '中国', '其他'],
    index2: 0,
    // 文化程度
    index3: 0,
    array3: ['点击选择', '低', '中', '高'],
    // 出生地
    place1: ['无'],
    customitem: '无',
    // 居住地
    place2: ['无'],
    // 照片
    fileList: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
    });
  },

  //  选项处理
  bindPickerChange1 (event) {
    const { value } = event.detail;
    this.setData({
      index1: Number(value),
    });
  },

  bindPickerChange2 (event) {
    const { value } = event.detail;
    this.setData({
      index2: Number(value),
    });
  },
  bindPickerChange3 (event) {
    const { value } = event.detail;
    this.setData({
      index3: value,
    });
  },

  bindPickerChange4 (event) {
    const { value } = event.detail;
    this.setData({
      place1: value,
    });
  },
  bindPickerChange5 (event) {
    const { value } = event.detail;
    this.setData({
      place2: value,
    });
  },
  formSubmit (event) {
    const { value } = event.detail;
    if (this.data.fileList.length) { value.photos = this.data.fileList[0].url; } else { value.img = ''; }
    console.log(value);
    if (this.checkInfo(value)) {
      this.postInfo(value);
    } else {
      Toast.fail('请输入完整信息');
    }
  },
  /** 提交信息 */
  postInfo (value) {
    const value2 = {};

    // 要传的六个字段-------------------
    value2.age = value.age;
    value2.address = value.address;
    value2.province = value.province;
    value2.eduBgcground = value.eduBgcground;
    value2.photos = value.photos;
    value2.pname = value.pname;
    // --------------------------------

    const token = wx.getStorageSync('token');
    const p = request({ url: '/v1/patient', method: 'PUT', header: { authorization: token }, data: value2 });
    p.then(() => { Toast.success('putsuccess'); }, () => { Toast.fail('putfail'); });
  },
  /**
   *检测信息
   * @param {} obj
   */
  checkInfo (obj) {
    for (const key in obj) {
      if (!obj[key]) {
        return false;
      }
    }
    return true;
  },
  /**
   * 上传文件返回在线地址
   * @param {e} event
   */
  uoload (event) {
    const { url } = event.detail.file[0];
    console.log(url);
    const that = this;
    const p = new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
        filePath: url,
        name: 'file',
        formData: {
          user: 'test',
        },
        success (res) {
          resolve(res.data);
        },
        fail (err) {
          reject(err);
        },
      });
    },
    );

    p.then((value) => { that.setData({ fileList: [{ url: value }] }); }, (err) => { console.log(err); });
  },

  /**
   * del event
   * @param {e} event
   */
  del (event) {
    const { index } = event.detail;
    const fileList = this.data.fileList;
    fileList.splice(index, 1);
    this.setData({ fileList });
  },
});
