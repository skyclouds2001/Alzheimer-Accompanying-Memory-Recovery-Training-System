import { request } from './../lib/request';

/**
 * 获取用户对应的子女声音 文件URL
 * @param {string} token
 */
export const getVoice = async (token) => {
  try {
    const { data: res } = await request({
      url: '/v1/voice',
      method: 'GET',
      header: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      data: {},
    });
    if (res.status === 10000) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(new Error(res.message));
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * 添加用户对应的子女声音 文件URL
 * @param {string} token
 * @param {string} url 音频临时文件 URL
 */
export const postVoice = async (token, url) => {
  try {
    const { data: res } = await request({
      url: '/v1/voice',
      method: 'POST',
      header: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      data: {
        url: url,
      },
    });
    if (res.status === 10000) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(new Error(res.message));
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
