import { request } from './../lib/request';

/**
 * 获取长谷川问题
 * @param {string} token
 */
export const getHasegawaQuestion = async (token) => {
  try {
    const { data: res } = await request({
      url: '/v1/problem/getcgc',
      method: 'GET',
      header: {
        Authorization: token,
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
 * 获取其他类型问题
 * @param {string} token
 */
export const getQuestion = async (token, sub = 0, obj = 0, pic = 0) => {
  try {
    const { data: res } = await request({
      url: '/v1/problem/get',
      method: 'POST',
      header: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data: {
        subNumber: sub,
        objNumber: obj,
        picNumber: pic,
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
