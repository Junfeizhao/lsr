// miniprogram/pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    footerRight:'footer_right_default',
    accounts: ["京东", "韵达", "申通"],
    accountIndex: 0,
    formData:{
      staff_name:'',
      goods_number:"",
      owner_name:"",
      owner_phone:"",
      express_type:"京东"
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
  bindAccountChange: function(e) {
    // console.log('picker account 发生选择改变，携带值为', e.detail.value);
    let value = e.detail.value;
    let express;
   if(value == 0){
    express="京东"
   }else if(value ==1){
    express="韵达"
   }else if(value==2){
    express="申通"
   }
    this.setData({
        accountIndex: e.detail.value,
        [`formData.express_type`]:express
    })
},
bindInputChange:function(e){
  console.log(e.target.dataset.field,e.detail.value);
  this.setData({
    [`formData.${e.target.dataset.field}`]:e.detail.value
  })
  this.watchBtnStatus();
  // console.log(this.data.formData);
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
      footerRight:'footer_right_active'
     })
  }else{
    this.setData({
     footerRight:'footer_right_default'
    })
  }
}
})