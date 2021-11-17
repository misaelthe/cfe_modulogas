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

export const LiquidacionCeroTable = ({ data,liquidacion, startDate, endDate}: TablaLiquidacion) => {
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
    let ingresoTotal = 0.0;
    let egresoTotal = 0.0;
    Object.entries(data).forEach((array: any) => {
        if(array[0]==="ingresos"){
            Object.entries(array[1]).forEach((concepto: any) => {
                if(concepto[0].includes(liquidacion)){
                    ingresoTotal = ingresoTotal + concepto[1]
                }
            });
        }
        else if(array[0]==="egresos"){
            Object.entries(array[1]).forEach((concepto: any) => {
                if(concepto[0].includes(liquidacion)){
                    egresoTotal = egresoTotal + concepto[1]
                }
            });
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
            let itemIng =[];
            let itemEg =[];
            let neto = [];
            itemIng.push(<TableCell key={'VacioIng1'} className={classes.stickyLeft}>PERIODO DE LIQUIDACIÓN</TableCell>);
            itemIng.push(<TableCell key={'Fecha'} className={classes.fechaRow}>{getDateLetter(startDate)}</TableCell>);
            itemIng.push(<TableCell key={'totIng'} className={classes.customRow}>Total de Ingresos</TableCell>);
            itemIng.push(<TableCell key={'valueIng'} className={classes.customRow}>$ {formatter(ingresoTotal)}</TableCell>);
            itemIng.push(<TableCell key={'ivaIng'} className={classes.customRow}>$ {formatter(ingresoTotal*1.16)}</TableCell>);
            valores.push(<TableRow hover key={'ing'}>{itemIng}</TableRow>)

            itemEg.push(<TableCell key={'VacioEg1'} className={classes.stickyLeft}>FACTURA 0</TableCell>);
            itemEg.push(<TableCell key={'vacioEg2'} className={classes.fechaRow}>al</TableCell>);
            itemEg.push(<TableCell key={'totEg'} className={classes.customRow}>Total de Egresos</TableCell>);
            itemEg.push(<TableCell key={'valueEg'} className={classes.customRow}>$ {formatter(egresoTotal)}</TableCell>);
            itemEg.push(<TableCell key={'ivaEg'} className={classes.customRow}>$ {formatter(egresoTotal*1.16)}</TableCell>);
            valores.push(<TableRow hover key={'eg'}>{itemEg}</TableRow>)

            let netoTotal = ingresoTotal-egresoTotal;
            neto.push(<TableCell key={'VacioNet1'} className={classes.stickyLeft}></TableCell>);
            neto.push(<TableCell key={'vacioNet2'} className={classes.fechaRow}>{getDateLetter(endDate)}</TableCell>);
            neto.push(<TableCell key={'totNet'} className={classes.grises}>Total Neto</TableCell>);
            neto.push(<TableCell key={'valueNet'} className={classes.grises}>$ {formatter(netoTotal)}</TableCell>);
            neto.push(<TableCell key={'ivaNet'} className={classes.grises}>$ {formatter(netoTotal*1.16)}</TableCell>);
            valores.push(<TableRow hover key={'net'}>{neto}</TableRow>)
            
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
export default LiquidacionCeroTable;