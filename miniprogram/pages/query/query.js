// miniprogram/pages/query/query.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [{
      text: '普通',
      src: '/page/weui/cell/icon_love.svg', // icon的路径
    },{
      text: '普通',
      extClass: 'test',
        src: '/page/weui/cell/icon_star.svg', // icon的路径
    },{
      type: 'warn',
      text: '警示',
      extClass: 'test',
        src: '/page/weui/cell/icon_del.svg', // icon的路径
    }],
     class1:"item_active",
     class2:"item_default",
     class3:"item_default",
     class4:"item_default"
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
  bindQueryClassifyChange:function(e){
     console.log(e.target.dataset.classnum);
     if(e.target.dataset.classnum){
      this.setData({
        class1:"item_default",
        class2:"item_default",
        class3:"item_default",
        class4:"item_default"
      });
      this.setData({
        [`class${e.target.dataset.classnum}`]:'item_active'
      });
     }
     
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

})