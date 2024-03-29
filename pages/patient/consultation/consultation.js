import { formatNumber } from './../../../utils/util.js';
import Toast from '@vant/weapp/toast/toast';

const currenttime = new Date();

const format = formatNumber;

Page({

  data: {
    hour: format(currenttime.getHours()),
    min: format(currenttime.getMinutes()),

    /** 用户身份信息**/
    login_obj: [
      {
        img_src: 'https://s1.ax1x.com/2022/05/13/Oytq41.png',
        whos: '李',
        describe: '未知',
        work_time: 29,
        position: '主任医师',
      },
      {
        img_src: 'https://s1.ax1x.com/2022/05/26/XEPcb6.png',
        whos: '陈',
        describe: '未知',
        work_time: 33,
        position: '副主任医师',
      },
      {
        img_src: 'https://s1.ax1x.com/2022/05/26/XEkFCF.png',
        whos: '张',
        describe: '未知',
        work_time: 19,
        position: '副主任医师',
      },
    ],

    array: [
      {
        coverImgUrl: 'https://s1.ax1x.com/2022/05/28/XnT2nS.png',
        name: '找医生',
      },
      {
        coverImgUrl: 'https://s1.ax1x.com/2022/05/28/XnTY6K.png',
        name: '预约挂号',
      },
      {
        coverImgUrl: 'https://s1.ax1x.com/2022/05/28/XnTcX8.png',
        name: '医院',
      },
    ],
  },

  /** 页面跳转函数 **/
  jumpto (e) {
    const { index } = e.currentTarget.dataset;
    Toast.fail('此功能尚未开放');
    console.log(index);
  },

});
