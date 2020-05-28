// miniprogram/pages/orders/orders.js
const util=require('../../util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    time:util.formatTime(new Date()),
    footerRight:'footer_right_default',
    express: ["京东", "顺丰", "中通"],
   expressIndex: 0,
    formData:{
      isChecked:0,
      create_staff:'',
      create_staff_openid:"",
      goods_number:"",
      owner_name:"",
      owner_phone:"",
      express_type:"京东"
      
    },
    proveInfo:{
      staff_name:"",
      isProve:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.onGetOpenid();
  this.timer();
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
  bindExpressChange: function(e) {
    // console.log('picker express 发生选择改变，携带值为', e.detail.value);
    let value = e.detail.value;
    let express;
   if(value == 0){
    express="京东"
   }else if(value ==1){
    express="顺丰"
   }else if(value==2){
    express="中通"
   }
    this.setData({
        expressIndex: e.detail.value,
        [`formData.express_type`]:express
    })
},
bindInputChange:function(e){
  console.log(e.target.dataset.field,e.detail.value);
  this.setData({
    [`formData.${e.target.dataset.field}`]:e.detail.value
  })
  this.watchBtnStatus();
  console.log(this.data.formData);
},

scanCode:function(){
  let that =this;
  wx.scanCode({
    scanType:'barCode',
    success (res) {
      // console.log(res.result)
      that.setData({
        [`formData.goods_number`]:res.result
      })
    }
  })
},

watchBtnStatus:function(){
  if(this.data.formData.goods_number!="" && this.data.formData.owner_name!="" && this.data.formData.owner_phone!=""){
     this.setData({
      footerRight:'footer_right_active',
      disabled:false
     })
  }else{
    this.setData({
     footerRight:'footer_right_default',
     disabled:true
    })
  }
},

onGetOpenid: function() {
  // 调用云函数
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)
      this.onQueryProve(res.result.openid);
      this.setData({
        [`formData.create_staff_openid`]: res.result.openid
      })
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
    }
  })
},
onQueryProve:function(openid){
  var that =this;
   // 调用云函数
   wx.cloud.callFunction({
     name: 'queryprove',
     data: {openid:openid},
     success: res => {
       // console.log(res.result.data[0])
       if(res.result.data.length>0){
         this.setData({
         [`proveInfo.isProve`]:true,
          [`proveInfo.staff_name`]:res.result.data[0].staff_name,
          [`formData.create_staff`]:res.result.data[0].staff_name
        })
       }else{
         console.log(99)
         that.setData({
           [`proveInfo.isProve`]:false,
           showBtn:true
         })
       }
     },
     fail: err => {
       console.log(err)
     }
   })
},
timer:function(){
  setInterval(()=>{
    this.setData({
      time:util.formatTime(new Date())
    })
  },1000)
},

createWork:function(){
  let that =this;
  function checkPhone(){ 
    let phone =that.data.formData.owner_phone;
    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
        return false; 
    }else{
      return true
    } 
  }
  if(!checkPhone()){
    wx.showToast({
      icon:'none',
      title: '手机号格式不正确',
    })
  }else{
    this.setData({
      [`formData.create_time`]:util.formatTime(new Date()),
      disabled:true
    })
    // 调用云函数
  wx.cloud.callFunction({
    name: 'create',
    data: this.data.formData,
    success: res => {
    wx.cloud.callFunction({
      name:'addcreateload',
      data:{classify:'create',staff_name:that.data.formData.create_staff,staff_openid:that.data.formData.create_staff_openid,time:util.formatTime(new Date())},
      success:res=>{
            console.log(res);
    wx.navigateTo({
      url: '../createsuccess/createsuccess',
    })
      },
      fail:err=>{
        console.log(err);
      }
    })
    },
    fail: err => {
      console.log(err);
    }
  })
  }

},





})