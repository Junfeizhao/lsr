// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  console.log(event);
  if(event.queryType==0){    //今日工单
    return await db.collection('work').where({
      create_time:{
        $regex:'.*'+event.createTime,
        $options: 'i'
      }
    }).get();
  }else if(event.queryType==1){  //订单号查询
    return await db.collection('work').where({
      goods_number:event.queryText
    }).get();
  }else if(event.queryType==2){ //客户名查询
    return await db.collection('work').where({
      owner_name:event.queryText
    }).get();
  }else if(event.queryType==3){ //客户手机查询
    return await db.collection('work').where({
      owner_phone:event.queryText
    }).get();
  }else if(event.queryType==4){ //未打包查询
    return await db.collection('work').where({
      isChecked:0
    }).get();
  }


 return event
}