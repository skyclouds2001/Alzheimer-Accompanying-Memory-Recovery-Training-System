# 阿尔兹海默症陪伴型记忆恢复训练系统

## 项目资料

- 产品文档
  参见 https://otkyd4jmkr.feishu.cn/docs/doccnziWkIfyYHZbt7CiwN4j7Bg
- 接口文档
  参见 <暂无>
- 页面文档
  参加 https://otkyd4jmkr.feishu.cn/docs/doccnZaTQiQ8QIuf9nC07IPIx5f
- git 仓库
  参见 https://github.com/skyclouds2001/Alzheimer-Accompanying-Memory-Recovery-Training-System.git
  此仓库为私有仓库，需向仓库所有者申请访问及编辑权限
- 网易云音乐API
  请求host https://api.xaneon.com
  接口文档 https://neteasecloudmusicapi.vercel.app/

## 项目结构

- api 接口方法目录（主要关于与后端交互的接口方法的模块）
- components 项目组件目录
  - tabs 导航栏
- docs 项目文档目录
- images 本地图片目录
- icons 本地图标目录
- lib 公共方法目录（主要关于对wx原生方法包装的模块）
  - request.js 包装HTTPS请求方法
- pages 项目页面目录
  - index 首页
  - evaluate 病情评定模块
  - agnosia 失认症恢复模块
  - apraxia 失用症恢复模块
    - sports 手指训练列表
    - vedio 训练视频播放
    - index 音乐治疗列表
    - list 歌单列表
    - mysong 我的收藏歌曲
    - play 歌曲播放
  - mine 个人中心|我的
  - checkin 每日打卡
  - logs 日志【不用管它】
- style 共用样式表目录
- utils 工具目录（主要关于外部导入的模块）
  - util.js 时间格式化
- app.js
- app.json
- app.wxss

## 项目初始化

- 预先安装node/npm并配置node/npm的系统变量

- 根目录运行命令行

  ```shell
  npm install
  ```

  安装npm下的所有依赖包

- 小程序开发工具菜单
  工具-构建npm

## 项目插件

- 使用vant

  参考 https://vant-contrib.gitee.io/

  以使用van-button为例

  - 页面json文件配置

  ```json
  {
    "usingComponents": {
      "van-button": "@vant/weapp/button/index"
    }
  }
  ```

  - 页面wxml文件使用

  ```html
  <van-button type="default">默认按钮</van-button>
  ```

- 使用 eslint

  在开发者工具内安装 eslint 扩展，在编辑时实时检测代码格式化
  格式化js文件

  参考 https://eslint.bootcss.com/

  项目根目录使用终端或命令行运行命令行

  ```shell
  npm run lint
  ```

  自动检测代码并尝试进行代码格式化

## 项目设定

- 总体色调
  Green    `#044937`    `#47B961`    `#e5f5f1`
  可以根据需要在合适范围内自行调整颜色

- background 背景
  背景色 `#e4fce7`

- tabbar 标签栏
  选中配色 `#158261`    未选中配色 `#2c2c2c`
  首页    我的/个人中心
  暂时使用系统默认标签栏

- navigator 导航栏
  暂时使用系统默认导航栏

- 小程序基础库版本
  `2.23.4`

- DEBUG模式
  临时在app.json中开启debug模式，方便后续调试（发布时应当移除！！！）

- 请求
  请求时需在 header 内添加 token 字段
  请求成功判断方法根据 code 字段：成功-10000；失败-其他

- globalData 设定
  openid
  token

- Storage 设定
  openid
  token
  userinfo
  logs

## TODO
- 失认症治疗模块：需要回传问题id
