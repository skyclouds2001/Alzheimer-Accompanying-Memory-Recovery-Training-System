import { request } from '../../../lib/request';
let startTime;
let endTime;
let stayTime;
const app = getApp();
Page({

  data: {
    /**
     * 视频播放url
     * @type {string[]}
     */
    vedio_src: [
      'https://vd4.bdstatic.com/mda-mfn5d8nb03px6btb/sc/cae_h264/1624421119324703354/mda-mfn5d8nb03px6btb.mp4?v_from_s=hkapp-haokan-nanjing&amp;auth_key=1654005455-0-0-d7ba7fd4a01c42d9e0d37c08cc561355&amp;bcevod_channel=searchbox_feed&amp;pd=1&amp;cd=0&amp;pt=3&amp;logid=1655568381&amp;vid=4257150267656541618&amp;abtest=101830_1-102599_1-17451_1-3000225_2-3000232_2&amp;klogid=1655568381',
      'https://vd4.bdstatic.com/mda-mfn5j2uuubxrg2ah/sc/cae_h264/1624422004183764914/mda-mfn5j2uuubxrg2ah.mp4?v_from_s=hkapp-haokan-nanjing&amp;auth_key=1654005987-0-0-35e13dd4e7585b5a3fc8108ea5b841e8&amp;bcevod_channel=searchbox_feed&amp;cd=0&amp;pd=1&amp;pt=3&amp;logid=2187788633&amp;vid=1240217225669729718&amp;abtest=101830_1-102599_1-17451_1-3000225_2-3000232_2&amp;klogid=2187788633',
      'https://vd4.bdstatic.com/mda-mft4irdf0zvvfugi/720p/h264/1624850005490050212/mda-mft4irdf0zvvfugi.mp4?v_from_s=hkapp-haokan-nanjing&amp;auth_key=1654006081-0-0-a8105d23a1665b5d6d1f038dee38f774&amp;bcevod_channel=searchbox_feed&amp;cd=0&amp;pd=1&amp;pt=3&amp;logid=2281312323&amp;vid=3052521742002734528&amp;abtest=101830_1-102599_1-17451_1-3000225_2-3000232_2&amp;klogid=2281312323',
      'https://vd4.bdstatic.com/mda-keinvcw7vdr8w4q4/v1-cae/sc/mda-keinvcw7vdr8w4q4.mp4?v_from_s=hkapp-haokan-nanjing&amp;auth_key=1654006689-0-0-c9f2acc3c4ffb545bc4a7a2bf8605fbb&amp;bcevod_channel=searchbox_feed&amp;cd=0&amp;pd=1&amp;pt=3&amp;logid=2889629481&amp;vid=3255773693238375785&amp;abtest=101830_1-102599_1-17451_1-3000225_2-3000232_2&amp;klogid=2889629481',
    ],

    /**
     * 视频封面
     * @type {string[]}
     */
    fengmian_src: [
      'https://t15.baidu.com/it/u=3026127131,767206361&fm=225&app=113&size=f256,170&n=0&f=JPEG&fmt=auto?s=DD243D721D024D494CF4654E0100E070&sec=1654102800&t=a4418a309d9d72ce05c2a7f7419b5be5',
      'https://gimg4.baidu.com/poster/src=http%3A%2F%2Ft14.baidu.com%2Fit%2Fu%3D2415746346%2C1441692990%26fm%3D225%26app%3D113%26f%3DJPEG%3Fw%3D1920%26h%3D1080%26s%3DC50635761F0145494CF4654E0300E072&refer=http%3A%2F%2Fwww.baidu.com&app=2004&size=f352,234&n=0&g=0n&q=100?sec=1654091515&t=741525b86f71f968775034c3d66e17b1',
      'https://s1.ax1x.com/2022/06/01/XYpVqx.png',
      'https://gimg4.baidu.com/poster/src=http%3A%2F%2Ft13.baidu.com%2Fit%2Fu%3D10588222535126250379%2C11748220370434277129%26fm%3D3008%26app%3D3011%26f%3DJPEG&refer=http%3A%2F%2Fwww.baidu.com&app=2004&size=f352,234&n=0&g=0n&q=100?sec=1654091398&t=958c2c783cba71cb214dad98c99adbd8',
    ],

    /**
     * 当前播放视频index
     * @type {number}
     */
    index: 0,
  },

  onLoad: function (options) {
    this.setData({
      index: options.id,
    });
  },
  onShow () {
    setTimeout(function () {
      if (app.globalData.onShow) {
        app.globalData.onShow = 0;
        console.log('demo前后台切换之切到前台');
      } else {
        console.log('demo页面被切换显示');
        startTime = +new Date();
      }
    }, 100);
  },
  onUnload () {
    setTimeout(function () {
      if (app.globalData.onHide) {
        app.globalData.onHide = 0;
        console.log('还在当前页面活动');
      } else {
        endTime = +new Date();
        console.log('demo页面停留时间：' + (endTime - startTime));
        stayTime = endTime - startTime;
        console.log(stayTime);
        const p = request({
          url: '/v1/exercise/add',
          data: { exTime: stayTime, exType: 3, score: 0 },
          method: 'POST',
        });
        p.then(() => { console.log('push successfully'); }, () => { console.log('push fail'); });
      }
    }, 100);
  },
  ended (e) {
    wx.navigateTo({
      url: '../testing/testing',
    });
    setTimeout(function () {
      if (app.globalData.onHide) {
        app.globalData.onHide = 0;
        console.log('还在当前页面活动');
      } else {
        endTime = +new Date();
        console.log('demo页面停留时间：' + (endTime - startTime));
        stayTime = endTime - startTime;
        console.log(stayTime);
        const p = request({
          url: '/v1/exercise/add',
          data: { exTime: stayTime, exType: 3, score: 0 },
          method: 'POST',
        });
        p.then(() => { console.log('push successfully'); }, () => { console.log('push fail'); });
      }
    }, 100);
  },

});
