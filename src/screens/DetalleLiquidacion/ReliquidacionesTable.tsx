import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {getDateLetter} from '../../utils/data/ParseDates';
import Paper from '@material-ui/core/Paper';

interface TablaLiquidacion {
    data: TablaLiquidacion[];
    liquidacion:String;
    startDate:Date;
    endDate:Date;
}

export const ReliquidacionesTable = ({ data,liquidacion, startDate, endDate}: TablaLiquidacion) => {
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 480,
        },
        stickyTopHeader:{
            position: "sticky",
            top:0,
            backgroundColor:"#285d3d",
            zIndex: 1,
            fontWeight:"bold",
            color: "white",
            boxShadow: "inset 0 1px 0 #fff,inset -1px 0 #fff",
            textAlign: "center",
        },
        customRow:{
            boxShadow: "inset 0 -1px 0 #b9b9b9,inset -1px 0 #b9b9b9",
            textAlign: "center",
        },
        fechaRow:{
            boxShadow: "inset -1px 0 #b9b9b9",
            border: "0px solid white",
            textAlign: "center",
        },
        grises:{
            backgroundColor: "#e4e4e4",
            boxShadow: "inset 0 -1px 0 #b9b9b9, inset 1px 0 #b9b9b9",
            fontWeight:"bold",
            textAlign: "center",
        },
        stickyLeft:{
            position: "sticky",
            left:0,
            backgroundColor:"#285d3d",
            zIndex: 1,
            fontWeight:"bold",
            color: "white",
            border: "0px solid #285d3d",
            textAlign: "center",
        },
    });

    let pc:number = 0.0;
    let pd = 0.0;
    let cc = 0.0;
    let cd = 0.0
    Object.entries(data).forEach((array: any) => {
        if(array[0]==="ingresos"){
            let pcFactura = Object.entries(array[1]).filter((dato:any)=>dato[0]==="PC"+liquidacion);
            if(pcFactura.length>0){
                Object.entries(pcFactura).forEach((fact:any)=>{
                    pc = pc + fact[1][1];
                })
            }else{
                pc=0.0
            }
            let pdFactura = Object.entries(array[1]).filter((dato:any)=>dato[0]==="PD"+liquidacion);
            if(pdFactura.length>0){
                Object.entries(pdFactura).forEach((fact:any)=>{
                    pd = pd + fact[1][1];
                })
            }else{
                pd=0.0
            }
        }
        else if(array[0]==="egresos"){
            let ccFactura = Object.entries(array[1]).filter((dato:any)=>dato[0]==="CC"+liquidacion);
            if(ccFactura.length>0){
                Object.entries(ccFactura).forEach((fact:any)=>{
                    cc = cc + fact[1][1];
                })
            }else{
                cc=0.0
            }
            let cdFactura = Object.entries(array[1]).filter((dato:any)=>dato[0]==="CD"+liquidacion);
            if(cdFactura.length>0){
                Object.entries(cdFactura).forEach((fact:any)=>{
                    cd = cd + fact[1][1];
                })
            }else{
                cd=0.0
            }
        }
    });

    class HeaderRow extends React.Component {
        render() {
            let header =[];
            header.push(<TableCell key={'VacioHead'} className={classes.stickyLeft}></TableCell>);
            header.push(<TableCell key={'Inter'} className={classes.stickyTopHeader}>SIN | BCA</TableCell>);
            header.push(<TableCell key={'Concepto'} className={classes.stickyTopHeader}>Concepto</TableCell>);
            header.push(<TableCell key={'Importe'} className={classes.stickyTopHeader}>Importe</TableCell>);
            header.push(<TableCell key={'IVA'} className={classes.stickyTopHeader}>Importe más IVA</TableCell>);
            return(
                <TableRow key={'Header'}>
                    {header.map((row:any) => (
                    row
                    ))}
                </TableRow>
            )
        }
    }

    class CustomRow extends React.Component {
        render() {
            let valores = [];
            let itempc =[];
            let itempd=[];
            let itemcc=[];
            let itemcd=[];
            
            itempc.push(<TableCell key={'Vaciopc'} className={classes.stickyLeft}>PERIODO DE LIQUIDACIÓN</TableCell>);
            itempc.push(<TableCell key={'Fechapc'} className={classes.fechaRow}>{getDateLetter(startDate)}</TableCell>);
            itempc.push(<TableCell key={'totpc'} className={classes.customRow}>Nota Crédito Participante</TableCell>);
            itempc.push(<TableCell key={'valuepc'} className={classes.customRow}>$ {formatter(pc)}</TableCell>);
            itempc.push(<TableCell key={'ivapc'} className={classes.customRow}>$ {formatter(pc*1.16)}</TableCell>);
            valores.push(<TableRow hover key={'pc'}>{itempc}</TableRow>)

            itempd.push(<TableCell key={'Vaciopd'} className={classes.stickyLeft}>FACTURA {liquidacion}</TableCell>);
            itempd.push(<TableCell key={'Fechapd'} className={classes.fechaRow}>al</TableCell>);
            itempd.push(<TableCell key={'totpd'} className={classes.customRow}>Nota Débito Participante</TableCell>);
            itempd.push(<TableCell key={'valuepd'} className={classes.customRow}>$ {formatter(pd)}</TableCell>);
            itempd.push(<TableCell key={'ivapd'} className={classes.customRow}>$ {formatter(pd*1.16)}</TableCell>);
            valores.push(<TableRow hover key={'pd'}>{itempd}</TableRow>)

            itemcc.push(<TableCell key={'Vaciocc'} className={classes.stickyLeft}></TableCell>);
            itemcc.push(<TableCell key={'Fechacc'} className={classes.fechaRow}>{getDateLetter(endDate)}</TableCell>);
            itemcc.push(<TableCell key={'totcc'} className={classes.customRow}>Nota Crédito CENACE</TableCell>);
            itemcc.push(<TableCell key={'valuecc'} className={classes.customRow}>$ {formatter(cc)}</TableCell>);
            itemcc.push(<TableCell key={'ivacc'} className={classes.customRow}>$ {formatter(cc*1.16)}</TableCell>);
            valores.push(<TableRow hover key={'cc'}>{itemcc}</TableRow>)

            itemcd.push(<TableCell key={'Vaciocd'} className={classes.stickyLeft}></TableCell>);
            itemcd.push(<TableCell key={'Fechacd'} className={classes.fechaRow}></TableCell>);
            itemcd.push(<TableCell key={'totcd'} className={classes.customRow}>Nota de Débito CENACE</TableCell>);
            itemcd.push(<TableCell key={'valuecd'} className={classes.customRow}>$ {formatter(cd)}</TableCell>);
            itemcd.push(<TableCell key={'ivacd'} className={classes.customRow}>$ {formatter(cd*1.16)}</TableCell>);
            valores.push(<TableRow hover key={'cd'}>{itemcd}</TableRow>)
            
            return(
                valores.map((row:any) => (
                row
                ))
            )
        }
     }

    function formatter(value:number){
        return (Math.round(value * 100) / 100).toLocaleString('en');
    }
    
    const classes = useStyles();
    return(
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
            <Table aria-label="simple" className={classes.table}>
                <TableHead>
                    <HeaderRow></HeaderRow>
                </TableHead>
                <TableBody>
                    <CustomRow></CustomRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Paper> 
    )
}
export default ReliquidacionesTable;