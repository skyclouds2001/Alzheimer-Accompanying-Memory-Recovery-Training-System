var alldata = Array()
let newsquantity = 0
// 为了解决未“登录”的问题
const token = wx.getStorageSync('token')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'阿尔茨海默病的防治',
    text:'"随着老龄化人口的增加，阿尔茨海默病已成为现代社会的主要健康问题之一。随着我国人均寿命的延长和社会结构的老龄化，患有阿尔茨海默病的人口比率将迅速增加。你的身边有没有患阿尔茨海默病的老人？有没有担心或者怀疑自己的亲人患上了此病？如何从年轻开始就积极地预防这个可怕的病魔？让我们一起走进阿尔茨海默病的秘密世界。\n<img src=\"https://bucket-20020501.oss-cn-beijing.aliyuncs.com/xdu_hospital/news/%E5%9B%BE%E7%89%878.png\" style=\"margin-left: 17%;width: 260px;height: 260px;border-radius: 5px;\"/>\n什么是阿尔茨海默病？\n阿尔茨海默病（Alzheimer’s disease，简称AD）又称老年痴呆症、失智症或脑退化症。该病是由德国神经科医生阿尔茨海默（Alois Alzheimer）于1906年首先发现，因此该病就以他的名字命名。我国卫生部为避免病名造成社会歧视，也于2012年10月10日将其名称统一规范为阿尔茨海默病。\n阿尔茨海默病是一种最普遍的与年龄密切相关的神经退行性疾病，临床表现为患者早期出现记忆缺失、意识错乱、注意力差、失语、缺乏方向感等症状，随着认知和记忆功能不断恶化，逐渐丧失思考及判断能力，难以与人沟通，生活无法自理，并有各种神经精神症状和行为障碍。最终因神经细胞大量死亡影响到大部分脑区时，身体各组织器官受损最终发生死亡。\n阿尔茨海默病目前已成为世界上继心脏病、肿瘤和脑卒中之后的第四大死亡原因，其早期诊断及防治成为一个世界性难题。阿尔茨海默病和癌症、心脏病等众多疾病一样是一种病症，而不是人老后的一种自然现象。“人衰老后记忆力自然会丧失”这是一种普遍的误解。\n<img src=\"https://bucket-20020501.oss-cn-beijing.aliyuncs.com/xdu_hospital/news/%E5%9B%BE%E7%89%879.png\" style=\"margin-left: 17%;width: 260px;height: 260px;border-radius: 5px;\"/>\n阿尔茨海默病的类型？\n早发型阿尔茨海默病：该类型疾病比较少见，约占总发病率的5%。病人通常在35~60岁就出现阿尔茨海默病症状，发病后恶化速度也相当快。该类型一般为家族遗传性的，主要是由β -淀粉样蛋白前体蛋白（APP）、早老素（PS1）等基因突变造成。\n晚发型阿尔茨海默病：该类型为阿尔茨海默病最常见的形式，病人年龄一般在60岁以上，其中一部分为散发型，另一部分为家族遗传型。ε4型载脂蛋白E（APOE）基因是晚发型阿尔茨海默病最主要的风险基因。近几年研究者发现CR1，CLU以及PICALM等基因也可能与散发性AD有关。\n临床分期\n早期症状\n● 轻度语言功能受损；\n● 日常生活中出现明显的记忆减退，特别是对近期事件记忆的丧失；\n● 时间观念产生混淆；\n● 在熟悉的地方迷失方向；\n● 做事缺乏主动性及失去动机；\n● 出现忧郁或攻击行为；\n● 对日常活动及生活中的爱好丧失兴趣。\n中期症状\n● 变得更加健忘，特别常常忘记最近发生的事及人名；\n● 不能继续独立地生活；\n● 不能独自从事煮饭、打扫卫生或购物等活动；\n● 个人自理能力下降，需要他人的协助，如上厕所、洗衣服及穿衣等；\n● 说话越来越困难；\n● 出现无目的的游荡和其他异常行为；\n● 在居所及驻地这样熟悉的地方也会走失；\n● 出现幻觉。\n晚期症状\n● 不能独立进食；\n● 不能辨认家人、朋友及熟悉的物品；\n● 明显地语言理解和表达困难；\n● 在居所内找不到路；\n● 行走困难；\n● 大、小便失禁；\n● 在公共场合出现不适当的行为；\n● 行动开始需要轮椅或卧床不起。\n如何照顾？\n1. 进行适量的体育锻炼，并选择在患者状态最好的时候进行活动。\n2. 充足的营养和良好的生活起居可以保持阿尔茨海默病患者的健康。\n3. 给予足够的精神支持。让患病的亲人感受到关爱和理解。\n4. 尝试建立一种生活的规律性。患阿尔茨海默病的亲人往往记忆丧失和脑部功能退化，思维能力和逻辑能力也减弱。生活的规律性，有助于他们更好的生活。\n5. 预防意外的发生。把一些可能会伤害患者的物品放在他拿不到的地方或者隐藏起来，例如钥匙、火柴和刀具等。同时，应该注意环境的用电用火安全，积极消除隐患。\n6. 尽量适应患者的思维和习惯。由于脑部功能退化，患者的思维和逻辑能力会发生改变。\n生活中如何降低患病风险？\n1. 提倡低脂肪饮食，减少饱和脂肪酸和反式脂肪酸摄入。\n2. 多食用富含维生素的植物性食物，如蔬菜、豆类、水果和全麦等。可增加维生素E和B族维生素的摄入，每天食谱应包括一种提供维生素B12的食物，每天食用30 g坚果可提供充足的维生素E。\n3. 提倡食用富含ω -3脂肪酸的鱼类。\n4. 经常食用具有抗氧化功效成分（如类白藜芦醇、胡萝卜素、维生素E、维生素C）的食物，如蓝莓、葡萄酒、葡萄、石榴、蔬菜等。\n5. 选择不含铁元素和铜元素的复合维生素，只有在医生指导时再补充铁元素。\n6. 避免使用含铝的炊具、抗酸药、发酵粉或其他产品。\n7. 维持正常血压和体重。\n8. 保持开朗的性格，多参加社交活动。\n9. 每周有氧运动3次，每次运动量相当于40分钟快步行走。"'
  },
  onLoad: function (options){
    //调用后端接口
    self = this,
    wx.request({

      url: 'http://www.thylovezj.space/v1/news/get?pageNum=1&pageSize=1',
      method:'GET',
      header:{
        // 为了解决未“登录”的问题
        'authorization': token
      },
      success:function(res){
        console.log(res.data);
        newsquantity = res.data.data.records.length
        for (let index = 0; index < newsquantity; index++) {
          alldata[index] = res.data.data.records[index]
        }
      },
      fail:function(err){
        console.log(err);
      }
    })
    // options.id是用户点击上一个页面后传回的相应的新闻的id值，根据此展示出相应的新闻
    // console.log(options.id)

    // let idmatching = options.id

    //依次检索，为了让前端用户已点击的新闻的id与后端的新闻的id匹配，从而展示目标新闻内容
    // setTimeout(()=>{
    //   for (let index = 0; idmatching != alldata[index].id; index++) {
    //     this.setData({
    //       title:alldata[index].title,
    //       text:alldata[index].content
    //     })
    //   }
    // },1000)
   
  }


})