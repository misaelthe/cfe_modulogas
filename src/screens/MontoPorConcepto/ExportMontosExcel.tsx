import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Download }  from "react-bootstrap-icons";
import { Button } from 'react-bootstrap';
import {getTimestamp} from '../../utils/data/ParseDates';


interface ExcelExportData {
  data: any[];
  liquidacion:string;
  cliente:string;
}

export const ExportMontosExcel: React.FC<ExcelExportData> = ({ data, liquidacion,cliente}) => {

  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=ISO-8859-1";
  const fileExtension = ".xlsx";
  let dataEx:any=[];
  let fileName = "";
  let conceptos:any=[];

  if(liquidacion==="0"){
    let participante = new Map();
    let cenace = new Map();
    Object.entries(data).forEach((dato:any)=>{
        Object.entries(dato[1]).forEach((array:any)=>{
            if(array[0] === "P00"){
                Object.entries(array[1]).forEach((con:any)=>{
                    if(participante.get(con[0])==null){
                        participante.set(con[0],con[1]);
                    }else{
                        let value = participante.get(con[0]);
                        participante.set(con[0], con[1]+value)
                    }
                });
            }
            if(array[0] === "C00"){
                Object.entries(array[1]).forEach((con:any)=>{
                    if(cenace.get(con[0])==null){
                        cenace.set(con[0],con[1]);
                    }else{
                        let value = cenace.get(con[0]);
                        cenace.set(con[0], con[1]+value)
                    }
                });
            }
        })
    })
    participante = new Map([...participante.entries()].sort());
    cenace = new Map([...cenace.entries()].sort());
    let tableLength = participante.size>=cenace.size ? participante.size : cenace.size;
    let pObject:any = [];
    let cObject:any = [];
    for (const [key, value] of participante) {
        pObject.push({
            concepto:key,
            value:value
        });
    }
    for (const [key, value] of cenace) {
        cObject.push({
            concepto:key,
            value:value
        });
    }
    
    for(let cont=0;cont<tableLength;cont++){
        let prow = pObject[cont]===undefined ? {concepto:'-',value:0.0}:pObject[cont];
        let crow = cObject[cont]===undefined? {concepto:'-',value:0.0}:cObject[cont];
        conceptos.push({
            IngresosConcepto: prow.concepto+liquidacion,
            IngresosMonto:"$ "+formatter(prow.value),
            EgresosConcepto: crow.concepto,
            EgresosMonto:"$ "+formatter(crow.value),
        })
    }

    dataEx=conceptos;
    fileName="Montos_Por_Concepto_Liquidacion"+liquidacion+"_Ejecutado_"+getTimestamp()+fileExtension;
    
  }else{
    let debito = new Map();
    let credito = new Map();
    Object.entries(data).forEach((dato:any)=>{
        Object.entries(dato[1]).forEach((array:any)=>{
            if(array[0] === cliente+"D"+liquidacion){
                Object.entries(array[1]).forEach((con:any)=>{
                    if(debito.get(con[0])==null){
                        debito.set(con[0],con[1]);
                    }else{
                        let value = debito.get(con[0]);
                        debito.set(con[0], con[1]+value)
                    }
                });
            }
            if(array[0] === cliente+"C"+liquidacion){
                Object.entries(array[1]).forEach((con:any)=>{
                    if(credito.get(con[0])==null){
                        credito.set(con[0],con[1]);
                    }else{
                        let value = credito.get(con[0]);
                        credito.set(con[0], con[1]+value)
                    }
                });
            }
        })
    })
    debito = new Map([...debito.entries()].sort());
    credito = new Map([...credito.entries()].sort());
    let tableLength = debito.size>=credito.size ? debito.size : credito.size;
    let pObject:any = [];
    let cObject:any = [];
    for (const [key, value] of debito) {
        pObject.push({
            concepto:key,
            value:value
        });
    }
    for (const [key, value] of credito) {
        cObject.push({
            concepto:key,
            value:value
        });
    }

    for(let cont=0;cont<tableLength;cont++){
        let prow = pObject[cont]===undefined ? {concepto:'-',value:0.0}:pObject[cont];
        let crow = cObject[cont]===undefined? {concepto:'-',value:0.0}:cObject[cont];
        conceptos.push({
            DebitoConcepto: prow.concepto,
            DebitoMonto:"$ "+formatter(prow.value),
            CreditoConcepto: crow.concepto,
            CreditoMonto:"$ "+formatter(crow.value),
        })
    }

    dataEx=conceptos;
    let user = cliente ==="P" ? "PARTICIPANTE": "CENACE"
    fileName="Montos_Por_Concepto_Liquidacion"+liquidacion+"_"+user+"_Ejecutado_"+getTimestamp()+fileExtension;

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