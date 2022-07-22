/**
 * @function
 * @description 微信小程序自带的格式化时间方法
 * @param {Date} date
 * @returns {string}
 */
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

/**
 * @function
 * @description 微信小程序自带的格式化数字方法，将一位数字与二位数字统一为二位数字
 * @param {number} n
 * @returns {string}
 */
const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

module.exports = {
  formatTime,
  formatNumber,
};
