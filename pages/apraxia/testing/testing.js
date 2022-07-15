import { request } from '../../../lib/request';

const grantType = 'client_credentials';
const clientId = 'bE0U2VdG1TrjEk4667wlWf8K';
const clientSecret = 'RhEuHaDziRMmPYOS9kIxZS3GSLlHmjMz';
const innerAudioContext = wx.createInnerAudioContext();
let token = null;
let base64 = null;
let apiUrl = null;

Page({

  data: {
    imageUrl1: '../../../images/example.jpg',
    imageUrl2: '../../../images/example.jpg',
    btnEnable: '0',
    result: '',
    voiceUrl: '',
  },

  onReady: function () {
    const that = this;
    const s = request({ url: '/v1/voice', method: 'GET', header: { authorization: token, 'content-type': 'application/x-www-form-urlencoded' } });
    s.then(res => {
      console.log(res);
      that.setData({
        voiceUrl: res,
      });
    });
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=' + grantType + '&client_id=' + clientId + '&client_secret=' + clientSecret,
      method: 'POST',
      success: function (res) {
        console.log('Request successful !');
        token = res.data.access_token;
        console.log('My token is : ' + token);
      },
      fail: function (res) {
        console.log('Fail to request !');
        console.log(res);
      },
    });
  },
  chooseImg: function () {
    return new Promise((resolve, reject) => {
      const that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          const tempFilePaths = res.tempFilePaths;
          console.log(tempFilePaths);
          apiUrl = 'https://aip.baidubce.com/rest/2.0/image-classify/v1/gesture';
          that.setData({
            imageUrl1: tempFilePaths,
            btnEnable: '1',
          });
          console.log('My API URL is : ' + apiUrl);
          console.log('Image Path is : ' + tempFilePaths);
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0],
            encoding: 'base64',
            success: res => {
              base64 = res.data;
              resolve(base64);
            },
          });
        },
      });
    });
  },
  get_image: function (res) {
    const that = this;
    this.chooseImg().then(res => {
      wx.request({
        url: apiUrl + '?access_token=' + token,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        data: {
          image: encodeURI(res),
        },
        success: res => {
          // 播放音频
          console.log('recognition_image Success');
          innerAudioContext.autoplay = true;
          innerAudioContext.src = 'http://music.163.com/song/media/outer/url?id=317151.mp3';// 测试音乐，正式改成that.voiceUrl
          innerAudioContext.onPlay(() => {
            console.log('开始播放');
          });
          innerAudioContext.onError((res) => {
            console.log(res.errMsg);
            console.log(res.errCode);
          });

          if (res.data.result == null) {
            console.log(res.data.error_msg);
            console.log(base64);
          } else {
            console.log(res);
            that.setData({
              result: res.data.result[0].classname,
              imageUrl2: 'https://mgl-image.oss-cn-beijing.aliyuncs.com/gesture/22.jpeg',
            });
          }
          const token = wx.getStorageSync('token');
          const p = request({
            url: '/v1/gesture',
            data: { recognizedName: that.result },
            method: 'POST',
            header: {
              authorization: token,
            },
          });
          p.then((res) => { that.setData({ imageUrl2: res.data.image }); }, (err) => { console.log(err); });
        },
      });
    });
  },

});
