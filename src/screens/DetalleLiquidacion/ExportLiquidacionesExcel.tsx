import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Download }  from "react-bootstrap-icons";
import { Button } from 'react-bootstrap';
import {getTimestamp} from '../../utils/data/ParseDates';
import {getDateSlash} from '../../utils/data/ParseDates';


interface ExcelExportData {
  data: any[];
  liquidacion:string;
  startDate:Date;
  endDate:Date;
}

export const ExportLiquidacionesExcel: React.FC<ExcelExportData> = ({ data, liquidacion, startDate, endDate}) => {

  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=ISO-8859-1";
  const fileExtension = ".xlsx";
  let dataEx:any=[];
  let fileName = "";
  let ingresoTotal = 0.0;
  let egresoTotal = 0.0;
  let conceptos:any=[];
  fileName="Tabla_Periodo_Liquidacion_Factura"+liquidacion+"_Ejecutado_"+getTimestamp()+fileExtension;
  if(liquidacion === "0"){
    Object.entries(data).forEach((array: any) => {
        if(array[0]==="ingresos"){
            Object.entries(array[1]).forEach((concepto: any) => {
                if(concepto[0].includes(liquidacion)){
                    ingresoTotal = ingresoTotal + concepto[1]
                }
            });
        }
        else if(array[0]==="egresos"){
            Object.entries(array[1]).forEach((concepto: any) => {
                if(concepto[0].includes(liquidacion)){
                    egresoTotal = egresoTotal + concepto[1]
                }
            });
        }
    });
    //Ingresos
    conceptos.push({
        FechaInicioLiquidacion:getDateSlash(startDate),
        FechaFinalLiquidacion:getDateSlash(endDate),
        Concepto:"Total de Ingresos",
        Importe:"$"+formatter(ingresoTotal),
        ImporteMasIVA:"$"+formatter(ingresoTotal*1.16),
    })
    //Egresos
    conceptos.push({
        FechaInicioLiquidacion:getDateSlash(startDate),
        FechaFinalLiquidacion:getDateSlash(endDate),
        Concepto:"Total de Egresos",
        Importe:"$"+formatter(egresoTotal),
        ImporteMasIVA:"$"+formatter(egresoTotal*1.16),
    })
    //Neto
    let dif = ingresoTotal-egresoTotal;
    conceptos.push({
        FechaInicioLiquidacion:getDateSlash(startDate),
        FechaFinalLiquidacion:getDateSlash(endDate),
        Concepto:"Neto",
        Importe:"$"+formatter(dif),
        ImporteMasIVA:"$"+formatter(dif*1.16),
    })
    dataEx=conceptos;
  }else{
    let pc:number = 0.0;
    let pd = 0.0;
    let cc = 0.0;
    let cd = 0.0
    Object.entries(data).forEach((array: any) => {
        if(array[0]==="ingresos"){
            let pcFactura = Object.entries(array[1]).filter((dato:any)=>dato[0]==="PC"+liquidacion);
            if(pcFactura.length>0){
                Object.entries(pcFactura).forEach((fact:any)=>{
                    pc = pc + fact[1][1];
                })
            }else{
                pc=0.0
            }
            let pdFactura = Object.entries(array[1]).filter((dato:any)=>dato[0]==="PD"+liquidacion);
            if(pdFactura.length>0){
                Object.entries(pdFactura).forEach((fact:any)=>{
                    pd = pd + fact[1][1];
                })
            }else{
                pd=0.0
            }
        }
        else if(array[0]==="egresos"){
            let ccFactura = Object.entries(array[1]).filter((dato:any)=>dato[0]==="CC"+liquidacion);
            if(ccFactura.length>0){
                Object.entries(ccFactura).forEach((fact:any)=>{
                    cc = cc + fact[1][1];
                })
            }else{
                cc=0.0
            }
            let cdFactura = Object.entries(array[1]).filter((dato:any)=>dato[0]==="CD"+liquidacion);
            if(cdFactura.length>0){
                Object.entries(cdFactura).forEach((fact:any)=>{
                    cd = cd + fact[1][1];
                })
            }else{
                cd=0.0
            }
        }
    });
    //Credito Participante
    conceptos.push({
        FechaInicioLiquidacion:getDateSlash(startDate),
        FechaFinalLiquidacion:getDateSlash(endDate),
        Concepto:"Nota Credito Participante",
        Importe:"$"+formatter(pc),
        ImporteMasIVA:"$"+formatter(pc*1.16),
    })
    //Debito Participante
    conceptos.push({
        FechaInicioLiquidacion:getDateSlash(startDate),
        FechaFinalLiquidacion:getDateSlash(endDate),
        Concepto:"Nota Debito Participante",
        Importe:"$"+formatter(pd),
        ImporteMasIVA:"$"+formatter(pd*1.16),
    })
    //Credito CENACE
    conceptos.push({
        FechaInicioLiquidacion:getDateSlash(startDate),
        FechaFinalLiquidacion:getDateSlash(endDate),
        Concepto:"Nota Credito CENACE",
        Importe:"$"+formatter(cc),
        ImporteMasIVA:"$"+formatter(cc*1.16),
    })
    //Debito CENACE
    conceptos.push({
        FechaInicioLiquidacion:getDateSlash(startDate),
        FechaFinalLiquidacion:getDateSlash(endDate),
        Concepto:"Nota Debito CENACE",
        Importe:"$"+formatter(cd),
        ImporteMasIVA:"$"+formatter(cd*1.16),
    })
    dataEx=conceptos;
  }

  function formatter(value:number){
    return (Math.round(value * 100) / 100).toLocaleString('en');
}
  
  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(dataEx);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data,fileName);
  };

  return (
    <Button className='btn-success btn-sm float-right' onClick={() => exportToCSV()}>
        Descargar&nbsp;   
      <Download  /> 
    </Button>
  );
};