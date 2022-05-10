/**
 * @typedef {Object} Logs
 * @property {string} date 打卡日期 eg:`2022-01-03`
 * @property {Log[]} logs 打卡记录组（对应日期）
 */
/**
 * @typedef {Object} Log
 * @property {string} time 打卡时间 eg:`12:23:54`
 * @property {string} content 打卡内容
 */

Component({

  properties: {
    /**
     * 打卡记录
     * @type {Logs[]}
     */
    record: {
      type: Array,
      default: [],
    },
  },

});
