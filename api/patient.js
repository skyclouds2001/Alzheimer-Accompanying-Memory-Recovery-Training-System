import { request } from './../lib/request';

/**
 * 绑定病患关系
 * @param {string} token （子女端token）
 * @param {string} openid （患者端openid）
 */
export const bindRelation = async (token, openid) => {
  try {
    const { data: res } = await request({
      url: '/v1/patient/bind',
      method: 'POST',
      header: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data: {
        openId: openid,
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
 * 完善老人信息
 * @param {string} token
 */
export const putPatientInfo = async (token, info) => {
  try {
    const { data: res } = await request({
      url: '/v1/patient',
      method: 'PUT',
      header: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data: {
        openId: info.openid,
        age: info.age,
        address: info.address,
        province: info.province,
        eduBackground: info.edu,
        childPhotos: info.imgs,
        pname: info.name,
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
