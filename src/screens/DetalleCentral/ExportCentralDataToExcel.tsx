import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { Download }  from "react-bootstrap-icons";
import { Button } from 'react-bootstrap';
import {getTimestamp} from '../../utils/data/ParseDates';


interface ExcelExportData {
  data: any[];
  plant:any;
}

export const ExportCentralToExcel: React.FC<ExcelExportData> = ({ data, plant}) => {

  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=ISO-8859-1";
  const fileExtension = ".xlsx";
  let dataEx:any=[];
  Object.entries(data).forEach((arr:any)=>{
    let planta = "";
    let claveCentral="";
    let date = "";
    let totalIngreso = "";
    let totalEgreso = "";
    let diferencia = "";
    let ingresos:any =[];
    let egresos:any = [];
    Object.entries(arr[1]).forEach((dato:any)=>{
      if(dato[0]==="plant"){
        planta = dato[1];
      }
      if(dato[0]==="date"){
        date = dato[1];
      }
      if(dato[0]==="ClaveCentral"){
        claveCentral = dato[1];
      }
      if(dato[0]==="Ingresos"){
        totalIngreso = dato[1];
      }
      if(dato[0]==="Egresos"){
        totalEgreso = dato[1];
      }
      if(dato[0]==="Diferencia"){
        diferencia = dato[1];
      }
      if(dato[0].includes("Egresos-")){
        egresos.push(dato)
      }
      if(dato[0].includes("Ingresos-")){
        ingresos.push(dato)
      }
    });
    let row:any=[];
    row["Central"] = planta;
    row["ClaveCentral"] = claveCentral;
    row["Fecha"] = date;
    row["IngresoTotal"] = totalIngreso;
    row["EgresoTotal"] = totalEgreso;
    row["Diferencia"] = diferencia;
    for (let i=0;i<ingresos.length;i++){
      row[ingresos[i][0]]=ingresos[i][1];
    }
    for (let i=0;i<egresos.length;i++){
      row[egresos[i][0]]=egresos[i][1];
    }
    dataEx.push(row);

  })
  let fileName = "Extracto_"+plant+"_Ejecutado_"+getTimestamp()+fileExtension;


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