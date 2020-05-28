// miniprogram/pages/markerr/markerr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staffs:{},
     item1Class:'item_default',
     item2Class:"item_default",
     selectItem1:false,
     selectItem2:false,
     formData:{
       text:'',
       isCreateErr:'',
       isCheckedErr:'',
       create_staff:'',
       create_staff_openid:'',
       checked_staff:'',
       checked_staff_openid:''
     }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that =this;
   this.setData({
     staffs:options,
     [`staffs.isChecked`]:Number(options.isChecked)
   })
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
  selectStaff1:function(e){
    var item = this.data.item1Class;
    var select = this.data.selectItem1;
    this.setData({
      selectItem1:!select
    })
    if(this.data.selectItem1){
        console.log("选中了",e.target.dataset);
        this.setData({
          item1Class:'item_active',
          [`formData.isCreateErr`]:1,
          [`formData.create_staff`]:e.target.dataset.staffs.create_staff,
          [`formData.create_staff_openid`]:e.target.dataset.staffs.create_staff_openid
        })
    }else{
      console.log("未选中");
      this.setData({
        item1Class:'item_default',
        [`formData.isCreateErr`]:0,
        [`formData.create_staff`]:null,
        [`formData.create_staff_openid`]:null
      })
    }
  },
  selectStaff2:function(e){
    var select = this.data.selectItem2;
    this.setData({
      selectItem2:!select
    })
    if(this.data.selectItem2){
        console.log("选中了");
        this.setData({
          item2Class:'item_active',
          [`formData.isCheckedErr`]:1,
          [`formData.checked_staff`]:e.target.dataset.staffs.checked_staff,
          [`formData.checked_staff_openid`]:e.target.dataset.staffs.checked_staff_openid
        })
    }else{
      console.log("未选中");
      this.setData({
        item2Class:'item_default',
        [`formData.isCheckedErr`]:0,
        [`formData.checked_staff`]:null,
        [`formData.checked_staff_openid`]:null
      })
    }
  },
  inputChange:function (e) {
    console.log(e.detail.value);
    this.setData({
      [`formData.text`]:e.detail.value
    })
  },
  submit:function(){
    var that =this;
    console.log(this.data.formData)
    if(!this.data.formData.isCreateErr && !this.data.formData.isCheckedErr){
      wx.showToast({
        icon:'none',
        title: '请选择追责人',
      })
    }else if(!this.data.formData.text){
      wx.showToast({
        icon:'none',
        title: '请填写备注',
      })
    }else{
      wx.cloud.callFunction({
        name:'markerr',
        data:that.data.formData,
        success:res=>{
          // console.log(res);
          wx.showToast({
            icon:'none',
            title: '操作成功',
          }),
          wx.switchTab({
            url: '../query/query',
          })
        },
        fail:err=>{
          console.log(err);
        }
      })
    }
  }
 
})