Page({
  data: {
    tabs: [],
    activeTab: 0,
    images:["https://hbimg.huabanimg.com/51077c88f252df0325125fd3106150f67cb9ceb2113a70-Wt3sW6_fw658/format/webp",
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhiphotos.baidu.com%2Ffeed%2Fpic%2Fitem%2Fb7fd5266d01609240822a64fde0735fae6cd345a.jpg&refer=http%3A%2F%2Fhiphotos.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652790230&t=9a05ecb4fac75240d56cf3bcda284e67",
"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.itc.cn%2Fq_70%2Fimages03%2F20210119%2Fda56094dfa6b42759be9de4e7bb8bde0.gif&refer=http%3A%2F%2Fp2.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652790813&t=f99b09a60c096978f1713852b4b942ed",
"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs9.rr.itc.cn%2Fr%2FwapChange%2F20174_25_9%2Fa25tmo3651237248619.jpg&refer=http%3A%2F%2Fs9.rr.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652790579&t=2cd68b078f436823b0a73bd4bb066281",
"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0195c25ad06c98a801213867c1df65.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652791281&t=cc3d55c1985ffb50b3d7db7a204a5bf1",
"https://img1.baidu.com/it/u=783185777,3177755829&fm=253&fmt=auto&app=138&f=GIF?w=640&h=497",
"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F02f1a6563c52dd00000127203b797c.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652791544&t=0903a12a9c9f6ab074fdb6c659039b7f",
"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg4.333cn.com%2Fimg333cn%2F2018%2F05%2F16%2F1526458003477.jpg&refer=http%3A%2F%2Fimg4.333cn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652791878&t=1b63ff0277d647a1fddc322a30272706"]
  },

  onLoad() {
    const titles = ['病情评定', '线上预约挂号', '失认症恢复训练', '失用症恢复训练', '每日打卡', '紧急呼叫', '个人中心', '更多']
    const tabs = titles.map(item => ({title: item}))
    this.setData({tabs})
  },

  onTabCLick(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({activeTab: index})
  }

})
