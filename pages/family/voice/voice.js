const token = wx.getStorageSync('token');

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

function soundReco (data) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: 'https://4b4e-111-18-45-56.jp.ngrok.io/v1/user/login/upload',
      filePath: data,
      name: 'file',
      header: {
        authorization: token,
      },
      formData: {
        method: 'POST',
      },
      success: (res) => {
        resolve(res);
      },
      fail: reject,
    });
  });
}

Page({

  data: {
    audio_path: '',
    audio_data: undefined,
    recognize_result: '',
    URL: '',
  },

  onLoad: function () {
    getToken();

    console.log(wx.getStorageSync('user-token'));
    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success () {
              wx.startRecord();
            },
          });
        }
      },
    });
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
      console.error(err);
    });
  },

  pushRecord () {
    soundReco(this.audio_path).then(res => {
      console.log(res);
      const aB = res.data;
      this.setData({
        URL: 'http' + aB.match(/http(\S*)M/)[1] + 'M',
      });
      const that = this;
      console.log(this.data.URL);
      wx.request({
        url: 'https://4b4e-111-18-45-56.jp.ngrok.io/v1/voice',
        data: { url: that.data.URL },
        header: {
          authorization: token,
        },
        method: 'POST',
        success: (result) => {},
        fail: (res) => { console.log('fail'); },
        complete: (res) => {},
      });
    });
  },

  stopRecord () {
    recorder.stop();
    recorder.onStop(res => {
      this.audio_path = res.tempFilePath;
      const fs = wx.getFileSystemManager();
      fs.readFile({
        filePath: this.audio_path,
        success: (res) => {
          this.audio_data = res.data;
        },
      });
    });
  },

});
