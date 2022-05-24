import { request } from '../../lib/request.js';

Page({


  data: {
   search_item:[
     {title:"    415641sf5da41f5as14523f6das45fd41s5a364f156d3as4sssssssssssssssssssss",
    time:"5月6日",
    recode_id:0},
    {title:"    415641sf5da41f5as14523f6das45fd41s5a364f156d3as4sssssssssssssssssssss",
    time:"5月6日",
    recode_id:1}
                ]
  },


  /**
   * 搜索模块
   * 当搜索框中有值时发请求
   */
  Timeid:-1,
  // input事件
  handdleInput(e){

    let {value} = e.detail;
    /**
     * 空值返回*显示全部
     * 非空返回value显示符合条件的部分记录
     */
    if(!value.trim()){
       value="*";
    }
    // 防止重复请求
    clearTimeout(this.Timeid)
    this.Timeid=setTimeout(() => {this.search_info(value)},1500)
  },


  search_info:async function(querry){
    try{
      const res = await request({url:"#",data:{querry}});
      console.log(res);
      /**修改data */
    }catch(err){
       console.log(err);
       
    }
  },
  
  onload:function(){
      /**请求全部并缓存 */
      this.search_info("*")
  }
  
})