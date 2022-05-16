  let qnumber=1                    //（题目序号）特重要的参数，依托此来展示题目和选项
	let q11record=0                  //用来判断第11题的延时是否已经激活过一次了，下面两个也是如此
	let q12record=0
	let q13record=0
	let q13picturedisappear=3       //让第13题的某一图片随机消失，数字为几即第几张图片消失
  var respondentanswer = Array()    //用来记录作答者答案的数组
  var alldata = Array()             //存放从后端调取的关键数据

	let wt1 = '1.今天是几月几号？'     //问题的组
	let wt2 = '2.您家位置在哪？'
	let wt3 = '3.您多大岁数？'
	let wt4 = '4.最近发生了什么事情？'
	let wt5 = '5.您出生在哪里？'
	let wt6 = '6.中华人民共和国成立年份'
	let wt7 = '7.一年有几个月，一小时有多少分钟？'
	let wt8 = '8.国家现任总理是谁？'
	let wt9 = '9.计算100-7'
  let wt10 = '10.计算93-7'
  // let wt1 = alldata[0].name     //问题的组(测试时再反注释)
	// let wt2 = alldata[1].name
	// let wt3 = alldata[2].name
	// let wt4 = alldata[3].name
	// let wt5 = alldata[4].name
	// let wt6 = alldata[5].name
	// let wt7 = alldata[6].name
	// let wt8 = alldata[7].name
	// let wt9 = alldata[8].name
	// let wt10 = alldata[9].name
	let wt11 = '11.以下哪个是刚才出现的数字的倒置序列'    //下面3题的题目会随时间变化一次（注意答题按钮要消失一段时间）
	let iwt11 = '11.在三秒内记住以下数字6、8、2'
	
	let wt12 = '12.以下哪个是刚才出现的数字的倒置序列'
	let iwt12 = '12.在三秒内记住以下数字3、5、2、9'
	
	let wt13 = '13.什么东西不见了'
  let iwt13 = '13.在三秒内观察以下物品'
  
  let Serialnumber=1
Page({
  data: {
        Serialnumber:'1',     //题目序号，为变量(下面的问题和选项也是这样)
				question:wt1,
				an1:"a",                 //四个选项展示的内容
				an2:"b",
				an3:"c",
				an4:"d",
				previous:"上一题",      //第一题时不显示（框子也要弄掉）
				next:"下一题",          //到最后一题要变成提交
				button1:"",            //上一题和下一题的按钮的样式（为了改点击特效而设）
				button2:"",
				fillblank:"",          //***它存着填空题输入的内容
				ans:true,              //用来在某些情况隐藏四个选项框
				shangyiti:false,       //在第一题时隐藏"上一题"按钮
				blankjudge:false,      //填空题框
				qpicture:false,        //为了使第十三题消失一张图片
				qpicture1:true,
				qpicture2:true,
				qpicture3:true,
				qpicture4:true,
				qpicture5:true,
        nextq:true,            //为了在某些题目会变化的题时，使下一题的按钮消失而设
  },

  onLoad: function () {
    // 初始化问题数据
      qnumber=1;
			q11record=0;
			q12record=0;
			q13record=0;
			// respondentanswer.length=0;
      console.log('页面加载完成，参数已重置');
    //通过接口引入问题和选项
    self = this,
    wx.request({
      url: 'https://www.thylovezj.space/v1/problem/getcgc',
      method:'GET',
      success:function(res){
        console.log(res.data);
        self.setData({
          alldata : res.data.date,
        })
      },
      fail:function(err){
        console.log(err);
      }
    })
  },
  buttondouble(){                  //点击两个按钮的任意一个都会触发此项
    if(qnumber==2){this.setData({shangyiti:true})}
    else if(qnumber==1){this.setData({shangyiti:false})}
    switch(qnumber){             //问题的组，和选项
              case 1: this.setData({question:wt1});
              // this.setData({an1:alldata[0].checks[0]});
              // this.setData({an1:alldata[0].checks[1]});
              // this.setData({an1:alldata[0].checks[2]});
              // this.setData({an1:alldata[0].checks[3]});
              ;break;
              case 2: this.setData({question:wt2});
              // this.setData({an1:alldata[1].checks[0]});
              // this.setData({an1:alldata[1].checks[1]});
              // this.setData({an1:alldata[1].checks[2]});
              // this.setData({an1:alldata[1].checks[3]});
              ;break;
              case 3: this.setData({question:wt3});
              // this.setData({an1:alldata[2].checks[0]});
              // this.setData({an1:alldata[2].checks[1]});
              // this.setData({an1:alldata[2].checks[2]});
              // this.setData({an1:alldata[2].checks[3]});
              ;break;
              case 4: this.setData({question:wt4});
              // this.setData({an1:alldata[3].checks[0]});
              // this.setData({an1:alldata[3].checks[1]});
              // this.setData({an1:alldata[3].checks[2]});
              // this.setData({an1:alldata[3].checks[3]});
              ;break;
              case 5: this.setData({question:wt5});
              // this.setData({an1:alldata[4].checks[0]});
              // this.setData({an1:alldata[4].checks[1]});
              // this.setData({an1:alldata[4].checks[2]});
              // this.setData({an1:alldata[4].checks[3]});
              ;break;
              case 6: this.setData({question:wt6});
              // this.setData({an1:alldata[5].checks[0]});
              // this.setData({an1:alldata[5].checks[1]});
              // this.setData({an1:alldata[5].checks[2]});
              // this.setData({an1:alldata[5].checks[3]});
              ;break;
              case 7: this.setData({question:wt7});
              // this.setData({an1:alldata[6].checks[0]});
              // this.setData({an1:alldata[6].checks[1]});
              // this.setData({an1:alldata[6].checks[2]});
              // this.setData({an1:alldata[6].checks[3]});
              ;break;
              case 8: this.setData({question:wt8});
              // this.setData({an1:alldata[7].checks[0]});
              // this.setData({an1:alldata[7].checks[1]});
              // this.setData({an1:alldata[7].checks[2]});
              // this.setData({an1:alldata[7].checks[3]});
               ;break;
              case 9: this.setData({question:wt9});
              // this.setData({an1:alldata[8].checks[0]});
              // this.setData({an1:alldata[8].checks[1]});
              // this.setData({an1:alldata[8].checks[2]});
              // this.setData({an1:alldata[8].checks[3]});
               ;break;
              case 10: this.setData({question:wt10});
              // this.setData({an1:alldata[9].checks[0]});
              // this.setData({an1:alldata[9].checks[1]});
              // this.setData({an1:alldata[9].checks[2]});
              // this.setData({an1:alldata[9].checks[3]});
               ;break;
              case 11: if(q11record!=0){this.setData({question:wt11})};
              // this.setData({an1:alldata[10].checks[0]});
              // this.setData({an1:alldata[10].checks[1]});
              // this.setData({an1:alldata[10].checks[2]});
              // this.setData({an1:alldata[10].checks[3]});
               ;break;
              case 12: if(q12record!=0){this.setData({question:wt12})};
              // this.setData({an1:alldata[11].checks[0]});
              // this.setData({an1:alldata[11].checks[1]});
              // this.setData({an1:alldata[11].checks[2]});
              // this.setData({an1:alldata[11].checks[3]});
               ;break;
              case 13: if(q13record!=0){this.setData({question:wt13})};
              // this.setData({an1:alldata[12].checks[0]});
              // this.setData({an1:alldata[12].checks[1]});
              // this.setData({an1:alldata[12].checks[2]});
              // this.setData({an1:alldata[12].checks[3]});
               ;break;
              
            }
    if(qnumber==4){{this.setData({ans:false})};{this.setData({blankjudge:true})};}   //根据题目的特征来修改相应情况
    else if(qnumber==11&&q11record==0){this.setData({question:iwt11})
                                       this.nextq=false;
                       this.shangyiti=false
                                       setTimeout(()=>{this.question=wt11;this.nextq=true;this.shangyiti=true},3000);
                       q11record=1}                   //变化只激活一次，用此来记录是否已激活过
    else if(qnumber==12&&q12record==0){this.setData({question:iwt12})
                                       this.nextq=false;
                       this.shangyiti=false
                                       setTimeout(()=>{this.question=wt12;this.nextq=true;this.shangyiti=true},3000);
                       q12record=1}
    else if(qnumber==13&&q13record==0){this.setData({question:iwt13})
                                       this.qpicture=true;
                       this.nextq=false;
                       this.shangyiti=false           //3秒后消失一张图片，5秒后可以作答
                       setTimeout(()=>{this.question=wt13;this.qpicture=false;this.nextq=true;this.shangyiti=true},5000);
                       setTimeout(()=>{
                                      switch(q13picturedisappear){            //最后一题，消失一张图片
                                case 1: this.qpicture1=false ;break;
                                case 2: this.qpicture2=false ;break;
                                case 3: this.qpicture3=false ;break;
                                case 4: this.qpicture4=false ;break;
                                case 5: this.qpicture5=false ;break;
                              }
                               },3000);
                      q13record=1}
    else{this.setData({ans:true});this.setData({blankjudge:false});this.setData({qpicture:false})}
    if(respondentanswer[qnumber]=='A'){this.setData({ans1:"#54b7ab"})  //展示已作答的选项（点击切换题目时使已作答的选项处于已点击态）
                     this.setData({ans2:"#edfbfb"})
                     this.setData({ans3:"#edfbfb"})
                     this.setData({ans4:"#edfbfb"})}
            else if(respondentanswer[qnumber]=='B'){this.setData({ans2:"#54b7ab"})
                     this.setData({ans1:"#edfbfb"})
                     this.setData({ans4:"#edfbfb"})
                     this.setData({ans3:"#edfbfb"})}
            else if(respondentanswer[qnumber]=='C'){this.setData({ans3:"#54b7ab"})
                     this.setData({ans4:"#edfbfb"})
                     this.setData({ans2:"#edfbfb"})
                     this.setData({ans1:"#edfbfb"})}
            else if(respondentanswer[qnumber]=='D'){this.setData({ans4:"#54b7ab"})
                     this.setData({ans3:"#edfbfb"})
                     this.setData({ans2:"#edfbfb"})
                     this.setData({ans1:"#edfbfb"})}
                     else{this.setData({ans2:"#edfbfb"})
                     this.setData({ans4:"#edfbfb"})
                     this.setData({ans3:"#edfbfb"})
                     this.setData({ans1:"#edfbfb"})}
  },
  butt1(){                                  //点击**"上一题"时触发此项
    qnumber=qnumber-1                     //***点击上一题时要展示所选项（关联题号qnumber就好），要求储存已作答数据
    this.setData({Serialnumber:qnumber})
    if(qnumber!=13){this.next="下一题";}
  },
  butt2(){                                 //**点击"下一题"时触发此项
    qnumber=qnumber+1
    this.setData({Serialnumber:qnumber})
    if(qnumber>=13){this.setData({Serialnumber:13})}
    if(qnumber==13){this.setData({next:'提交问卷'})}
    if(qnumber==14){wx.navigateTo({url: '/pages/evaluate/main/main'})}
  },
  button1a1(){                     //实现两按钮的点击特效（手指触摸变色，离开恢复原色）
    this.button1="background:#eaeaea"
  },
  button1a2(){
    this.button1="background:#fdfdfd"     
  },
  button2a1(){
    this.button2="background:#44958a"
  },
  button2a2(){
    this.button2="background:#54b7ab"
  },
  answer1(){                                 //**选项a被点击触发此项//下面依次是b c d选项的点击事件
    this.setData({ans1:"#54b7ab"})
    this.setData({ans2:"#edfbfb"})
    this.setData({ans3:"#edfbfb"})
    this.setData({ans4:"#edfbfb"})
    respondentanswer[qnumber]="A"
  },
  answer2(){
    this.setData({ans2:"#54b7ab"})
    this.setData({ans1:"#edfbfb"})
    this.setData({ans3:"#edfbfb"})
    this.setData({ans4:"#edfbfb"})
    respondentanswer[qnumber]="B"
  },
  answer3(){
    this.setData({ans3:"#54b7ab"})
    this.setData({ans2:"#edfbfb"})
    this.setData({ans1:"#edfbfb"})
    this.setData({ans4:"#edfbfb"})
    respondentanswer[qnumber]="C"
  },
  answer4(){
    this.setData({ans4:"#54b7ab"})
    this.setData({ans2:"#edfbfb"})
    this.setData({ans3:"#edfbfb"})
    this.setData({ans1:"#edfbfb"})
    respondentanswer[qnumber]="D"
  },

  

});
