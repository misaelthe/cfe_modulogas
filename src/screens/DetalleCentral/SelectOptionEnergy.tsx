
import React from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { Plants} from '../../utils/interfaces/Comparativo';

interface DataOptions {
    
    startDate: Date,
    endDate: Date
    handlerDates:any,
    handlerPlants:any,
    selectedPlants:any[],
    plantsForSelector:Plants[],
}

export interface SelectBoxContracts {
    id: number
    value: Date
}


export const SelectOption: React.FC<DataOptions> = ({startDate, endDate, handlerDates, handlerPlants,selectedPlants, plantsForSelector}) => {

    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    const animatedComponents = makeAnimated();

    var  monthNum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var daysInRange = [];

    for (var d = sDate; d <= eDate; d.setDate(d.getDate() + 1)) {
        let year = d.getFullYear();
        let month = monthNum[d.getMonth()];
        let day = d.getDate().toString().length ===1 ? "0" + d.getDate():d.getDate();
        daysInRange.push({
            value: d.getDate().toString(),
            label: year+"-"+month+"-"+day
        });
    }
    
    return (
        <>
            <div className="row">
           
                <div className="col-6">
                    <label >Filtro por Fecha Liquidación:</label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={daysInRange}
                        onChange={handlerDates}
                    />
                </div>
                <div className="col-6">
                    <label >Filtro por Central:</label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={plantsForSelector}
                        onChange={handlerPlants}
                        value={selectedPlants}
                    />
                </div>
            </div>

        </>
    );
}




