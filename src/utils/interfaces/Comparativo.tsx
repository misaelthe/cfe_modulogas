export interface ComparativoEnergia{
    Asignacion: number,
    AsignacionAUGC: number,
    Central: String,
    Fecha: String,
    Generacion: number,
    GeneracionMeter: number,
    Hora: number,
    PotenciaOfertada: number,
    Tecnologia: String,
    Unidad: String
 }

 export interface ComparativoTech{
    tecnologia: String,
    totalTech: number,
    color: String,
    subs: Subs[];
 }

 export interface Subs {
    central: string,
    total: number
}

export const Prueba =[
    {
    central: String,
    asignacion: Number,
    asignacionAUGC: Number,
    generacion: Number
    }
]

export interface SelectDateRange {
    value:number
    label:Date
}

export interface Technologies {
    value: string,
    label: string
}

export interface Plants {
    value: string,
    label: string
}

export interface Liquidacion {
    value: string,
    label: string
}



