import React from 'react';
import { ExportLiquidacionesExcel } from './ExportLiquidacionesExcel';
import {LiquidacionCeroTable} from './LiquidacionCeroTable';
import {ReliquidacionesTable} from './ReliquidacionesTable';
import { Alert } from '@material-ui/lab';

interface Comparativo {
    data: any[];
    startDate: Date,
    endDate: Date
}

export const DetalleLiquidacionView: React.FC<Comparativo> = ({ data, startDate, endDate}) => {
    let liquidacion:any=[];
    let zerosTablas = false;
    let noLiq:any=[];
    Object.entries(data).forEach((array: any) => {
        if(array[0]==="Liquidacion"){
            liquidacion = array[1];
            if(liquidacion.ingresos === undefined && liquidacion.egresos ===undefined){
                zerosTablas = true;
            }
            Object.entries(liquidacion).forEach((liq:any)=>{
                if(liq[0]==="ingresos"||liq[0]==="egresos"){
                    Object.entries(liq[1]).forEach((dato:any)=>{
                        if(!noLiq.includes(dato[0].substring(2,3)) && dato[0].substring(2,3) !=="0"){
                            noLiq.push(dato[0].substring(2,3))
                        }
                    })
                }
            })
        }
    });
    noLiq.sort()
    let liq=noLiq;
    return(
        <div className="container-fluid p-top">
            <h3 className="title">Tablas por Tipo de Liquidación</h3>
            <div className="row">
                <div className="col-12 p-top10">
                    <div className="card">
                        <div className="card-header">Tabla Facturación 0
                            <ExportLiquidacionesExcel data={liquidacion} liquidacion={"0"} startDate={startDate} endDate={endDate}></ExportLiquidacionesExcel>
                        </div>   
                    </div>
                    {!zerosTablas&&
                        <LiquidacionCeroTable data={liquidacion} liquidacion={"0"} startDate={startDate} endDate={endDate}></LiquidacionCeroTable>
                    }{zerosTablas&&
                        <Alert severity="info">No hay datos para el periodo de fechas seleccionado.</Alert>
                    }
                </div> 
                {
                    liq.map((tipoLiq:any) => {
                        return(
                            <div className="col-12 p-top10" key={'main'+tipoLiq}>
                                <div className="card" key={'card'+tipoLiq}>
                                    <div className="card-header" key={'cardH'+tipoLiq}>Tabla Reliquidación {tipoLiq}
                                    <ExportLiquidacionesExcel data={liquidacion} liquidacion={tipoLiq} startDate={startDate} endDate={endDate}></ExportLiquidacionesExcel>
                                    </div>   
                                </div>
                                {!zerosTablas&&
                                    <ReliquidacionesTable key={'rel'+tipoLiq} data={liquidacion} liquidacion={tipoLiq} startDate={startDate} endDate={endDate}></ReliquidacionesTable>
                                }{zerosTablas&&
                                    <Alert key={'alert'+tipoLiq} severity="info">No hay datos para el periodo de fechas seleccionado.</Alert>
                                }
                            </div>
                        ); 
                    })
                }
            </div>
         </div>
    )
}