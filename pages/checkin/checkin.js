Page({

  data: {
    url: './../../images/psc.jpg',
    clock: 0,
    minDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    defaultDate: [
      new Date().getTime(),
    ],
    formatter: function (day) {
      return day;
    },
  },

  onLoad: function () {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = new Date(year, month + 1, 0).getDate();
    this.setData({
      minDate: new Date(year, month, 1).getTime(),
      maxDate: new Date(year, month, day).getTime(),
    });
  },

});
