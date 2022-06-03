/**
 * @file request.js
 * @author CSY
 */

/**
 * @typedef {Object} RequestParams
 * @property {string} url
 * @property {string} method
 * @property {string | object} data
 * @property {object} header
 * @description 包装request方法传参规范
 */

/**
  * @type {string}
  * @description Host
  */

// const baseurl = 'http://www.thylovezj.space';
const baseurl = 'http://43.138.103.83:8080';
// const baseurl = 'https://8fc6-111-18-45-56.jp.ngrok.io';

/**
 * @function
 * @description 对wx.request()的包装方法，自动添加url的host
 * @param {RequestParams} params
 * @returns {Promise<object>}
 */
const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseurl + params.url,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      },
    });
  });
};

module.exports = {
  request,
};
