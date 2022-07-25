# 阿尔兹海默症陪伴型记忆恢复训练系统

## 项目资料

- 产品文档
  - https://otkyd4jmkr.feishu.cn/docs/doccnziWkIfyYHZbt7CiwN4j7Bg
- 后端 HOST
  - http://www.thylovezj.space
  - http://43.138.103.83:8080  [测试]
  - https://8fc6-111-18-45-56.jp.ngrok.io  [测试]
- 接口文档
  - https://www.apifox.cn/web/project/977035
- UI 文档
  - https://otkyd4jmkr.feishu.cn/docs/doccncy0NdQd5nXGJsIgA829AKd
- git 仓库
  - https://github.com/skyclouds2001/Alzheimer-Accompanying-Memory-Recovery-Training-System
- 网易云音乐 API
  - 请求host https://api.xaneon.com
  - 接口文档 https://neteasecloudmusicapi.vercel.app/
- 微信生成二维码库 wx-qr
  - https://github.com/liuxdi/wx-qr
- 开发者 Github
  - 陈思远 https://github.com/skyclouds2001
  - 高飞 https://github.com/s5das
  - 王家祥 https://github.com/wjx213
  - 李响 https://github.com/lanx-i
  - 邵昕晨 https://github.com/Ice-cream17935
  - 唐浩瑜 https://github.com/THYLOVEZJ
  - 米国良 https://github.com/MglKsy
  - 李欣悦 https://github.com/Unknownlxy
  - ~~ 陈家欢 https://github.com/orangenuinee ~~

## 项目结构

- api 接口方法目录（主要关于与后端交互的接口方法的模块）
  - album.js 相册接口
  - checkin.js 打卡接口
  - exercise.js 训练接口
  - gesture.js 百度云结果识别接口
  - memorandum.js 备忘录接口
  - music.js 音乐接口
  - news.js 新闻接口
  - patient.js 病人接口
  - question.js 问题接口
  - voice.js 声音接口
- components 项目组件目录
  - menu 菜单
  - timeline 时间轴
  - new-tabbar 类 tabbar 组件
- custom-tab-bar 自定义tabbar目录
- data 数据及设定目录
  - auctiongoods.js 商城商品信息
  - baiducloud.js 百度云API设定
  - cloudmusic.js 网易云音乐APIcookie
  - patientinfo.js 示例病人信息
  - sportvideo.js 手指训练视频及封面URL
- docs 项目文档目录
- images 本地图片目录（未来部分图片应放到云图床上）
- icons 本地图标目录
- lib 公共方法目录（主要关于对wx原生方法包装的模块）
  - request.js 包装HTTPS请求方法
- pages 项目页面目录
  - index 登录首页 `高飞`
  - patient 患者端 | 诊断模块首页 `陈思远`
    - consultation 线上问诊 `邵昕晨`
  - bwl 患者端 | 备忘录 `高飞`
    - add_item 添加备忘录 `高飞`
    - detail 备忘录详情 `高飞`
  - evaluate 患者端 | 病情评定 `李响=>陈思远`
    - init 开始答题 `陈思远` 
    - main 反馈结果页 `李响=>陈思远`
  - train 患者端 | 训练模块首页 `陈思远`
  - agnosia 患者端 | 失认症恢复模块 `高飞`
  - apraxia 患者端 | 失用症恢复模块 `邵昕晨`
    - sports 手指训练列表 `邵昕晨`
    - vedio 训练视频播放 `邵昕晨`
    - index 音乐治疗列表 `邵昕晨`
    - list 歌单列表 `邵昕晨`
    - mysong 我的收藏歌曲 `邵昕晨`
    - play 歌曲播放 `邵昕晨`
    - testing 手势检测 `邵昕晨`
  - checkin 患者端 | 每日打卡 `陈思远`
  - mine 患者端 | 个人中心 | 我的 `陈思远`
    - patient-info 个人信息 `陈思远`
    - auction 积分商城 `陈思远`
    - problem-feedback 问题反馈 `陈思远`
    - about 关于我们 `陈思远`
  - recall_mode 回忆模式 `高飞`
  - train-record 患者端&子女端 | 训练记录 `陈思远`
  - family 子女端 | 首页 `高飞`
    - adscience AD科普 `李响`
    - latest_diagnosis 最新诊断 `李响`
    - Recalltime 回忆时光 `李响`
    - submitinfo 完善患者信息 `高飞`
    - voice 录入语音 `邵昕晨`
  - zhanghu 子女端 | 账户 `高飞`
    - detail_info 详细信息 `高飞`
    - vip_page VIP会员 `高飞`
    - help 帮助 `高飞`
- style 共用样式表目录
  - iconfont.wxss 图标样式表（from iconfont）（for apraxia）
- utils 工具目录（主要关于外部导入的模块）
  - util.js 时间格式化及附属数字格式化方法
- app.js
- app.json
- app.wxss
- README.md

## 项目初始化

- 预先安装node/npm并配置node/npm命令行调用

- 根目录运行命令行

  ```shell
  npm install
  ```

  安装npm下的所有依赖包

- 小程序开发工具菜单
  工具-构建npm

## 项目插件

- 使用vant

  参考 https://vant-contrib.gitee.io/ 官方文档

- 使用 eslint

  在开发者工具内安装 eslint 扩展，在编辑时实时检测代码格式化
  格式化js文件

  参考 https://eslint.bootcss.com/

  项目根目录使用终端或命令行运行命令

  ```shell
  npm run lint
  ```

  自动检测代码并尝试进行代码格式化

## 项目设定

- 总体色调
  - `rgb(84, 184, 172)`
  - `rgb(230, 250, 250)`
  - 可以根据需要在合适范围内自行调整颜色

- background 背景
  - 背景色 `rgb(255, 255, 255)`
  - 图案色 `rgb(84, 184, 172)`

- tabbar 标签栏
  - 选中配色 `rgb(84, 184, 172)`
  - 未选中配色 `rgb(230, 250, 250)`

- navigator 导航栏
  - 暂时使用系统默认导航栏

- 小程序基础库版本
  - `2.25.0`

- DEBUG 模式
  - 临时在app.json中开启debug模式，方便后续调试（发布时应当移除！！！）

- HTTPS 请求
  - 请求时需在 header 内添加 token 字段
  - 请求成功判断方法根据 code 字段：成功-10000；失败-其他

- globalData 设定
  - openid
  - token

- Storage 设定
  - openid
  - token
  - userInfo: { avatarUrl, nickName } 昵称及头像
  - user-type 用户类型，1为老人，2为子女

## 项目开发约定

- git 提交规范
  feat        增加新功能
  fix         修复bug
  docs        只改动了文档相关的内容
  style       不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
  build       构造工具的或者外部依赖的改动，例如webpack，npm
  refactor    代码重构时使用
  revert      执行git revert打印的message
