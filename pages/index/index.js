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

    /** 用户身份信息**/
    login_obj: [{
      img_src: 'https://s1.ax1x.com/2022/05/13/Oytq41.png',
      whos: '医生',
      describe: '如果您是医生，请点击这里进入，与患者沟通',
    },
    {
      img_src: 'https://s1.ax1x.com/2022/05/13/OytO9x.png',
      whos: '患者',
      describe: '如果您是患者，请点击这里进入，咨询您的相关问题',
    },
    {
      img_src: 'https://s1.ax1x.com/2022/05/13/OytX36.png',
      whos: '家属',
      describe: '如果您是家属，请点击这里进入，实时查看亲人健康状况',
    }],
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
      })
    }
  },

  /** 详情界面跳转函数**/
  show_detail: function () {
    console.log('show_detial');
  },

});
