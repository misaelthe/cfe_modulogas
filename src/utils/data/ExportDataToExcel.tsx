import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Download }  from "react-bootstrap-icons";
import { Button } from 'react-bootstrap';
import {getDateDash, getTimestamp} from '../../utils/data/ParseDates'
import {getDateInverted} from '../../utils/data/ParseDates';


interface ExcelExportData {
  data: never[];
  startDate:Date;
  endDate:Date;
  version: any;
}

export const ExportToExcel: React.FC<ExcelExportData> = ({ data, startDate, endDate, version}) => {

  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=ISO-8859-1";
  const fileExtension = ".xlsx";
  let conceptos:any=[];
  let dataEx:any;
  let fileName:any;

  let ingresosHead:any=[];
  let egresosHead:any=[];
  let liquidaciones:any = [];
  let dates:any=[];
  let conceptosMap:any=new Map();
    conceptosMap.set('PC1', 'NOTA DE CRÉDITO RELIQ 1');
    conceptosMap.set('PD1', 'NOTA DE DÉBITO RELIQ 1');
    conceptosMap.set('PC2', 'NOTA DE CRÉDITO RELIQ 2');
    conceptosMap.set('PD2', 'NOTA DE DÉBITO RELIQ 2');
    conceptosMap.set('PC3', 'NOTA DE CRÉDITO RELIQ 3');
    conceptosMap.set('PD3', 'NOTA DE DÉBITO RELIQ 3');
    conceptosMap.set('PC4', 'NOTA DE CRÉDITO RELIQ 4');
    conceptosMap.set('PD4', 'NOTA DE DÉBITO RELIQ 4');
    conceptosMap.set('PC5', 'NOTA DE CRÉDITO RELIQ 5');
    conceptosMap.set('PD5', 'NOTA DE DÉBITO RELIQ 5');
    conceptosMap.set('PC6', 'NOTA DE CRÉDITO RELIQ 6');
    conceptosMap.set('PD6', 'NOTA DE DÉBITO RELIQ 6');
    conceptosMap.set('CC1', 'NOTA DE CRÉDITO RELIQ 1');
    conceptosMap.set('CD1', 'NOTA DE DÉBITO RELIQ 1');
    conceptosMap.set('CC2', 'NOTA DE CRÉDITO RELIQ 2');
    conceptosMap.set('CD2', 'NOTA DE DÉBITO RELIQ 2');
    conceptosMap.set('CC3', 'NOTA DE CRÉDITO RELIQ 3');
    conceptosMap.set('CD3', 'NOTA DE DÉBITO RELIQ 3');
    conceptosMap.set('CC4', 'NOTA DE CRÉDITO RELIQ 4');
    conceptosMap.set('CD4', 'NOTA DE DÉBITO RELIQ 4');
    conceptosMap.set('CC5', 'NOTA DE CRÉDITO RELIQ 5');
    conceptosMap.set('CD5', 'NOTA DE DÉBITO RELIQ 5');
    conceptosMap.set('CC6', 'NOTA DE CRÉDITO RELIQ 6');
    conceptosMap.set('CD6', 'NOTA DE DÉBITO RELIQ 6');

    if(version === "CENACE" || version ==="PARTICIPANTE"){
        let adquiriente = version === "CENACE" ? "C":"P";
        let mapa:any = new Map();
        Object.entries(data).forEach((elements: any) => {
            if(elements[0] ==="fechas"){
                Object.entries(elements[1]).forEach((dato: any) => {
                    Object.entries(dato[1]).forEach((arr: any) => {
                        if(arr[0]=== "conceptos"){
                            Object.entries(arr[1]).forEach((con: any) => {
                                if(con[0].startsWith(adquiriente)){
                                    if(mapa.get(con[0])==null){
                                        mapa.set(con[0],con[1]);
                                    }else{
                                        let value = mapa.get(con[0]);
                                        mapa.set(con[0], con[1]+value)
                                    }
                                }
                            })
                        }
                    });
                });
            }
        });
        let total = 0;
        for (let cont = 0;cont<6;cont++){
            for(let[key,value]of mapa){
                if(key.includes(cont)){
                    let row:any=[];
                    let firstColumn = "";
                    if(cont===0){
                        firstColumn = 'Factura 0';
                        
                    }else{
                        firstColumn = conceptosMap.get(key);
                    }
                    row['FACTURA ' + version ] = firstColumn;
                    row['MONTO($)']='$ '+formatter(value);
                    row['CON IVA($)']='$ '+formatter(value*1.16);
                    total = total +value;
                    conceptos.push(row);
                }
            }
        }
        let row:any = [];
        row['FACTURA ' + version ] = 'Total';
        row['MONTO($)']='$ '+formatter(total);
        row['CON IVA($)']='$ '+formatter(total*1.16);
        conceptos.push(row);

        dataEx= conceptos;
        fileName = "Extracto_Tipos_Factura_"+version+"_"+getDateDash(startDate)+"_al_"+getDateDash(endDate)+"_Ejecutado_"+getTimestamp()+fileExtension;
    }
    else if(version === "liquidacion"){
        Object.entries(data).forEach((elements: any) => {
        if(elements[0]==="egresos"){
            Object.entries(elements[1]).forEach((egreso: any) => {
                egresosHead.push(egreso);
            });
        }else if(elements[0]==="ingresos"){
            Object.entries(elements[1]).forEach((ingreso: any) => {
                ingresosHead.push(ingreso);
            });
        }else if(elements[0]==="fechas"){
            Object.entries(elements[1]).forEach((fecha:any) => {
                dates.push({fecha:fecha[1].fecha})
            });
        }
    })

    sortArrays();
    orderDates();
    for(let cont=0;cont<egresosHead.length;cont++){
        liquidaciones.push(egresosHead[cont][0])
    }
    for(let cont=0;cont<ingresosHead.length;cont++){
        liquidaciones.push(ingresosHead[cont][0])
    }
    for(let i=0;i<dates.length;i++){    
        Object.entries(data).forEach((elements: any) => {
            if(elements[0]==="fechas"){
                Object.entries(elements[1]).forEach((fecha:any) => {
                    let row:any=[];
                    if(fecha[1].fecha===dates[i].fecha){
                        row['Fecha']=fecha[1].fecha;
                        for(let cont=0;cont<liquidaciones.length;cont++){
                            let filter:any = Object.entries(fecha[1].conceptos).filter((dato:any)=>dato[0]===liquidaciones[cont]);   
                            if(filter.length>0){
                              row[liquidaciones[cont]] = filter[0][1];
                            }else{
                              row[liquidaciones[cont]] = 0;
                            }
                        }
                        conceptos.push(row);
                    }
                });
            }
        })
    }

    dataEx= conceptos;
    fileName = "Extracto_Fecha_Liquidacion_"+getDateDash(startDate)+"_al_"+getDateDash(endDate)+"_Ejecutado_"+getTimestamp()+fileExtension;
  }
  

    function sortArrays(){
        let newIngresos= [];
        let newEgresos = [];
        for(let i = 0;i<6;i++){
            let filterIngresos = ingresosHead.filter((dato:any)=>dato[0].includes(i));
            let filterEgresos =  egresosHead.filter((dato:any)=>dato[0].includes(i));
            for(let cont=0;cont<filterIngresos.length;cont++){
                newIngresos.push(filterIngresos[cont]);
            }
            for(let cont=0;cont<filterEgresos.length;cont++){
                newEgresos.push(filterEgresos[cont]);
            }
        }
        ingresosHead.length=0;
        egresosHead.length=0;
        for(let i=0;i<newEgresos.length;i++){
            egresosHead.push(newEgresos[i])
        }
        for(let i=0;i<newIngresos.length;i++){
            ingresosHead.push(newIngresos[i])
        }
    }

    function orderDates(){
        let dateArr:any = [];
        Object.entries(dates).forEach((date: any) => {
            var st = date[1].fecha;
            var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
            var dt = new Date(st.replace(pattern,'$3-$2-$1'));
            dt.setDate(dt.getDate() + 1);
            dateArr.push(dt);
        })
        dateArr.sort(function(a:any, b:any) { a = new Date(a); b = new Date(b); return a<b ? -1 : a<b ? 1 : 0; });
        dates.length = 0;
        for (let i = 0; i < dateArr.length; i++) {
            dates.push({
                fecha:getDateInverted(dateArr[i])
            })
        }   
    }

    function formatter(value:number){
        return (Math.round(value * 100) / 100).toLocaleString('en');
    }

    const exportToCSV = (apiData: any) => {
        const ws = XLSX.utils.json_to_sheet(dataEx);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data,fileName);
    };

    return (
        <Button className='btn-success btn-sm float-right' onClick={() => exportToCSV(dataEx)}>
            Descargar&nbsp;   
        <Download  /> 
        </Button>
    );
};