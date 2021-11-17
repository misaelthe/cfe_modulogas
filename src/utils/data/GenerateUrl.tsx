export function GenerateUrl(baseUrl:string, startDate: Date, endDate: Date, action:string) {
    const sDateFormatted = getDateFormatted(startDate);
    const eDateFormatted = getDateFormatted(endDate);
    const url = baseUrl + '?accion='+action+'&sDate='+sDateFormatted+'&eDate='+eDateFormatted;
    return url;
}

/*
Funcion para enviar las fechas y el accion al backend
*/
export function GenerateUrlCobroEnergia(baseUrl:string, sdate: Date, edate:Date, action:string) {
    const startDate = getDateFormatted(sdate);
    const endDate = getDateFormatted(edate);
    const url = baseUrl + '?accion='+action+'&sDate='+startDate+'&eDate='+endDate;
    return url;
}

function getDateFormatted(dateMod:Date){
    var  monthNum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
];
    var year = dateMod.getFullYear();
    var month = monthNum[dateMod.getMonth()];
    var day = dateMod.getDate().toString().length ===1 ? "0" + dateMod.getDate():dateMod.getDate();
    var date =day+"-"+month+"-"+year;
    return date;
}