import { request } from '../lib/request';

/**
 * 添加备忘录
 * @param {string} token
 * @param {string} title 备忘录标题
 * @param {string} content 备忘录内容
 */
export const addMemorandum = async (token, title, content) => {
  try {
    const { data: res } = await request({
      url: '/v1/memorandum/add',
      method: 'POST',
      header: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data: {
        title,
        content,
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

/**
 * 删除备忘录
 * @param {string} token
 * @param {string} id 备忘录ID
 */
export const removeMemorandum = async (token, id) => {
  try {
    const { data: res } = await request({
      url: `/v1/memorandum/delete/${id}`,
      method: 'POST',
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
 * 获取备忘录简略信息
 * @param {string} token
 */
export const getSimpleMemorandum = async (token) => {
  try {
    const { data: res } = await request({
      url: '/v1/memorandum/get/simple',
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
 * 获取备忘录详细信息
 * @param {string} token
 * @param {string} id 备忘录ID
 */
export const getDetailMemorandum = async (token, id) => {
  try {
    const { data: res } = await request({
      url: `/v1/memorandum/get/detail/${id}`,
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
 * 获取备忘录搜索结果
 * @param {string} token
 * @param {string} search 搜索关键词
 */
export const getSearchMemorandum = async (token, search) => {
  try {
    const { data: res } = await request({
      url: `localhost:8080/v1/memorandum/get/${search}`,
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
