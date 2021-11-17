import { Plants, SelectDateRange } from "../interfaces/Comparativo";

export const GetDataLiquidacion = (data: any[], selectedDates: SelectDateRange[],  selectedPlants: Plants[]): any[] => {
    let chartData:any = [];
    let listPlants:any = [];
    let dateKeys = Object.keys(selectedDates)
    if(dateKeys.length>0){
        Object.entries(selectedDates).forEach((date: any) => {
            let filterDates = Object.entries(data).filter((dato:any)=>dato[0] === date[1].label);
            if(filterDates.length>0){
                Object.entries(filterDates).forEach((elemento: any) => {
                    let centrales = elemento[1][1].centrales;
                    if(selectedPlants.length>0){
                        Object.entries(selectedPlants).forEach((planta: any) => {
                            let filterCentral = Object.entries(centrales[0]).filter((dato:any)=>dato[0]===planta[1].label);
                            Object.entries(filterCentral).forEach((fCentral: any) => {
                                let plant = fCentral[1][0];
                                let total = 0;
                                let row:any =[];
                                row['plant']=plant;
                                row['date']=date[1].label
                                let datos = fCentral[1][1][0].data;
                                Object.entries(datos).forEach((elem: any) => {
                                    if(elem[0]==="Ingresos" || elem[0]==="Egresos"){
                                        total = total + elem[1];
                                    }
                                    row[elem[0]]=elem[1];
                                });
                                chartData.push(row);
                                const index = listPlants.findIndex((e:any)=> e === plant);
                                if (index === -1 && total!==0) {
                                    listPlants.push(plant);
                                }
                            });
                        });
                    }else{
                        Object.entries(centrales).forEach((central: any) => {
                            Object.entries(central[1]).forEach((fCentral: any) => {
                                let plant = fCentral[0];
                                let total = 0;
                                let row:any =[];
                                row['plant']=plant;
                                row['date']=date[1].label;
                                let data = fCentral[1][0].data;
                                Object.entries(data).forEach((elem: any) => {
                                    if(elem[0]==="Ingresos" || elem[0]==="Egresos"){
                                        total = total + elem[1];
                                    }
                                    row[elem[0]]=elem[1];
                                });
                                chartData.push(row);
                                const index = listPlants.findIndex((e:any) => e === plant);
                                if (index === -1 && total!==0) {
                                    listPlants.push(plant);
                                }
                            });
                        });
                    }
                });
            }
            
        });
    }else{
        //Todas las fechas, Todas las centrales
        Object.entries(data).forEach((date: any) => {
            let filterDates = Object.entries(data).filter((dato:any)=>dato[0] === date[0]);
            if(filterDates.length>0){
                Object.entries(filterDates).forEach((elemento: any) => {
                    let centrales = elemento[1][1].centrales;
                    Object.entries(centrales).forEach((central: any) => {
                        Object.entries(central[1]).forEach((fCentral: any) => {
                            let plant = fCentral[0];
                            let total = 0;
                            let row:any =[];
                            row['plant']=plant;
                            row['date']=date[0];
                            let data = fCentral[1][0].data;
                            Object.entries(data).forEach((elem: any) => {
                                if(elem[0]==="Ingresos" || elem[0]==="Egresos"){
                                    total = total + elem[1];
                                }
                                row[elem[0]]=elem[1];
                            });
                            chartData.push(row);
                            const index = listPlants.findIndex((e:any) => e === plant);
                            if (index === -1 && total!==0) {
                                listPlants.push(plant);
                            }
                        });
                    });
                });
            }
        });
    }
    return [chartData,listPlants];
}