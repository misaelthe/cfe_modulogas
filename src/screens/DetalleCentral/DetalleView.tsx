import { ComparativoTech} from '../../utils/interfaces/Comparativo';
import { DetalleCentralesGraph } from './DetalleCentralGraph';
import { GenerateByCentralGraph } from './GenerateByCentralGraph';
import { GetDataForSelectedEnergy } from '../../utils/data/GetDataForSelectedEnergy';
import {GetDataLiquidacion} from '../../utils/data/GetDataLiquidacion'
import { SelectedOptionsEnergyHandler } from '../../utils/handlers/SelectedOptionsEnergy';
import { SelectOption } from './SelectOptionEnergy';
import { GetCSSStyle } from '../../utils/data/GetCSSStyle';
import { Alert } from '@material-ui/lab';

interface DetalleCentral {
    data: ComparativoTech[],
    startDate: Date,
    endDate: Date
}

export const DetalleCentralView: React.FC<DetalleCentral> = ({data, startDate, endDate }) => {
    let centrales:any = [];
    Object.entries(data).forEach((array: any) => {
        if(array[0] === "Centrales"){
            centrales=array[1];
        }
    
   })
    const [selectedDates, selectedPlants, handlerDates, handlerPlants] = SelectedOptionsEnergyHandler();
    const [plantsForSelector, dataSelected] = GetDataForSelectedEnergy(centrales, selectedDates,selectedPlants);
    const [dataLiquidacion,listPlant] = GetDataLiquidacion(centrales, selectedDates,selectedPlants);

    const keys = Object.keys(dataSelected);
    const showInfo = (keys.length > 1);
    const cssStyle = GetCSSStyle(dataSelected);

     return(
        <div className="container-fluid p-top">
            <h3 className="title">Ingresos y Egresos por Central</h3>
            <div className="card">
                <div className="card-body"> <SelectOption startDate={startDate} endDate={endDate} handlerDates={handlerDates} handlerPlants={handlerPlants} selectedPlants={selectedPlants} plantsForSelector={plantsForSelector}></SelectOption></div>
            </div>
            {showInfo &&
            <div className="row">
                <div className="col-12 p-top10">
                    <div className="card">
                    <div className="card-header">Total de Ingresos y Egresos Por Central</div>
                        <div className="card-body" style={{maxHeight:'540px', overflowY:'auto'}} >
                            <DetalleCentralesGraph data={dataSelected} style={cssStyle}></DetalleCentralesGraph>
                        </div>
                    </div>
                </div>
                <GenerateByCentralGraph data={dataLiquidacion} listPlants={listPlant} ></GenerateByCentralGraph>
            </div>
            }
            {!showInfo &&
                <div className="row">
                    <div className="col-12 p-top10">
                        <Alert severity="info">No hay datos para el periodo de fechas seleccionado.</Alert>
                    </div>
                </div>
            }
        </div>
    )
}