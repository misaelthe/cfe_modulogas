import { CentralGraph } from "./CentralGraph";
import {ExportCentralToExcel} from './ExportCentralDataToExcel';


export const GenerateByCentralGraph = (props: { data: any[]; listPlants:any[] }) => {

    return (
        <>
        {
            props.listPlants && props.listPlants.map((plant) => {
                const datos = props.data.filter(planta => planta.plant === plant)
                return (
                    <div key={plant+"top"} className="col-12 p-top10">
                    <div key={plant+"card"} className="card">
                        <div key={plant+"header"} className="card-header">
                        <ExportCentralToExcel data={datos} plant={plant}></ExportCentralToExcel>
                            {plant}
                        </div>
                        <div key={plant+"body"} className="card-body">
                            {<CentralGraph key={plant+"Graph"} data={datos} style={getStyle(props.listPlants.indexOf(plant))} ></CentralGraph>}
                        </div>
                    </div>
                </div>
                );
            }
            )}
        </>
    );    
}

function getStyle(value:number): string {
    let respuesta =  value;
    return "Graph" + respuesta.toString();
}
