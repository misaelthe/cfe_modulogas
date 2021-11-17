import React from 'react';
import { Alert } from '@material-ui/lab';
import { LiquidacionCeroTable } from './LiquidacionMontoCeroTable';
import { ReliquidacionesMontoTable } from './ReliquidacionesMontoTable';
import { ExportMontosExcel } from './ExportMontosExcel';

interface Comparativo {
    data: any[];
    startDate: Date,
    endDate: Date
}

export const MontoConceptoView: React.FC<Comparativo> = ({ data, startDate, endDate}) => {
    let conceptosCentral:any=[];
    let zerosTablas = false;
    let noLiq:any=[];
    Object.entries(data).forEach((array: any) => {
        if(array[0]==="ConceptosCentral"){
            conceptosCentral = array[1];
            Object.entries(array[1]).forEach((central:any)=>{
                Object.entries(central[1]).forEach((con:any)=>{
                    if(!noLiq.includes(con[0].substring(2,3)) && con[0].substring(2,3) !=="0" && con[0]!=="Clave" && con[0]!=="Central"){
                        noLiq.push(con[0].substring(2,3))
                    }
                })
            })
        }
    });
    noLiq.sort()
    let liq=noLiq;
    return(
        <div className="container-fluid p-top">
            <h3 className="title">Montos por Concepto</h3>
            <div className="row">
                <div className="col-12 p-top10">
                    <div className="card">
                        <div className="card-header">FACTURACIÓN 0
                            <ExportMontosExcel data={conceptosCentral} liquidacion={"0"} cliente={"NA"}></ExportMontosExcel>
                        </div>   
                    </div>
                    {!zerosTablas&&
                        <LiquidacionCeroTable data={conceptosCentral}></LiquidacionCeroTable>
                    }{zerosTablas&&
                        <Alert severity="info">No hay datos para el periodo de fechas seleccionado.</Alert>
                    }
                </div> 
            </div>
            {
                liq.map((tipoLiq:any) => {
                    return(
                        <div key={"container"+tipoLiq}>
                            <div className="col-12 p-top10" key={'mainP'+tipoLiq}>
                                <div className="card" key={'cardP'+tipoLiq}>
                                    <div className="card-header" key={'cardHP'+tipoLiq}>PARTICIPANTE (RE-LIQUIDACIÓN {tipoLiq})
                                        <ExportMontosExcel data={conceptosCentral} liquidacion={tipoLiq} cliente={"P"}></ExportMontosExcel>
                                    </div>   
                                </div>
                                {!zerosTablas&&
                                    <ReliquidacionesMontoTable data={conceptosCentral} liquidacion={tipoLiq} cliente={"P"}></ReliquidacionesMontoTable>
                                }{zerosTablas&&
                                    <Alert key={'alert'+tipoLiq} severity="info">No hay datos para el periodo de fechas seleccionado.</Alert>
                                }
                            </div>
                            <div className="col-12 p-top10" key={'mainC'+tipoLiq}>
                            <div className="card" key={'cardC'+tipoLiq}>
                                <div className="card-header" key={'cardHC'+tipoLiq}>CENACE (RE-LIQUIDACIÓN {tipoLiq})
                                    <ExportMontosExcel data={conceptosCentral} liquidacion={tipoLiq} cliente={"C"}></ExportMontosExcel>
                                </div>   
                            </div>
                                {!zerosTablas&&
                                    <ReliquidacionesMontoTable data={conceptosCentral} liquidacion={tipoLiq} cliente={"C"}></ReliquidacionesMontoTable>
                                }{zerosTablas&&
                                    <Alert key={'alert'+tipoLiq} severity="info">No hay datos para el periodo de fechas seleccionado.</Alert>
                                }
                            </div>
                        </div>
                    ); 
                })
            }
         </div>
    )
}