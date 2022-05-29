const currenttime = new Date();
function format (time) {
  if (time < 10) {
    time = '0' + time;
  }
  return time;
}

Page({

  data: {
    hour: format(currenttime.getHours()),
    min: format(currenttime.getMinutes()),
    title: '职称',

    /** 用户身份信息**/
    login_obj: [{
      img_src: 'https://s1.ax1x.com/2022/05/13/Oytq41.png',
      whos: '李',
      describe: '专家简介：',
    },
    {
      img_src: 'https://s1.ax1x.com/2022/05/26/XEPcb6.png',
      whos: '陈',
      describe: '专家简介：',
    },
    {
      img_src: 'https://s1.ax1x.com/2022/05/26/XEkFCF.png',
      whos: '张',
      describe: '专家简介：',
    }],
    array: [{
      coverImgUrl: 'https://s1.ax1x.com/2022/05/28/XnT2nS.png',
      name: '找医生',
    }, {
      coverImgUrl: 'https://s1.ax1x.com/2022/05/28/XnTY6K.png',
      name: '预约挂号',
    }, {
      coverImgUrl: 'https://s1.ax1x.com/2022/05/28/XnTcX8.png',
      name: '医院',
    },
    ],
  },

  /** 页面跳转函数**/
  jumpto: function (event) {
    const index0 = event.currentTarget.dataset.index;

    if (index0 === 0) { console.log(0); }
    if (index0 === 1) {
      wx.switchTab({
        url: './../../pages/patient/patient',
      });
    }
    if (index0 === 2) {
      wx.switchTab({
        url: '../../pages/family/family',
      });
    }
  },

  /** 详情界面跳转函数**/
  show_detail: function () {
    console.log('show_detial');
  },

});
