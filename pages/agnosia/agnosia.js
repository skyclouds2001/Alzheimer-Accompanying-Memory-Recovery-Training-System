// pages/recognize/recognize.js

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
    // 图片显示
    image_src: [
      'https://img.yzcdn.cn/vant/cat.jpeg',
      'https://s1.ax1x.com/2022/04/20/LrX6N6.jpg',
      'https://s1.ax1x.com/2022/04/20/Lrj9U0.jpg',
      'https://s1.ax1x.com/2022/04/29/LjNiWV.png',
    ],
    // 选项模块
    chose: [
      ['猫 cat', '狗 dog', '猪 pig', '牛 cow'],
      ['熊猫 pandas', '猪 pig', '狗 dog', '西瓜'],
      ['熊猫 pandas', '牛 cow', '兔子 rabbit', '苹果'],
      ['1', '2', '5', '9'],
    ],
    // 答案
    answer: ['1', '3', '1', '4'],
    // 成绩
    score: 0,
    radio: '-1',
    audio_src:
      'http://aimg8.dlszyht.net.cn/ueditor/file/823/1644869/1553422829215244.mp3',
  },

  // 点击submit按钮事件
  change () {
    audioRefRadio.play();
    // 点击下一题
    if (this.data.index < this.data.answer.length - 1) {
      if (this.data.radio === this.data.answer[this.data.index]) {
        this.setData({ judge: '正确' });
        this.setData({ score: this.data.score + 1 });
        audioRefTrue.play();
      } else {
        this.setData({ judge: '错误' });
        audioRefFalse.play();
      }
      this.setData({ show: true });
      setTimeout(this.disappear, 2000);
    } else { // 点击提交，算成绩放音乐
      if (this.data.radio === this.data.answer[this.data.index]) {
        audioRefTrue.play();
        this.setData({ score: this.data.score + 1 });
      } else {
        audioRefFalse.play();
      }
      audioRef.play();
      this.setData({ condition: true });
    }
  },

  disappear () {
    this.setData({ show: false });
    this.setData({ index: this.data.index + 1 });
    this.setData({ radio: '-1', isdisable: true });
    if (this.data.index === this.data.answer.length - 1) {
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
  onLoad: function () {
    // 初始化音频文件
    audioRef.obeyMuteSwitch = false; // 是否遵循系统静音原则
    audioRef.src = this.data.audio_src; // 音频地址
    audioRefRadio.src = 'http://gaofeifei.3vfree.cn/anniu/click.mp3';
    audioRefFalse.src = 'http://gaofeifei.3vfree.cn/anniu/fault.mp3';
    audioRefTrue.src = 'http://gaofeifei.3vfree.cn/anniu/victory.mp3';
  },
});
