import { useState } from "react";
import { Plants, SelectDateRange} from "../interfaces/Comparativo";


export function SelectedOptionsEnergyHandler(): [SelectDateRange[], Plants[], (value: any) => void,  (value: any) => void] {
    const [selectedDates, setSelectedDates] = useState([]);
    let [selectedPlants, setSelectedPlants] = useState([]);
    const handlerDates = (value: any) => {
        setSelectedDates(value);
    }
    const handlerPlants = (value: any) => {
        setSelectedPlants(value);
    }
    
    return [selectedDates, selectedPlants, handlerDates,  handlerPlants]
}