import { request } from '../../lib/request';
// 答完题后播放的音频
const audioRef = wx.createInnerAudioContext();
// 点击按钮时音频
const audioRefRadio = wx.createInnerAudioContext();
// 错误音效
const audioRefFalse = wx.createInnerAudioContext();
// 成功音效
const audioRefTrue = wx.createInnerAudioContext();

Page({
  data: {
    isloading: true,
    isdisable: true,
    // 是否隐藏组件
    condition: false,
    // 弹出框显示
    show: false,
    judge: '正确',
    // 按钮文字
    submit_text: '下一题',
    // 题目组索引
    index: 0,
    // 问题对象
    question_obj: [],

    // 成绩
    score: 0,
    radio: -1,
    // 结尾音频地址
    audio_src:
      'http://aimg8.dlszyht.net.cn/ueditor/file/823/1644869/1553422829215244.mp3',
  },

  // 点击submit按钮事件
  change () {
    audioRefRadio.play();
    this.setData({ isdisable: true });
    // 点击下一题
    if (this.data.index < this.data.question_obj.length - 1) {
      if (this.data.radio === this.data.question_obj[this.data.index].answer) {
        this.setData({ judge: '正确' });
        this.setData({ score: this.data.score + 1 });
        audioRefTrue.play();
      } else {
        this.setData({ judge: '错误' });
        audioRefFalse.play();
      }
      this.setData({ show: true });
      setTimeout(this.disappear, 2000);
    } else {
      // 点击提交，算成绩放音乐
      if (this.data.radio === this.data.question_obj[this.data.index].answer) {
        audioRefTrue.play();
        this.setData({ score: this.data.score + 1 });
      } else {
        audioRefFalse.play();
      }
      audioRef.play();
      this.setData({ condition: true });
      this.sendscore();
    }
  },

  disappear () {
    this.setData({ show: false });
    this.setData({ index: this.data.index + 1 });
    this.setData({ radio: '-1' });
    if (this.data.index === this.data.question_obj.length - 1) {
      this.setData({ submit_text: '提交' });
    }
  },

  onChange (event) {
    this.setData({
      radio: event.detail,
    });
  },
  onClick (event) {
    audioRefRadio.play();
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name,
      isdisable: false,
    });
  },
  restart () {
    this.setData({
      score: 0,
      radio: '-1',
      condition: false,
      show: false,
      judge: '正确',
      submit_text: '下一题',
      index: 0,
    });
    audioRefRadio.play();
    audioRef.pause();
    audioRef.seek(0);
  },

  // 训练结束发送成绩
  sendscore () {
    const p1 = request({
      url: '/v1/exercise/add',
      data: { exTime: 0, exType: 2, score: this.data.score },
      method: 'POST',

    });
    p1.then(() => { console.log('push successfully'); }, () => { console.log('push fail'); });
  },

  onLoad: function () {
    // 初始化音频文件
    audioRef.obeyMuteSwitch = false; // 是否遵循系统静音原则
    audioRef.src = this.data.audio_src; // 音频地址
    audioRefRadio.src = 'http://gaofeifei.3vfree.cn/anniu/click.mp3';
    audioRefFalse.src = 'http://gaofeifei.3vfree.cn/anniu/fault.mp3';
    audioRefTrue.src = 'http://gaofeifei.3vfree.cn/anniu/victory.mp3';
    const p2 = request({
      url: '/v1/problem/get',
      method: 'post',
      data: {
        subNumber: 0,
        objNumber: 0,
        picNumber: 10,
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
    });
    p2.then((res) => {
      for (const item in res.data.data) {
        let a = res.data.data[item].checks;
        a = a.slice(1, a.length - 1);
        const arr1 = a.split(',');
        for (let i = 0; i < arr1.length; i++) {
          arr1[i] = arr1[i].slice(1, arr1[i].length - 1);
        }
        res.data.data[item].checks = arr1;
      }
      this.setData({ question_obj: res.data.data, isloading: false });
    },
    () => { this.setData({ isloading: true }); });
  },
});
