// pages/dayload/dayload.js
const util =require('../../util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryTime:util.timeToYear(new Date()),
    class1:"item_active",
    class2:"item_default",
    class3:"item_default",
    queryClassify:'',
    staffs:[],
    create_all:0,
    checked_all:0,
    create_err_all:0,
    checked_err_all:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.onGetQueryAllStaff();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onGetQueryAllStaff:function(){
    let that =this;
    wx.cloud.callFunction({
      name:"queryallstaff",
      data:{},
      success:res=>{
        let staff= res.result.data;
        for(let i=0;i<staff.length;i++){
             that.setData({
               [`staffs[${i}].name`]:staff[i].staff_name,
               [`staffs[${i}].openid`]:staff[i].userInfo.openId
             })
        }
        // console.log(that.data.staffs)
        this.queryCreatLoad(util.timeToMonth(new Date()));
        this.queryCheckedLoad(util.timeToMonth(new Date()));
        this.queryCreatErr(util.timeToMonth(new Date()));
        this.queryCheckedErr(util.timeToMonth(new Date()));
      },
      fail:err=>{
        console.log(err);
      }
    })
  },
  queryCreatLoad:function(time){
    console.log('tiem',time)
    var that=this;
    var db =wx.cloud.database();
    var staffs=this.data.staffs;
    var pro_err1=[];
    var pro_1;
    for(let j=0;j<staffs.length;j++){
       pro_1 = new Promise((resolve,reject)=>{
        db.collection('load').where({
          staff_openid:staffs[j].openid,
          time:{
            $regex:'.*'+ time,
            $options: 'i'
          },
          classify:'create'
        }).count({
            success:res=>{
              resolve(res.total)
            },
            fail:err=>{
              reject()
              console.log(err);
            }
        })
       })
     pro_err1.push(pro_1);
    }
    var all=0;
    Promise.all(pro_err1).then(res=>{
      // console.log(res)
     
      for(let i=0;i<staffs.length;i++){
        all+=res[i];
        this.setData({
          [`staffs[${i}].create`]:res[i]
        })
      }
     this.setData({
       create_all:all
     })
    });
  },
  queryCheckedLoad:function(time){
    var db =wx.cloud.database();
    var staffs=this.data.staffs;
    var pro_err1=[];
    var pro_1;
    for(let j=0;j<staffs.length;j++){
       pro_1 = new Promise((resolve,reject)=>{
        db.collection('load').where({
          staff_openid:staffs[j].openid,
          time:{
            $regex:'.*'+ time,
            $options: 'i'
          },
          classify:'checked'
        }).count({
            success:res=>{
              resolve(res.total)
            },
            fail:err=>{
              reject()
              console.log(err);
            }
        })
       })
     pro_err1.push(pro_1);
    }
    var all =0;
    Promise.all(pro_err1).then(res=>{
     
     
      for(let i=0;i<staffs.length;i++){
        all+=res[i];
        this.setData({
          [`staffs[${i}].checked`]:res[i]
        })
      }
      this.setData({
        checked_all:all
      })
    });
  
  },
  queryCheckedErr:function(time){
    var db =wx.cloud.database();
    var staffs=this.data.staffs;
    var pro_err1=[];
    var pro_1;
    for(let j=0;j<staffs.length;j++){
       pro_1 = new Promise((resolve,reject)=>{
        db.collection('err').where({
          create_staff_openid:staffs[j].openid,
          isCheckedErr:1,
          create_time:{
            $regex:'.*'+ time,
            $options: 'i'
          }
        }).count({
            success:res=>{
              resolve(res.total)
            },
            fail:err=>{
              reject()
              console.log(err);
            }
        })
       })
     pro_err1.push(pro_1);
    }
    var all=0;
    Promise.all(pro_err1).then(res=>{
      // console.log(res)
      for(let i=0;i<staffs.length;i++){
        all+=res[i]
        this.setData({
          [`staffs[${i}].checked_err`]:res[i]
        })
      }
      this.setData({
        checked_err_all:all
      })
    });
  },
  queryCreatErr:function(time){
    var db =wx.cloud.database();
    var staffs=this.data.staffs;
    var pro_err1=[];
    var pro_1;
    for(let j=0;j<staffs.length;j++){
       pro_1 = new Promise((resolve,reject)=>{
        db.collection('err').where({
          create_staff_openid:staffs[j].openid,
          isCreateErr:1,
          create_time:{
            $regex:'.*'+ time,
            $options: 'i'
          }
        }).count({
            success:res=>{
              resolve(res.total)
            },
            fail:err=>{
              reject()
              console.log(err);
            }
        })
       })
     pro_err1.push(pro_1);
    }
    var all=0;
    Promise.all(pro_err1).then(res=>{
      // console.log(res)
    
      for(let i=0;i<staffs.length;i++){
        all+=res[i];
        this.setData({
          [`staffs[${i}].create_err`]:res[i]
        })
      }
      this.setData({
        create_err_all:all
      })
    });
  },
  queryByclassicy:function(classify){
    var date = new Date();
    console.log('classify',classify);
    let  year = date.getFullYear();
     var s1 =year -classify;
    console.log(s1);
    this.queryCreatLoad(s1)
    this.queryCheckedLoad(s1)
    this.queryCreatErr(s1)
    this.queryCheckedErr(s1)
  },
  bindQueryClassifyChange:function(e){
     var that =this;
     console.log(e.target.dataset.classnum);
     if(e.target.dataset.classnum){
      this.setData({
        queryClassify:e.target.dataset.classify,
        class1:"item_default",
        class2:"item_default",
        class3:"item_default",
      });
      this.setData({
        [`class${e.target.dataset.classnum}`]:'item_active'
      });
      that.queryByclassicy(that.data.queryClassify);
      // console.log(this.data.queryClassify);
     }
     
  },
    bindDateChange: function(e) {
      let time=e.detail.value.replace(/-/g,"/");
    this.setData({
      index: e.detail.value,
      queryTime:time
    })
    console.log(time);
  },
  querySubmit:function(){
    let time =this.data.queryTime;
    this.queryCreatLoad(time);
    this.queryCheckedLoad(time);
    this.queryCreatErr(time);
    this.queryCheckedErr(time);
  },
 getQueryMonth:function(classify) {
 var date = new Date();
 let  year = date.getFullYear();
 let month = date.getMonth()+1;
 let month1=month-classify>1?month-1:13-classify;
}
})