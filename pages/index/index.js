import Toast from '@vant/weapp/toast/toast';

import { formatNumber } from './../../utils/util.js';

const currenttime = new Date();

Page({

  data: {
    hour: formatNumber(currenttime.getHours()),
    min: formatNumber(currenttime.getMinutes()),

    /** 用户身份信息**/
    login_obj: [
      {
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
      },
    ],
  },

  onLoad: function () {
    const type = wx.getStorageSync('usertype');

    if (type === 1) {
      wx.switchTab({
        url: './../../pages/patient/patient',
      });
    }
    if (type === 2) {
      wx.redirectTo({
        url: './../../pages/family/family',
      });
    }
  },

  /** 页面跳转函数**/
  jumpto (e) {
    const { index } = e.currentTarget.dataset;

    if (index === 0) {
      Toast('此功能尚未开发！');
    }
    if (index === 1) {
      wx.setStorageSync('usertype', 1);
      wx.switchTab({
        url: './../../pages/patient/patient',
      });
    }
    if (index === 2) {
      wx.setStorageSync('usertype', 2);
      wx.redirectTo({
        url: './../../pages/family/family',
      });
    }
  },

  /** 详情界面跳转函数**/
  show_detail () {
    Toast('此功能尚未开发！');
  },

});
