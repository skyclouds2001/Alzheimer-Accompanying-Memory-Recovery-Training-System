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
    content: alldata[0].name,
    score: 3,
    choice: [
      alldata[0].checks[0],
      alldata[0].checks[1],
      alldata[0].checks[2],
      alldata[0].checks[3],
    ],
    key: alldata[0].answer,//后端给的答案的是数字，例如：1 对应 A
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 2,
    type: 2,
    content: alldata[1].name,
    score: 2.5,
    choice: [
      alldata[1].checks[0],
      alldata[1].checks[1],
      alldata[1].checks[2],
      alldata[1].checks[3],
    ],
    key: alldata[1].answer,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 3,
    type: 2,
    content: alldata[2].name,
    score: 2,
    choice: [
      alldata[2].checks[0],
      alldata[2].checks[1],
      alldata[2].checks[2],
      alldata[2].checks[3],
    ],
    key: alldata[2].answer,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 4,
    type: 6,
    content: alldata[3].name,
    score: 2.5,
    choice: [
      alldata[3].checks[0],
      alldata[3].checks[1],
      alldata[3].checks[2],
      alldata[3].checks[3],
    ],
    key: alldata[3].answer,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 5,
    type: 2,
    content: alldata[4].name,
    score: 2.5,
    choice: [
      alldata[4].checks[0],
      alldata[4].checks[1],
      alldata[4].checks[2],
      alldata[4].checks[3],
    ],
    key: alldata[4].answer,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 6,
    type: 1,
    content: alldata[5].name,
    score: 3.5,
    choice: [
      alldata[5].checks[0],
      alldata[5].checks[1],
      alldata[5].checks[2],
      alldata[5].checks[3],
    ],
    key: alldata[5].answer,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 7,
    type: 1,
    content: alldata[6].name,
    score: 3,
    choice: [
      alldata[6].checks[0],
      alldata[6].checks[1],
      alldata[6].checks[2],
      alldata[6].checks[3],
    ],
    key: alldata[6].answer,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 8,
    type: 1,
    content: alldata[7].name,
    score: 3,
    choice: [
      alldata[7].checks[0],
      alldata[7].checks[1],
      alldata[7].checks[2],
      alldata[7].checks[3],
    ],
    key: alldata[7].answer,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 9,
    type: 1,
    content: alldata[8].name,
    score: 2,
    choice: [
      alldata[8].checks[0],
      alldata[8].checks[1],
      alldata[8].checks[2],
      alldata[8].checks[3],
    ],
    key: alldata[8].answer,
    info: null,
    img: null,
    answer: null,
  },
  {
    id: 10,
    type: 1,
    content: alldata[9].name,
    score: 2,
    choice: [
      alldata[9].checks[0],
      alldata[9].checks[1],
      alldata[9].checks[2],
      alldata[9].checks[3],
    ],
    key: alldata[9].answer,
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
      alldata[10].checks[0],
      alldata[10].checks[1],
      alldata[10].checks[2],
      alldata[10].checks[3],
    ],
    key: alldata[10].answer,
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
      alldata[11].checks[0],
      alldata[11].checks[1],
      alldata[11].checks[2],
      alldata[11].checks[3],
    ],
    key: alldata[11].answer,
    info: '以下哪个是刚才出现的数字的倒置序列？',
    img: null,
    answer: null,
  },
  {
    id: 13,
    type: 5,
    content: '请观察以下物品',
    score: 2.5,
    choice: [
      alldata[12].checks[0],
      alldata[12].checks[1],
      alldata[12].checks[2],
      alldata[12].checks[3],
    ],
    key: alldata[12].answer,
    info: '以下哪个是刚才消失的物品？',
    img: [
      '/images/cigarette.png',
      '/images/key.png',
      '/images/match.png',
      '/images/pen.png',
      '/images/watch.png',
    ],
    answer: null,
  },
];

export default question;
