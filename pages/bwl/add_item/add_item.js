import Toast from '@vant/weapp/toast/toast';

import { addMemorandum } from './../../../api/memorandum';

const token = wx.getStorageSync('token');

Page({

  data: {
    /** 备忘录标题 */
    title: '',
    /** 备忘录内容 */
    content: '',
  },

  /**
   * 提交备忘录表单
   */
  async handleSubmit () {
    const { title, content } = this.data;
    if (!title.trim()) return Toast.fail('');
    if (!content.trim()) return Toast.fail('');

    try {
      const res = await addMemorandum(token, title.trim(), content.trim());
      if (res) {
        Toast.success('提交成功');
        this.setData({
          title: '',
          content: '',
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          });
        }, 1500);
      } else {
        Toast.fail('提交失败');
      }
    } catch (err) {
      console.error(err);
      Toast.fail('提交失败');
    }
  },

});
