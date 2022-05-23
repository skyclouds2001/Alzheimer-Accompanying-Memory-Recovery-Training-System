/**
 * 训练记录的颜色
 */
const colors = [
  'rgb(87,184,172)',
  'rgb(166,166,166)',
  'rgb(68,117,199)',
  'rgb(88,158,219)',
  'rgb(230,130,53)',
  'rgb(110,174,70)',
  'rgb(115,51,153)',
];

Page({

  data: {
    /**
     * 训练记录
     */
    trainRecord: [
      {
        date: '2022年5月1日',
        text: '跑步60分钟',
        id: 0,
      },
      {
        date: '2022年5月1日',
        text: '跑步60分钟',
        id: 1,
      },
      {
        date: '2022年5月1日',
        text: '跑步60分钟',
        id: 2,
      },
    ],
  },

  onLoad () {
    const { trainRecord: record } = this.data;
    const len = colors.length;
    record.sort((a, b) => a.id < b.id);

    this.setData({
      trainRecord: record.map((item, index) => {
        item.direction = index % 2;
        item.color = colors[index % len];
        return item;
      }),
    });
  },

});
