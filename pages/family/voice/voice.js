// 录音对象
const recorder = wx.getRecorderManager();
const ACCESS_KEY = 'YE3fgvbGgZeXtdk0OTdHHUFq';
const ACCESS_SECRET = 'orGMQMLsdK6prPVInB81IlQCZhKZHiHB';
function getToken () {
  wx.request({
    url: `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${ACCESS_KEY}&client_secret=${ACCESS_SECRET}`,
    method: 'POST',
    success: (res) => {
      // console.log(res);
      wx.setStorage({
        data: res.data.refresh_token,
        key: 'user-token',
      });
    },
  });
}

// 语音识别
function soundReco (data) {
  const token = wx.getStorageSync('user-token');
  if (!token) {
    getToken();
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: `https://vop.baidu.com/server_api?dev_pid=1537&cuid=frommiyiapp&token=${token}`,
      method: 'POST',
      data: data,
      header: { 'Content-Type': 'audio/pcm;rate=16000' },
      success: (res) => {
        resolve(res.data.result);
        console.log(res);
      },
      fail: reject,
    });
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audio_path: '',
    audio_data: undefined,
    recognize_result: '',
  },
  startRecord () {
    const options = {
      sampleRate: 16000, // 采样率16k
      numberOfChannels: 1,
      format: 'PCM', // 格式为pcm
    };
    recorder.start(options);
    recorder.onStart(() => {
      console.log('Recording!~~~');
    });
    recorder.onError(err => {
      console.log(err);
    });
  },
  stopRecord () {
    recorder.stop();
    recorder.onStop(res => {
      this.audio_path = res.tempFilePath;
      // 这里借鉴了一位大佬的方案
      const fs = wx.getFileSystemManager();
      fs.readFile({
        filePath: this.audio_path,
        success: (res) => {
          this.audio_data = res.data;
        },
      });
    });
    soundReco(this.audio_data).then(res => {
      console.log(res);
      this.setData({
        recognize_result: res,
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getToken();
    console.log(wx.getStorageSync('user-token'));
    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord();
            },
          });
        }
      },
    });
  },
});
