// miniprogram/pages/prove/prove.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnForbidden:true,
    btnClass:'btn_wrap_default',
    formData:{
      staff_name:"",
      staff_idCard:"",
      staff_phone:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  bindInputChange:function(e){
    // console.log(e.target.dataset.field,e.detail.value);
   this.setData({
    [`formData.${e.target.dataset.field}`]:e.detail.value
   })
   this.watchBtnStatus();
  //  console.log(this.data.formData);
  },

  watchBtnStatus:function(){
    if(this.data.formData.staff_name!="" &&this.data.formData.staff_idCard!=""&&this.data.formData.staff_phone!=""){
       this.setData({
       btnClass:'btn_wrap_active',
       btnForbidden:false
       })
    }else{
      this.setData({
        btnClass:'btn_wrap_default',
        btnForbidden:true
      })
      // console.log(this.data.btnForbidden);
    }
  },
  submit:function(){
    console.log(66);
  }



  
})