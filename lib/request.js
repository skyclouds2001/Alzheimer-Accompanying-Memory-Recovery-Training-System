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

const baseurl = 'http://www.thylovezj.space';
// const baseurl = 'http://43.138.103.83:8080';
// const baseurl = 'https://8fc6-111-18-45-56.jp.ngrok.io';

/**
 * 对wx.request()的包装方法，允许自定义host，可使用默认的host
 * @param {RequestParams} params 请求参数表
 * @param {string} host 请求host
 * @returns {Promise<object>}
 */
const request = (params, host = baseurl) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: host + params.url,
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
