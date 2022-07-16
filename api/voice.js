import { request } from './../lib/request';

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
