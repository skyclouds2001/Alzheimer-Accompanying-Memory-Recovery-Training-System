// pages/zhanghu/vip_page/vip_page.js
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ischecked: false,
    select_index: -1,
    item_list1: [{
      src: 'https://s1.ax1x.com/2022/05/18/O79W38.png',
      text: '会员标示',
      describe: '随时随地查看患者状况',
    },
    {
      src: 'https://s1.ax1x.com/2022/05/18/O79fgS.png',
      text: '家人互动',
      describe: 'vip支持与家人互动',
    },
    {
      src: 'https://s1.ax1x.com/2022/05/18/O79hjg.png',
      text: '大额优惠',
      describe: '每日可领优惠券',
    },
    {
      src: 'https://s1.ax1x.com/2022/05/18/O7icNR.png',
      text: '专属客服',
      describe: '1对1客服',
    },
    ],

    item_list2: [{
      src: 'https://s1.ax1x.com/2022/05/18/O79cNt.png',
      text: '会员标示',
    },
    {
      src: 'https://s1.ax1x.com/2022/05/18/O79R9f.png',
      text: '极速升级',
    },
    {
      src: 'https://s1.ax1x.com/2022/05/18/O79g4P.png',
      text: '专属优惠',
    },
    {
      src: 'https://s1.ax1x.com/2022/05/18/O7EM5j.png',
      text: '积分加成',
    },
    ],
    price_list: [{
      time: '1个月',
      price1: '9.9',
      price2: '30',
      describe: '8.3折 省5元',
    },
    {
      time: '3个月',
      price1: '29.9',
      price2: '90',
      describe: '7.6折 省22元',
    },
    {
      time: '12个月',
      price1: '66',
      price2: '360',
      describe: '6.9折 省112元',
    },
    ],
  },
  //  按钮点击
  change_radio () {
    let { ischecked } = this.data;
    ischecked = !ischecked;
    console.log(ischecked);
    this.setData({
      ischecked,
    });
  },
  select (event) {
    console.log(event);
    const { choice } = event.currentTarget.dataset;
    this.setData({
      select_index: choice,
    });
  },
  active () {
    Toast.fail('功能尚未开通');
  },
});
