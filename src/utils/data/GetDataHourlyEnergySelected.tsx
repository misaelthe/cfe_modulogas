import { Plants, SelectDateRange, Technologies } from "../interfaces/Comparativo";


export const GetDataHourlyEnergyForSelected = (data: any[], selectedDates: SelectDateRange[], selectedTechs: Technologies[], selectedPlants: Plants[]): any[] => {
    const listPlants: any[] = [];
    let chartData = [{}];
    //Buscar por fechas seleccionadas
    Object.entries(selectedDates).forEach((dates: any) => {
        for (let hour = 1; hour <= 24; hour++) {
            let filtrados = Object.entries(data).filter((dato:any)=>dato[0] === (dates[1].label + ":" + hour) && dato!==undefined && dato!==null)
            if(filtrados.length>0){
                let allDates:any = filtrados[0];
                const sDate = allDates[0].split(':');
                const ddMMyyyy = sDate[0].split("/");             
                if (selectedTechs.length > 0) {
                    Object.entries(selectedTechs).forEach((allTechs: any) => {
                        Object.entries(allDates[1].centrales).forEach((allPlants: any) => {
                            Object.entries(allPlants[1]).forEach((plants: any) => {
                                if (selectedPlants.length > 0) {
                                    Object.entries(selectedPlants).forEach((selectPlants: any) => {
                                        if (plants[0] === selectPlants[1].value && allTechs[1].value === plants[1][0].data.tecnologia) {//filtrar
                                            
                                            if(plants[1][0].data.ofertaCompra+plants[1][0].data.consumoEcdMda+plants[1][0].data.consumoEcdMtr+plants[1][0].data.cobroMda+plants[1][0].data.cobroMtr !==0)
                                            {
                                                chartData.push({
                                                    plant: plants[0],
                                                    date: new Date(ddMMyyyy[2], ddMMyyyy[1] - 1, ddMMyyyy[0], sDate[1], 0),
                                                    ofertaCompra: plants[1][0].data.ofertaCompra,
                                                    consumoMDA: plants[1][0].data.consumoEcdMda,
                                                    consumoMTR: plants[1][0].data.consumoEcdMtr,
                                                    cobroMDA: plants[1][0].data.cobroMda,
                                                    cobroMTR: plants[1][0].data.cobroMtr,
                                                })
                                                //Se utiliza para obtener una lista de centrales
                                                const index = listPlants.findIndex(elemento => elemento === plants[0]);
                                                if (index === -1) {
                                                    listPlants.push(plants[0]);
                                                }
                                            }
                                        }
                                    });
                                } else {
                                    if (plants[1][0].data.tecnologia === allTechs[1].value) {
                                        if(plants[1][0].data.ofertaCompra+plants[1][0].data.consumoEcdMda+plants[1][0].data.consumoEcdMtr+plants[1][0].data.cobroMda+plants[1][0].data.cobroMtr !==0)
                                        {
                                            chartData.push({
                                                plant: plants[0],
                                                date: new Date(ddMMyyyy[2], ddMMyyyy[1] - 1, ddMMyyyy[0], sDate[1], 0),
                                                ofertaCompra: plants[1][0].data.ofertaCompra,
                                                consumoMDA: plants[1][0].data.consumoEcdMda,
                                                consumoMTR: plants[1][0].data.consumoEcdMtr,
                                                cobroMDA: plants[1][0].data.cobroMda,
                                                cobroMTR: plants[1][0].data.cobroMtr,
                                            })

                                            //Se utiliza para obtener una lista de centrales
                                            const index = listPlants.findIndex(elemento => elemento === plants[0]);
                                            if (index === -1) {
                                                listPlants.push(plants[0]);
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    });
                } else {
                    Object.entries(allDates[1].centrales).forEach((allPlants: any) => {
                        Object.entries(allPlants[1]).forEach((plants: any) => {
                            if(plants[1][0].data.ofertaCompra+plants[1][0].data.consumoEcdMda+plants[1][0].data.consumoEcdMtr+plants[1][0].data.cobroMda+plants[1][0].data.cobroMtr !==0)
                            {   
                                chartData.push({
                                    plant: plants[0],
                                    date: new Date(ddMMyyyy[2], ddMMyyyy[1] - 1, ddMMyyyy[0], sDate[1], 0),
                                    ofertaCompra: plants[1][0].data.ofertaCompra,
                                    consumoMDA: plants[1][0].data.consumoEcdMda,
                                    consumoMTR: plants[1][0].data.consumoEcdMtr,
                                    cobroMDA: plants[1][0].data.cobroMda,
                                    cobroMTR: plants[1][0].data.cobroMtr,
                                })
                                //Se utiliza para obtener una lista de centrales
                                const index = listPlants.findIndex(elemento => elemento === plants[0]);
                                if (index === -1) {
                                    listPlants.push(plants[0]);
                                }
                            }
                        });
                    });
                }
            }
        }
    });
    return [chartData, listPlants];
}



