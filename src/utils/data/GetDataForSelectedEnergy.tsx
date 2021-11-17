import { Plants, SelectDateRange} from "../interfaces/Comparativo";


export const GetDataForSelectedEnergy = (data: any[], selectedDates: SelectDateRange[],  selectedPlants: Plants[]): any[] => {
    const plantsForSelector: Plants[] = [];
    const listPlants: any[] = [];
    const listPlantsForSelector: any[] = [];
    const ingresoTotal: any[] = [];
    const egresoTotal: any[] = [];
    const diferenciaTotal :any[] = [];
    let chartData = [{}];

    //Buscar por fechas seleccionadas
    Object.entries(selectedDates).forEach((dates: any) => {
        Object.entries(data).forEach((allDates: any) => {
            let dateCompare = allDates[0].replace('Fecha', '');
            if (dateCompare === dates[1].label) {
                Object.entries(allDates[1].centrales).forEach((allPlants: any) => {
                    Object.entries(allPlants[1]).forEach((plants: any) => {
                        //Se utiliza para llenar el selector de centrales
                        if (selectedPlants.length > 0) {
                            const index = listPlantsForSelector.findIndex(elemento => elemento === plants[0]);
                            if (index === -1) {
                                listPlantsForSelector.push(plants[0]);
                            }
                            Object.entries(selectedPlants).forEach((selectPlants: any) => {
                                if(plants[0] === selectPlants[1].value){
                                    const index = listPlants.findIndex(elemento => elemento === plants[0]);
                                    if (index !== -1) {
                                        ingresoTotal[index] = ingresoTotal[index] + plants[1][0].data.Ingresos;
                                        egresoTotal[index] = egresoTotal[index] + plants[1][0].data.Egresos;
                                        diferenciaTotal[index] = diferenciaTotal[index] + plants[1][0].data.Diferencia;
                                    } else {
                                        listPlants.push(plants[0]);
                                        ingresoTotal.push(plants[1][0].data.Ingresos);
                                        egresoTotal.push(plants[1][0].data.Egresos);
                                        diferenciaTotal.push(plants[1][0].data.Diferencia);
                                    }
                                }
                            });
                        }else {
                            /*const index = listPlants.findIndex(elemento => elemento === plants[0]);
                            if (index !== -1) {
                                ingresoTotal[index] = ingresoTotal[index] + plants[1][0].data.Ingresos;
                                egresoTotal[index] = egresoTotal[index] + plants[1][0].data.Egresos;
                                diferenciaTotal[index] = diferenciaTotal[index] + plants[1][0].data.Diferencia;
                            } else {
                                listPlants.push(plants[0]);
                                ingresoTotal.push(plants[1][0].data.Ingresos);
                                egresoTotal.push(plants[1][0].data.Egresos);
                                diferenciaTotal.push(plants[1][0].data.Diferencia);
                            }*/
                            //Se utiliza para llenar el selector de centrales validando que el total de todos los conceptos sea diferente de 0
                            const positionPlant = listPlants.findIndex(elemento => elemento === plants[0]);
                            const total =ingresoTotal[positionPlant] + egresoTotal[positionPlant];                                        
                            //Se utiliza para llenar el selector de centrales
                            const index2 = listPlantsForSelector.findIndex(elemento => elemento === plants[0]);
                            if (index2 === -1 && total !== 0) {
                                listPlantsForSelector.push(plants[0]);
                            }
                        }
                    });
                });
            }
        });
    });
    Object.entries(listPlantsForSelector).forEach((plant: any) => {
        if(!(plant in listPlantsForSelector)){
            plantsForSelector.push({
                value:plant[1],
                label: plant[1]
            })
        }
    });

    //Se llena chartData para grafica de barras
    for (let i in listPlants) {
        if(ingresoTotal[i] + egresoTotal[i] !==0){
            chartData.push({
                plant: listPlants[i],
                ingreso: (Math.round(ingresoTotal[i] * 1000) / 1000),
                egreso: (Math.round(egresoTotal[i] * 1000) / 1000),
                diferencia:(Math.round(diferenciaTotal[i] * 1000) / 1000),
            })
        }
    }
    return [ plantsForSelector, chartData];
}



