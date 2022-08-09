import { request } from './../lib/request';

/**
 * 获取新闻列表
 * @param {string} token
 * @param {number} num 页数
 * @param {number} size 各页记录数量
 */
export const getNews = async (token, num = 1, size = 10) => {
  try {
    const { data: res } = await request({
      url: '/v1/news/get',
      method: 'GET',
      header: {
        Authorization: token,
      },
      data: {
        pageNum: num,
        pageSize: size,
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
