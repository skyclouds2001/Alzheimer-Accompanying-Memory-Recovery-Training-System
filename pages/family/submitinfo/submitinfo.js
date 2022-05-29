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
  /** 提交信息(已调试) */
  postInfo (value) {
    const value2 = {};
    const edu_level = ['无', '低', '中', '高'];
    // 要传的六个字段-------------------
    value2.age = Number(value.age); // int
    value2.address = value.address[0];// string
    value2.province = value.province[0];// string
    value2.eduBackground = edu_level[Number(value.eduBgcground)];// string
    value2.childPhotos = value.photos;// string
    value2.pname = value.pname;// string
    // --------------------------------
    console.log(value2);
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
    // tempurl url
    const { url } = event.detail.file[0];
    console.log(url);
    const that = this;
    const token = wx.getStorageSync('token');
    const p = new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'http://www.thylovezj.space/v1/user/login/upload',
        header: { authorization: token },
        filePath: url,
        name: 'file',
        success (res) {
          resolve(res);
        },
        fail (err) {
          reject(err);
        },
      });
    },
    );

    p.then((value) => {
      console.log(value);
      const url = value.data.slice(value.data.search('"uri":"') + 7, -3);
      console.log(url);

      that.setData({ fileList: [{ url }] });
    },
    (err) => { console.log(err); });
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
