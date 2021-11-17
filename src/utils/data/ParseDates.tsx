
export function getDateSlash(dateMod:Date){
    var  monthNum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var year = dateMod.getFullYear();
    var month = monthNum[dateMod.getMonth()];
    var day = dateMod.getDate().toString().length ===1 ? "0" + dateMod.getDate():dateMod.getDate();
    var date =day+"/"+month+"/"+year;
    return date;
}

export function getDateDash(dateMod:Date){
    var  monthNum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var year = dateMod.getFullYear();
    var month = monthNum[dateMod.getMonth()];
    var day = dateMod.getDate().toString().length ===1 ? "0" + dateMod.getDate():dateMod.getDate();
    var date =day+"-"+month+"-"+year;
    return date;
}

export function getDateInverted(dateMod:Date){
  var  monthNum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  var year = dateMod.getFullYear();
  var month = monthNum[dateMod.getMonth()];
  var day = dateMod.getDate().toString().length ===1 ? "0" + dateMod.getDate():dateMod.getDate();
  var date =year+"-"+month+"-"+day;
  return date;
}
  
export function getTimestamp(){
  let clock = new Date()
  var  monthNum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  var year = clock.getFullYear();
  var month = monthNum[clock.getMonth()];
  var day = clock.getDate().toString().length ===1 ? "0" + clock.getDate():clock.getDate();
  var hour =   clock.getHours() 
  var minutes = clock.getMinutes() 
  var seconds = clock.getSeconds() 
  var date =day+"-"+month+"-"+year+"_"+hour+"-"+minutes+"_"+seconds;
  return date;
}

export function getDateLetter(dateMod:Date){
  var  monthNum = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var year = dateMod.getFullYear();
  var month = monthNum[dateMod.getMonth()];
  var day = dateMod.getDate().toString().length ===1 ? "0" + dateMod.getDate():dateMod.getDate();
  var date =day + " de " +month +" del " +year;
  return date;
}