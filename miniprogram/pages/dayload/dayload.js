// pages/dayload/dayload.js
const util =require('../../util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffs:[],

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
        this.queryCreatLoad();
        this.queryCheckedLoad();
        this.queryCreatErr();
        this.queryCheckedErr();
      },
      fail:err=>{
        console.log(err);
      }
    })
  },
  queryCreatLoad:function(){
    var db =wx.cloud.database();
    var staffs=this.data.staffs;
    var pro_err1=[];
    var pro_1;
    for(let j=0;j<staffs.length;j++){
       pro_1 = new Promise((resolve,reject)=>{
        db.collection('load').where({
          staff_openid:staffs[j].openid,
          time:{
            $regex:'.*'+ util.timeToDay(new Date()),
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
    Promise.all(pro_err1).then(res=>{
      // console.log(res)
      for(let i=0;i<staffs.length;i++){
        this.setData({
          [`staffs[${i}].create`]:res[i]
        })
      }
    });
  },
  queryCheckedLoad:function(){
    var db =wx.cloud.database();
    var staffs=this.data.staffs;
    var pro_err1=[];
    var pro_1;
    for(let j=0;j<staffs.length;j++){
       pro_1 = new Promise((resolve,reject)=>{
        db.collection('load').where({
          staff_openid:staffs[j].openid,
          time:{
            $regex:'.*'+ util.timeToDay(new Date()),
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
    Promise.all(pro_err1).then(res=>{
      // console.log(res)
      for(let i=0;i<staffs.length;i++){
        this.setData({
          [`staffs[${i}].checked`]:res[i]
        })
      }
    });
  },
  queryCheckedErr:function(){
    var db =wx.cloud.database();
    var staffs=this.data.staffs;
    var pro_err1=[];
    var pro_1;
    for(let j=0;j<staffs.length;j++){
       pro_1 = new Promise((resolve,reject)=>{
        db.collection('err').where({
          create_staff_openid:staffs[j].openid,
          isCheckedErr:1
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
    Promise.all(pro_err1).then(res=>{
      // console.log(res)
      for(let i=0;i<staffs.length;i++){
        this.setData({
          [`staffs[${i}].checked_err`]:res[i]
        })
      }
    });
  },
  queryCreatErr:function(){
    var db =wx.cloud.database();
    var staffs=this.data.staffs;
    var pro_err1=[];
    var pro_1;
    for(let j=0;j<staffs.length;j++){
       pro_1 = new Promise((resolve,reject)=>{
        db.collection('err').where({
          create_staff_openid:staffs[j].openid,
          isCreateErr:1
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
    Promise.all(pro_err1).then(res=>{
      // console.log(res)
      for(let i=0;i<staffs.length;i++){
        this.setData({
          [`staffs[${i}].create_err`]:res[i]
        })
      }
    });
  },
})