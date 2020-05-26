// miniprogram/pages/prove/prove.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proveInfo:{
      isProve:true,
      staff_name:"",
      staff_idCard:"",
      staff_phone:""
    },
    showBtn:false,
    btnText:"确认提交",
    btnForbidden:true,
    btnClass:'btn_wrap_default',
    openid:"",
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
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.onQueryProve(res.result.openid);
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
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
    let that =this;
    if(this.data.formData.staff_name.length<2 ||this.data.formData.staff_name.length>4){
      wx.showToast({
        icon:"none",
        title: '请输入2-4位的员工姓名'
      })
      return false
    }
    if(!isCardID()){
      wx.showToast({
        icon:"none",
        title: '请输入正确的身份证号'
      })
      return 
    }
    if(!checkPhone()){
      wx.showToast({
        icon:"none",
        title: '请输入正确的手机号'
      })
      return 
    }
    this.btnManage();
  // console.log(that.data.formData);
    wx.cloud.callFunction({
      name:"prove",
      data:that.data.formData,
      success:res=>{
        // console.log(res);
        wx.navigateTo({
          url: '../provesuccess/provesuccess',
        })
      }
    })
    // console.log(this.data.formData);
    function checkPhone(){ 
      let phone =that.data.formData.staff_phone;
      if(!(/^1[3456789]\d{9}$/.test(phone))){ 
          return false; 
      }else{
        return true
      } 
  }
   
  function isCardID(){ 
    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
    var iSum=0 ;
    var info="" ;
    var sId=that.data.formData.staff_idCard;
    if(!/^\d{17}(\d|x)$/i.test(sId)) return false; 
    sId=sId.replace(/x$/i,"a"); 
    if(aCity[parseInt(sId.substr(0,2))]==null) return false; 
    var sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2)); 
    var d=new Date(sBirthday.replace(/-/g,"/")) ;
    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return false; 
    for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
    if(iSum%11!=1) return false; 
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
    return true;
} 
  
  },

btnManage:function(){
  this.setData({
    btnClass:'btn_wrap_default',
    btnText:'3'

  })
  var a=3
  var that =this;
 let timer = setInterval(()=>{
   a=a-1;
   if(a<0){
    clearInterval();
    this.setData({
      btnText:'确认提交',
      btnClass:'btn_wrap_active'
    })
   }else{
    that.setData({
      btnText:a
      })
   }

 },1000)
 
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
          var idcard = res.result.data[0].staff_idCard[0]+"****************"+res.result.data[0].staff_idCard[17];
          var phone =res.result.data[0].staff_phone[0]+res.result.data[0].staff_phone[1]+res.result.data[0].staff_phone[2]+"*****"+res.result.data[0].staff_phone[8]+res.result.data[0].staff_phone[9]+res.result.data[0].staff_phone[10]
          console.log(888,idcard);
          this.setData({
          [`proveInfo.isProve`]:true,
           [`proveInfo.staff_name`]:res.result.data[0].staff_name,
           [`proveInfo.staff_idCard`]:idcard,
           [`proveInfo.staff_phone`]:phone
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
}


  
})