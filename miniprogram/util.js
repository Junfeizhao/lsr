const formatTime = date=>{
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const hours = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  
  return [year,month,day].map(formatNumber).join('/') + " "+[hours,minute,second].map(formatNumber).join(":")
  
  
}

const timeToDay= date=>{
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  
  return [year,month,day].map(formatNumber).join('/')
  
  
}

const formatNumber=n=>{
  n=n.toString();
  return n[1]?n:"0"+n;
}

module.exports={
  formatTime:formatTime,
  timeToDay: timeToDay
}