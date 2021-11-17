import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getDateInverted} from '../../utils/data/ParseDates';


interface TablaLiquidacion {
    data: TablaLiquidacion[];
}

export const TablaLiquidaciones = ({ data}: TablaLiquidacion) => {
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 580,
        },
        stickyLeft:{
            position: "sticky",
            left:0,
            backgroundColor:"#b9b9b9",
            boxShadow: "inset 0 1px 0 #8f8f8f,inset 0 -1px 0 #8f8f8f,inset -1px 0 #8f8f8f",
            textAlign: "center",
        },
        stickyLeftFinal:{
            position: "sticky",
            left:0,
            backgroundColor:"#b9b9b9",
            fontWeight:"bold",
            fontSize:"18px",
            boxShadow: "inset 0 1px 0 #8f8f8f,inset 0 -1px 0 #8f8f8f,inset -1px 0 #8f8f8f",
            textAlign: "center",
        },
        stickyTopTipos:{
            position: "sticky",
            top:55,
            backgroundColor:"#285d3d",
            zIndex: 1,
            fontWeight:"bold",
            color: "white",
            boxShadow: "inset 0 1px 0 #fff,inset 0 -1px 0 #fff",
            textAlign: "center",
        },
        stickyTopTiposLine:{
            position: "sticky",
            top:55,
            backgroundColor:"#285d3d",
            zIndex: 1,
            fontWeight:"bold",
            color: "white",
            boxShadow: "inset 0 1px 0 #fff,inset 0 -1px 0 #fff,inset -1px 0 #fff",
            textAlign: "center",
        },
        stickyTopHeader:{
            position: "sticky",
            top:0,
            backgroundColor:"#285d3d",
            zIndex: 1,
            fontWeight:"bold",
            color: "white",
            boxShadow: "inset 0 1px 0 #fff,inset 0 -1px 0 #fff",
        },
        stickyTopHeaderLine:{
            position: "sticky",
            top:0,
            backgroundColor:"#285d3d",
            zIndex: 1,
            fontWeight:"bold",
            color: "white",
            boxShadow: "inset 0 1px 0 #fff,inset 0 -1px 0 #fff,inset -1px 0 #fff",
        },
        stickyFecha:{
            position: "sticky",
            top:55,
            left: 0,
            zIndex: 2,
            color: "white",
            backgroundColor:"#285d3d",
            fontWeight:"bold",
            fontSize:"18px",
            textAlign: "center",
            boxShadow: "inset 0 1px 0 #fff,inset 0 -1px 0 #fff,inset -1px 0 #fff",
        },
        stickyVacio:{
            position: "sticky",
            top:0,
            left: 0,
            zIndex: 2,
            color: "white",
            backgroundColor:"#285d3d",
            fontWeight:"bold",
            fontSize:"18px",
            textAlign: "center",
            boxShadow: "inset 0 1px 0 #fff,inset 0 -1px 0 #fff,inset -1px 0 #fff",
        },
        grises:{
            backgroundColor: "#e4e4e4",
            boxShadow: "inset 0 -1px 0 #b9b9b9",
            textAlign: "center",
        },
        claros:{
            textAlign: "center",
            boxShadow: "inset 0 -1px 0 #b9b9b9",
        }
    });

    let ingresosHead:any=[];
    let egresosHead:any=[];
    let liquidaciones:any = [];
    let rows:any=[];
    let dates:any=[];

    function populateRows(){
        Object.entries(data).forEach((elements: any) => {
            if(elements[0]==="egresos"){
                Object.entries(elements[1]).forEach((egreso: any) => {
                    egresosHead.push(egreso);
                });
            }else if(elements[0]==="ingresos"){
                Object.entries(elements[1]).forEach((ingreso: any) => {
                    ingresosHead.push(ingreso);
                });
            }else if(elements[0]==="fechas"){
                Object.entries(elements[1]).forEach((fecha:any) => {
                   dates.push({fecha:fecha[1].fecha})
                });
            }
        })
        sortArrays();
        orderDates();
        for(let cont=0;cont<egresosHead.length;cont++){
            liquidaciones.push(egresosHead[cont][0])
        }
        for(let cont=0;cont<ingresosHead.length;cont++){
            liquidaciones.push(ingresosHead[cont][0])
        }
        for(let i=0;i<dates.length;i++){    
            Object.entries(data).forEach((elements: any) => {
                if(elements[0]==="fechas"){
                    Object.entries(elements[1]).forEach((fecha:any) => {
                        let row:any=[];
                        if(fecha[1].fecha===dates[i].fecha){
                            row.push(fecha[1].fecha);
                            let p=0;
                            let c=0;
                            for(let cont=0;cont<liquidaciones.length;cont++){
                                let filter:any = Object.entries(fecha[1].conceptos).filter((dato:any)=>dato[0]===liquidaciones[cont]);   
                                if(filter.length>0){
                                    row.push(filter[0][1])
                                    if(filter[0][0].startsWith("C")){
                                        c= c+filter[0][1];
                                    }else{
                                        p=p+filter[0][1];
                                    }
                                }else{
                                    row.push(0)
                                }
                            }
                            row.push(p-c);
                            rows.push(row);
                        }
                    });
                }
            })
        }
    }

    function sortArrays(){
        let newIngresos= [];
        let newEgresos = [];
        for(let i = 0;i<6;i++){
            let filterIngresos = ingresosHead.filter((dato:any)=>dato[0].includes(i));
            let filterEgresos =  egresosHead.filter((dato:any)=>dato[0].includes(i));
            for(let cont=0;cont<filterIngresos.length;cont++){
                newIngresos.push(filterIngresos[cont]);
            }
            for(let cont=0;cont<filterEgresos.length;cont++){
                newEgresos.push(filterEgresos[cont]);
            }
        }
        ingresosHead.length=0;
        egresosHead.length=0;
        for(let i=0;i<newEgresos.length;i++){
            egresosHead.push(newEgresos[i])
        }
        for(let i=0;i<newIngresos.length;i++){
            ingresosHead.push(newIngresos[i])
        }
    }

    function orderDates(){
        let dateArr:any = [];
        Object.entries(dates).forEach((date: any) => {
            var st = date[1].fecha;
            var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
            var dt = new Date(st.replace(pattern,'$3-$2-$1'));
            dt.setDate(dt.getDate() + 1);
            dateArr.push(dt);
        })
        dateArr.sort(function(a:any, b:any) { a = new Date(a); b = new Date(b); return a<b ? -1 : a<b ? 1 : 0; });
        dates.length = 0;
        for (let i = 0; i < dateArr.length; i++) {
            dates.push({
                fecha:getDateInverted(dateArr[i])
            })
        }   
    }

    function formatter(value:any){
        return (Math.round(value * 100) / 100).toLocaleString('en');
    }

    class HeaderRow extends React.Component {
        render() {
            let header =[];
            header.push(<TableCell className={classes.stickyVacio} key={'Tipo'}></TableCell>);
            for(let cont = 0;cont<egresosHead.length;cont++){
                if(cont === 0){
                    header.push(<TableCell className={classes.stickyTopHeader} key={"Egresos"}>Egresos</TableCell>);
                }else if(cont === egresosHead.length-1){
                    header.push(<TableCell className={classes.stickyTopHeaderLine} key={'egresos'+cont}></TableCell>);
                }
                else{
                    header.push(<TableCell className={classes.stickyTopHeader} key={'egresos'+cont}></TableCell>);
                }
            }
            for(let cont = 0;cont<ingresosHead.length;cont++){
                if(cont === 0){
                    header.push(<TableCell className={classes.stickyTopHeader} key={"Ingresos"}>Ingresos</TableCell>);
                }else if(cont === ingresosHead.length-1){
                    header.push(<TableCell  className={classes.stickyTopHeaderLine} key={'ingresos'+cont}></TableCell>);
                }
                else{
                    header.push(<TableCell  className={classes.stickyTopHeader} key={'ingresos'+cont}></TableCell>);
                }
            }
            header.push(<TableCell className={classes.stickyTopHeaderLine} key={'emptyHed'}></TableCell>);
            return(
                <TableRow key={'Header'}>
                    {header.map((row:any) => (
                    row
                    ))}
                </TableRow>
            )
        }
    }

    class LiquidacionesRow extends React.Component {
        render() {
            let header =[];
            header.push(<TableCell className={classes.stickyFecha} key={'FechaLiquidacion'}>Fecha Liquidación</TableCell>);
            for(let cont = 0;cont<liquidaciones.length;cont++){
                if(cont === egresosHead.length-1 || cont === egresosHead.length + ingresosHead.length-1){
                    header.push(<TableCell className={classes.stickyTopTiposLine} key={liquidaciones[cont]}>{liquidaciones[cont]}</TableCell>);    
                }else{
                    header.push(<TableCell className={classes.stickyTopTipos} key={liquidaciones[cont]}>{liquidaciones[cont]}</TableCell>);
                }
            }
            header.push(<TableCell className={classes.stickyTopTipos} key={'TotalLiq'}>Total</TableCell>);
            return(
                <TableRow key={'Liquidaciones'}>
                    {header.map((row:any) => (
                    row
                    ))}
                </TableRow>
            )
        }
    }

    class CustomRow extends React.Component {
        render() {
            let valores =[];
            for (let i = 0; i < rows.length; i++) {
                let items = [];
                for (let j = 0; j < rows[i].length; j++) {
                    let value = rows[i][j];
                    if(j!==0){
                        value = Math.round(value * 1000) / 1000;
                        if(j<egresosHead.length+1 || j===rows[i].length-1){
                            items.push(<TableCell className={classes.grises} key={j}>${formatter(value)}</TableCell>);
                        }else{
                            items.push(<TableCell className={classes.claros} key={j}>${formatter(value)}</TableCell>);
                        }
                    }
                    else{
                        items.push(<TableCell className={classes.stickyLeft} key={j}>{value}</TableCell>);
                    }
                }
                valores.push(<TableRow hover key={i}>{items}</TableRow>);
            }
            return(
                valores.map((row:any) => (
                row
                ))
            )
        }
    }

    class FinalRow extends React.Component {
        render() {
            let finalRow:any =[];
            let rowTotales:any=[];
            let totalC=0.0;
            let totalP=0.0;
            finalRow.push(<TableCell className={classes.stickyLeftFinal} key={'TotalFinal'}>Total</TableCell>);
            for(let cont= 0;cont<egresosHead.length;cont++){
                finalRow.push(<TableCell className={classes.grises} key={'egresos'+egresosHead[cont][1]}>${formatter(egresosHead[cont][1])}</TableCell>);
                totalC = totalC+egresosHead[cont][1];
            }
            for(let cont= 0;cont<ingresosHead.length;cont++){
                finalRow.push(<TableCell className={classes.claros} key={'ingresos'+ingresosHead[cont][1]}>${formatter(ingresosHead[cont][1])}</TableCell>);
                totalP = totalP+ingresosHead[cont][1];
            }
            finalRow.push(<TableCell className={classes.grises}  key={'totaltotal'}>${formatter(totalP-totalC)}</TableCell>);
            rowTotales.push(<TableRow hover key={'final'}>{finalRow}</TableRow>);
            return(
            rowTotales.map((row:any) => (
                row
                ))
            )
        }
    }
    

    populateRows();
    const classes = useStyles();
    return(
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table aria-label="simple" className={classes.table}>
                    <TableHead>
                        <HeaderRow></HeaderRow>
                        <LiquidacionesRow></LiquidacionesRow>
                    </TableHead>
                    <TableBody>
                        <CustomRow></CustomRow>
                        <FinalRow></FinalRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>   
    )
}
export default TablaLiquidaciones;