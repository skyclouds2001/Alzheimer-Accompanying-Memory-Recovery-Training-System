/**
 * @typedef Question
 * @type {Object}
 * @property {number} id 问题id
 * @property {1 | 2 | 3 | 4 | 5 | 6} type 问题类型
 * * 1 - 选择题-选项完全固定
 * * 2 - 选择题-选项内容与用户信息有关
 * * 3 - 选择题-选项内容随时间改变
 * * 4 - 选择题-存在提示信息
 * * 5 - 选择题-存在图片消失
 * * 6 - 文字语音答题-文字输入或语音输入
 * @property {string} content 问题题干
 * @property {number} score 问题分值
 * @property {number | string | null} answer 用户回答（type=1|2|3|4|5为number）（type=6为string）
 * @property {string[4] | null} choice 问题选项（type=1|4|5 有默认值）（type=2|3 需要自动生成）
 * @property {1 | 2 | 3 | 4 | null} key 问题答案（type=1|4 有默认值）（type=2|3|5 需要自动生成）
 * @property {string | null} info 问题提示信息（type=4 存在）
 * @property {string[4] | null} img 问题图片链接（type=5 存在）
 */

/**
 * 长谷川问题列表
 * @type {Question[]}
 */
const question = [
  {
    id: 1,
    type: 3,
    content: '今天是几月几号？',
    score: 3,
    choice: null,
    key: null,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 2,
    type: 2,
    content: '您家位置在哪？',
    score: 2.5,
    choice: null,
    key: null,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 3,
    type: 2,
    content: '您多大岁数？',
    score: 2,
    choice: null,
    key: null,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 4,
    type: 6,
    content: '最近发生了什么事情？',
    score: 2.5,
    choice: null,
    key: null,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 5,
    type: 2,
    content: '您出生在哪里？',
    score: 2.5,
    choice: null,
    key: null,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 6,
    type: 1,
    content: '中华人民共和国成立年份是哪一年？',
    score: 3.5,
    choice: [
      '1911',
      '1945',
      '1949',
      '1978',
    ],
    key: 3,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 7,
    type: 1,
    content: '一年有几个月，一小时有多少分钟？',
    score: 3,
    choice: [
      '12 12',
      '12 60',
      '60 12',
      '60 60',
    ],
    key: 2,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 8,
    type: 1,
    content: '国家现任总理是谁？',
    score: 3,
    choice: [
      '李克强',
      '温家宝',
      '朱镕基',
      '李鹏',
    ],
    key: 1,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 9,
    type: 1,
    content: '计算100-7',
    score: 2,
    choice: [
      '83',
      '93',
      '103',
      '107',
    ],
    key: 2,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 10,
    type: 1,
    content: '计算93-7',
    score: 2,
    choice: [
      '100',
      '93',
      '86',
      '84',
    ],
    key: 3,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 11,
    type: 4,
    content: '请在三秒内记住以下数字6、8、2',
    score: 2,
    choice: [
      '2、6、8',
      '2、8、6',
      '8、6、2',
      '6、2、8',
    ],
    key: 2,
    info: '以下哪个是刚才出现的数字的倒置序列？',
    img: null,
    answer: null,
  },
  {
    id: 12,
    type: 4,
    content: '请在三秒内记住以下数字3、5、2、9',
    score: 2,
    choice: [
      '3、5、2、9',
      '9、2、3、5',
      '9、5、2、3',
      '9、2、5、3',
    ],
    key: 4,
    info: '以下哪个是刚才出现的数字的倒置序列？',
    img: null,
    answer: null,
  },
  {
    id: 13,
    type: 5,
    content: '请观察以下物品',
    score: 2.5,
    choice: null,
    key: null,
    info: '以下哪个是刚才消失的物品？',
    img: [
      './../images/cigarette.png',
      './../images/key.png',
      './../images/match.png',
      './../images/pen.png',
      './../images/watch.png',
    ],
    answer: null,
  },
];

export default question;
