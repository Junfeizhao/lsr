// miniprogram/pages/query/query.js
const util = require('../../util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proveInfo:{
      staffName:'',
      staffOpenId:"",
      isProve:""
    },
    bindWork:{},
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
  this.onGetOpenid();
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

      },
      fail:err=>{
        console.log(err);
      }
    })
  },
  slideButtonTap(e) {
    var that =this;
    // console.log(99,e);
    var index = e.detail.index;
    // console.log(index);
    if(index==0){
        console.log(998);
        wx.navigateTo({
          url: `../markerr/markerr?create_staff=${that.data.bindWork.create_staff}&checked_staff=${that.data.bindWork.checked_staff}&create_staff_openid=${that.data.bindWork.create_staff_openid}&checked_staff_openid=${that.data.bindWork.checked_staff_openid}&isChecked=${that.data.bindWork.isChecked}`
        })
      
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
      data:{workid:that.data.bindWork._id},
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
  // console.log(9999,e)
  // console.log(e.currentTarget.dataset);
  this.setData({
    bindWork:e.currentTarget.dataset.work
  })
  // console.log(this.data.bindWork);
},
bindCheckedChange:function(e){
  var that =this;
// console.log(e.currentTarget.dataset.workid);
if(this.data.proveInfo.isProve){
  wx.cloud.callFunction({
    name:'checked',
    data:{workid:e.currentTarget.dataset.workid,
      checked_time:util.formatTime(new Date()),
      checked_staff:this.data.proveInfo.staffName,
      checked_staff_openid:this.data.proveInfo.staffOpenId,
      isChecked:1
    },
    success:res=>{
       wx.cloud.callFunction({
      name:'addcheckedload',
      data:{classify:'checked',staff_name:that.data.proveInfo.staffName,staff_openid:that.data.proveInfo.staffOpenId,time:util.formatTime(new Date())},
      success:res=>{
            console.log(res);
              that.onLoad();
      },
      fail:err=>{
        console.log(err);
      }
    })
    },
    fail:err=>{
      console.log(err);
    }
  })
}else{
  wx.showToast({
    icon:'none',
    title: '请先进行员工认证！',
  })
}

},
onGetOpenid: function() {
  var that =this;
  // 调用云函数
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[云函数] [login] user openid: ', res.result.openid);
      that.setData({
        [`proveInfo.staffOpenId`]: res.result.openid
      })
      that.onQueryProve(res.result.openid);
     
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
       console.log(res.result.data[0])
       if(res.result.data.length>0){
         this.setData({
         [`proveInfo.isProve`]:true,
          [`proveInfo.staffName`]:res.result.data[0].staff_name
        })
        // console.log(8877,this.data.proveInfo);
       }else{
         that.setData({
           [`proveInfo.isProve`]:false,
         })
       }
     },
     fail: err => {
       console.log(err)
     }
   })
},




})