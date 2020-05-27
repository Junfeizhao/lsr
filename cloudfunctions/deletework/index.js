// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  console.log(event);
  return await db.collection('work').where({
      _id:event.workid,
      create_staff_openid:event.userInfo.openId
  }).remove({
    success:res=>{
      console.log(res)
    },
    fail:err=>{
      console.log(err);
    }
  });
 return event
}