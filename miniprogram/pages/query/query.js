// miniprogram/pages/query/query.js
const util = require('../../util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deleteWorkId:'',
    buttons: [{text: '取消'}, {text: '确定'}],
    dialogShow:false,
    work:[],
    queryText:"",
    queryClassify:"0",
    slideButtons: [{
      text: '标记',
      src: '/page/weui/cell/icon_love.svg', // icon的路径
    },{
      type: 'warn',
      text: '删除',
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
  this.onQuery();
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
   this.setData({
     queryText:e.detail.value
   })
   console.log(this.data.queryText);
   }
  ,
  bindQueryClassifyChange:function(e){
    //  console.log(e.target.dataset.classnum);
     if(e.target.dataset.classnum){
      this.setData({
        queryClassify:e.target.dataset.classify,
        class1:"item_default",
        class2:"item_default",
        class3:"item_default",
        class4:"item_default"
      });
      this.setData({
        [`class${e.target.dataset.classnum}`]:'item_active'
      });
      this.onQuery();
      // console.log(this.data.queryClassify);
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
  onQuery:function(){
    let that =this;
    wx.cloud.callFunction({
      name:"query",
      data:{queryType:this.data.queryClassify,createTime:util.timeToDay(new Date()),queryText:this.data.queryText},
      success:res=>{
        console.log(res);
        that.setData({
          work:res.result.data
        })
        console.log(that.data.hasResult);
      },
      fail:err=>{
        console.log(err);
      }
    })
  },
  slideButtonTap(e) {
    console.log(99,e);
    var index = e.detail.index;
    console.log(index);
    if(index==0){

    }else if(index==1){
       this.setData({
        dialogShow:true
       })
    }
},

tapDialogButton(e) {
  var that =this;
  this.setData({
      dialogShow: false
  })
  console.log(e.detail.index,e);
  if(e.detail.index==1){
    wx.cloud.callFunction({
      name:'deletework',
      data:{workid:that.data.deleteWorkId},
      success:res=>{
        console.log(res);
        wx.showToast({
          title: '删除成功',
        })
        this.onLoad();
      },
      fail:err=>{
      console.log(err)
    }
    })
  }
},
getWorkId:function(e){
  console.log(e.currentTarget.dataset);
  this.setData({
    deleteWorkId:e.currentTarget.dataset.workid
  })
  console.log(this.data.deleteWorkId);
}

})