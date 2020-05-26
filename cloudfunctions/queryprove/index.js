// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  console.log(event);
  return await db.collection('proveinfo').where({[`userInfo.openId`]:event.openid}).get()
 return event
}