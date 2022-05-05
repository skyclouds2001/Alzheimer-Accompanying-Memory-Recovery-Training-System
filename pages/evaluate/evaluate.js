let qnumber = 1; // （题目序号）特重要的参数，依托此来展示题目和选项
let q11record = 0; // 用来判断第11题的延时是否已经激活过一次了，下面两个也是如此
let q12record = 0;
let q13record = 0;
const q13picturedisappear = 3; // 让第13题的某一图片随机消失，数字为几即第几张图片消失
const respondentanswer = []; // 用来记录作答者答案的数组
const wt1 = '1.今天是几月几号？'; // 问题的组
const wt2 = '2.您家位置在哪？';
const wt3 = '3.您多大岁数？';
const wt4 = '4.最近发生了什么事情？';
const wt5 = '5.您出生在哪里？';
const wt6 = '6.中华人民共和国成立年份';
const wt7 = '7.一年有几个月，一小时有多少分钟？';
const wt8 = '8.国家现任总理是谁？';
const wt9 = '9.计算100-7';
const wt10 = '10.计算93-7';
const wt11 = '11.以下哪个是刚才出现的数字的倒置序列'; // 下面3题的题目会随时间变化一次（注意答题按钮要消失一段时间）
const iwt11 = '11.在三秒内记住以下数字6、8、2';

const wt12 = '12.以下哪个是刚才出现的数字的倒置序列';
const iwt12 = '12.在三秒内记住以下数字3、5、2、9';

const wt13 = '13.什么东西不见了';
const iwt13 = '13.在三秒内观察以下物品';

Page({
  data: {
    serialNumber: '1', // 题目序号
    question: wt1,
    an1: 'a', // 四个选项展示的内容
    an2: 'b',
    an3: 'c',
    an4: 'd',
    previous: '上一题', // 第一题时不显示（框子也要弄掉）
    next: '下一题', // 到最后一题要变成提交
    button1: '', // 上一题和下一题的按钮的样式（为了改点击特效而设）
    button2: '',
    ans1: '', // 四个按钮的样式（为了选中时变色而设）
    ans2: '',
    ans3: '',
    ans4: '',
    fillblank: '', //* **它存着填空题输入的内容
    ans: true, // 用来在某些情况隐藏四个选项框
    shangyiti: false, // 在第一题时隐藏"上一题"按钮
    blankjudge: false,
    qpicture: false,
    qpicture1: true,
    qpicture2: true,
    qpicture3: true,
    qpicture4: true,
    qpicture5: true,
    nextq: true,
  },

  onLoad: function () {
    qnumber = 1;
    q11record = 0;
    q12record = 0;
    q13record = 0;
    respondentanswer.length = 0;
    console.log('页面加载完成，参数已重置');
  },

  buttondouble () {
    // 点击两个按钮的任意一个都会触发此项
    if (qnumber === 2) {
      this.shangyiti = true;
    } else if (qnumber === 1) {
      this.shangyiti = false;
    }
    switch (
      qnumber // 问题的组，***选项也可加进来
    ) {
      case 1:
        this.question = wt1;
        break;
      case 2:
        this.question = wt2;
        break;
      case 3:
        this.question = wt3;
        break;
      case 4:
        this.question = wt4;
        break;
      case 5:
        this.question = wt5;
        break;
      case 6:
        this.question = wt6;
        break;
      case 7:
        this.question = wt7;
        break;
      case 8:
        this.question = wt8;
        break;
      case 9:
        this.question = wt9;
        break;
      case 10:
        this.question = wt10;
        break;
      case 11:
        if (q11record !== 0) {
          this.question = wt11;
        }
        break;
      case 12:
        if (q12record !== 0) {
          this.question = wt12;
        }
        break;
      case 13:
        if (q13record !== 0) {
          this.question = wt13;
        }
        break;
    }
    if (qnumber === 4) {
      this.ans = false;
      this.blankjudge = true;
    } else if (qnumber === 11 && q11record === 0) { // 根据题目的特征来修改相应情况
      this.question = iwt11;
      this.nextq = false;
      this.shangyiti = false;
      setTimeout(() => {
        this.question = wt11;
        this.nextq = true;
        this.shangyiti = true;
      }, 3000);
      q11record = 1;
    } else if (qnumber === 12 && q12record === 0) { // 变化只激活一次，用此来记录是否已激活过
      this.question = iwt12;
      this.nextq = false;
      this.shangyiti = false;
      setTimeout(() => {
        this.question = wt12;
        this.nextq = true;
        this.shangyiti = true;
      }, 3000);
      q12record = 1;
    } else if (qnumber === 13 && q13record === 0) {
      this.question = iwt13;
      this.qpicture = true;
      this.nextq = false;
      this.shangyiti = false; // 3秒后消失一张图片，5秒后可以作答
      setTimeout(() => {
        this.question = wt13;
        this.qpicture = false;
        this.nextq = true;
        this.shangyiti = true;
      }, 5000);
      setTimeout(() => {
        switch (
          q13picturedisappear // 最后一题，消失一张图片
        ) {
          case 1:
            this.qpicture1 = false;
            break;
          case 2:
            this.qpicture2 = false;
            break;
          case 3:
            this.qpicture3 = false;
            break;
          case 4:
            this.qpicture4 = false;
            break;
          case 5:
            this.qpicture5 = false;
            break;
        }
      }, 3000);
      q13record = 1;
    } else {
      this.ans = true;
      this.blankjudge = false;
      this.qpicture = false;
    }
  },
  butt1 () {
    // 点击**"上一题"时触发此项
    qnumber = qnumber - 1; //* **点击上一题时要展示所选项（关联题号qnumber就好），要求储存已作答数据
    this.serialNumber = qnumber;
    if (qnumber !== 13) {
      this.next = '下一题';
    }
    if (respondentanswer[qnumber] === 'A') {
      this.ans1 = 'background:#d0dedb'; // 展示已作答的选项（点击上一题时使已作答的选项处于已点击态）
      this.ans2 = 'background:#ffffff';
      this.ans3 = 'background:#ffffff';
      this.ans4 = 'background:#ffffff';
    } else if (respondentanswer[qnumber] === 'B') {
      this.ans2 = 'background:#d0dedb';
      this.ans1 = 'background:#ffffff';
      this.ans3 = 'background:#ffffff';
      this.ans4 = 'background:#ffffff';
    } else if (respondentanswer[qnumber] === 'C') {
      this.ans3 = 'background:#d0dedb';
      this.ans2 = 'background:#ffffff';
      this.ans1 = 'background:#ffffff';
      this.ans4 = 'background:#ffffff';
    } else if (respondentanswer[qnumber] === 'D') {
      this.ans4 = 'background:#d0dedb';
      this.ans2 = 'background:#ffffff';
      this.ans3 = 'background:#ffffff';
      this.ans1 = 'background:#ffffff';
    } else {
      this.ans2 = 'background:#ffffff';
      this.ans1 = 'background:#ffffff';
      this.ans3 = 'background:#ffffff';
      this.ans4 = 'background:#ffffff';
    }
  },
  butt2 () {
    //* *点击"下一题"时触发此项
    qnumber = qnumber + 1;
    this.serialNumber = qnumber;
    if (qnumber >= 13) {
      this.serialNumber = '13';
    }
    if (qnumber === 13) {
      this.next = '提交问卷';
    }
    if (qnumber === 14) {
      wx.redirectTo({ url: '../report of Hasegawa/report of Hasegawa' });
    }
    if (respondentanswer[qnumber] === 'A') {
      this.ans1 = 'background:#d0dedb'; // 展示已作答的选项（点击下一题时使已作答的选项处于已点击态）
      this.ans2 = 'background:#ffffff';
      this.ans3 = 'background:#ffffff';
      this.ans4 = 'background:#ffffff';
    } else if (respondentanswer[qnumber] === 'B') {
      this.ans2 = 'background:#d0dedb';
      this.ans1 = 'background:#ffffff';
      this.ans3 = 'background:#ffffff';
      this.ans4 = 'background:#ffffff';
    } else if (respondentanswer[qnumber] === 'C') {
      this.ans3 = 'background:#d0dedb';
      this.ans2 = 'background:#ffffff';
      this.ans1 = 'background:#ffffff';
      this.ans4 = 'background:#ffffff';
    } else if (respondentanswer[qnumber] === 'D') {
      this.ans4 = 'background:#d0dedb';
      this.ans2 = 'background:#ffffff';
      this.ans3 = 'background:#ffffff';
      this.ans1 = 'background:#ffffff';
    } else {
      this.ans2 = 'background:#ffffff';
      this.ans1 = 'background:#ffffff';
      this.ans3 = 'background:#ffffff';
      this.ans4 = 'background:#ffffff';
    }
  },
  button1a1 () {
    // 实现两按钮的点击特效（手指触摸变色，离开恢复原色）
    this.button1 = 'background:#dad9d8';
  },
  button1a2 () {
    this.button1 = 'background:#f9f9fa';
  },
  button2a1 () {
    this.button2 = 'background:#47B961';
  },
  button2a2 () {
    this.button2 = 'background:#51d36d';
  },
  answer1 () {
    //* *选项a被点击触发此项
    this.ans1 = 'background:#d0dedb'; // 下面依次是b c d选项的点击事件
    this.ans2 = 'background:#ffffff';
    this.ans3 = 'background:#ffffff';
    this.ans4 = 'background:#ffffff';
    respondentanswer[qnumber] = 'A';
  },
  answer2 () {
    this.ans2 = 'background:#d0dedb';
    this.ans1 = 'background:#ffffff';
    this.ans3 = 'background:#ffffff';
    this.ans4 = 'background:#ffffff';
    respondentanswer[qnumber] = 'B';
  },
  answer3 () {
    this.ans3 = 'background:#d0dedb';
    this.ans1 = 'background:#ffffff';
    this.ans2 = 'background:#ffffff';
    this.ans4 = 'background:#ffffff';
    respondentanswer[qnumber] = 'C';
  },
  answer4 () {
    this.ans4 = 'background:#d0dedb';
    this.ans1 = 'background:#ffffff';
    this.ans2 = 'background:#ffffff';
    this.ans3 = 'background:#ffffff';
    respondentanswer[qnumber] = 'D';
  },
});
