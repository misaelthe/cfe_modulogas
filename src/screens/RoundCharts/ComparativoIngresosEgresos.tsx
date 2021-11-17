import React from 'react';
import { IngresosEgresosRoundChart } from './IngresosEgresosRoundChart';
import TablaLiquidaciones from '../Tables/TablaLiquidaciones';
import { ExportToExcel } from '../../utils/data/ExportDataToExcel';
import TablaIngresosEgresos from '../Tables/TablaIngresosEgresos';
import { Alert } from '@material-ui/lab';

interface Comparativo {
    data: any[];
    startDate: Date,
    endDate: Date
}

export const ComparativoIngresosEgresos: React.FC<Comparativo> = ({ data, startDate, endDate}) => {
    let totales:any = [];
    let liquidacion:any=[];

    Object.entries(data).forEach((array: any) => {
        if(array[0] === "totales"){
            totales=array[1];
        }
        else if(array[0]==="Liquidacion"){
            liquidacion = array[1];
        }
    })
    let zerosIngresos=true;
    let zerosEgresos=true;
    let zerosTablas=true;
    Object.entries(totales).forEach((array: any) => {
        if(array[0]==="Ingresos"){
            Object.entries(array[1]).forEach((datos: any) => {
                if(datos[1].totalTipo!==0){
                    zerosIngresos=false;
                }
            })
        }else if(array[0]==="Egresos"){
            Object.entries(array[1]).forEach((datos: any) => {
                if(datos[1].totalTipo!==0){
                    zerosEgresos=false;
                }
            })
        }
    })
    Object.entries(liquidacion).forEach((array: any) => {
        if(array[0]==="ingresos"){
            Object.entries(array[1]).forEach((datos: any) => {
                if(datos[1]!==0){
                    zerosTablas=false;
                }
            })
        }else if(array[0]==="egresos"){
            Object.entries(array[1]).forEach((datos: any) => {
                if(datos[1]!==0){
                    zerosTablas=false;
                }
            })
        }
    })

return (
        <div className="container-fluid p-top">
            <h3 className="title">Ingresos Y Egresos Totales</h3>
            <div className="row">
                <div className="col-12 p-top10">
                    <div className="card">
                        <div className="card-header">Ingreso por Grupo</div>
                        {!zerosIngresos&&
                            <div className="card-body">
                                <IngresosEgresosRoundChart data={totales} tipo={"Ingresos"} />
                            </div>
                        }{zerosIngresos&&
                            <div className="row">
                                <div className="col-12 p-top10">
                                    <Alert severity="info">No hay datos para el periodo de fechas seleccionado.</Alert>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-12 p-top10">
                    <div className="card">
                        <div className="card-header">Egresos por Grupo</div>
                        {!zerosEgresos&&
                            <div className="card-body">
                                <IngresosEgresosRoundChart data={totales} tipo={"Egresos"} />
                            </div>
                        }{zerosEgresos&&
                            <div className="row">
                                <div className="col-12 p-top10">
                                    <Alert severity="info">No hay datos para el periodo de fechas seleccionado.</Alert>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                
                <div className="col-6 p-top10">
                    <div className="card">
                        <div className="card-header">Tabla CENACE
                            <ExportToExcel data={liquidacion} startDate={startDate} endDate={endDate} version={"CENACE"}></ExportToExcel>
                        </div>   
                    </div>
                    {!zerosTablas&&
                        <TablaIngresosEgresos data={liquidacion} adquiriente={"C"}/>
                    }{zerosTablas&&
                        <Alert severity="info">No hay datos para el periodo de fechas seleccionado.</Alert>
                    }
                </div>  
                <div className="col-6 p-top10">
                    <div className="card">
                        <div className="card-header">Tabla Participante
                            <ExportToExcel data={liquidacion} startDate={startDate} endDate={endDate} version={"PARTICIPANTE"}></ExportToExcel>
                        </div>   
                    </div>
                    {!zerosTablas&&
                        <TablaIngresosEgresos data={liquidacion} adquiriente={"P"}/>
                    }{zerosTablas&&
                        <Alert severity="info">No hay datos para el periodo de fechas seleccionado.</Alert>
                    }
                </div> 
                

                <div className="col-12 p-top10">
                <div className="card">
                    <div className="card-header">Tabla Por Fecha Liquidación
                        <ExportToExcel data={liquidacion} startDate={startDate} endDate={endDate} version={"liquidacion"}></ExportToExcel>
                    </div>
                    {!zerosTablas&&
                        <TablaLiquidaciones data={liquidacion}/>
                    }{zerosTablas&&
                        <Alert severity="info">No hay datos para el periodo de fechas seleccionado.</Alert>
                    }
                </div>
            </div>
            </div>
         </div>
    )
}