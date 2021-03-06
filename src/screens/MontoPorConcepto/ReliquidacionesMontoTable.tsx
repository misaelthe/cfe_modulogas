import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface TablaLiquidacion {
    data: TablaLiquidacion[];
    liquidacion: string;
    cliente:string
}

export const ReliquidacionesMontoTable = ({ data, liquidacion,cliente}: TablaLiquidacion) => {
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
            textAlign: "right",
        },
        stickyMontoHeader:{
            position: "sticky",
            top:55,
            backgroundColor:"#285d3d",
            zIndex: 1,
            fontWeight:"bold",
            color: "white",
            boxShadow: "inset 0 1px 0 #fff,inset -1px 0 #fff",
            textAlign: "center",
        },
        rightRow:{
            position: "sticky",
            top:0,
            backgroundColor:"#285d3d",
            zIndex: 1,
            fontWeight:"bold",
            color: "white",
            boxShadow: "inset 0 1px 0 #fff,inset -1px 0 #fff",
            textAlign: "right",
        },
        customRow:{
            boxShadow: "inset 0 -1px 0 #b9b9b9,inset -1px 0 #b9b9b9, inset 1px 0 #b9b9b9",
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

    let debito = new Map();
    let credito = new Map();
    Object.entries(data).forEach((dato:any)=>{
        Object.entries(dato[1]).forEach((array:any)=>{
            if(array[0] === cliente+"D"+liquidacion){
                Object.entries(array[1]).forEach((con:any)=>{
                    if(debito.get(con[0])==null){
                        debito.set(con[0],con[1]);
                    }else{
                        let value = debito.get(con[0]);
                        debito.set(con[0], con[1]+value)
                    }
                });
            }
            if(array[0] === cliente+"C"+liquidacion){
                Object.entries(array[1]).forEach((con:any)=>{
                    if(credito.get(con[0])==null){
                        credito.set(con[0],con[1]);
                    }else{
                        let value = credito.get(con[0]);
                        credito.set(con[0], con[1]+value)
                    }
                });
            }
        })
    })
    debito = new Map([...debito.entries()].sort());
    credito = new Map([...credito.entries()].sort());
    let tableLength = debito.size>=credito.size ? debito.size : credito.size;
    let pObject:any = [];
    let cObject:any = [];
    for (const [key, value] of debito) {
        pObject.push({
            concepto:key+liquidacion,
            value:value
        });
    }
    for (const [key, value] of credito) {
        cObject.push({
            concepto:key+liquidacion,
            value:value
        });
    }
  
    class HeaderRow extends React.Component {
        render() {
            let header =[];
            header.push(<TableCell key={'Ingf0'} className={classes.stickyTopHeader}>NOTA D??BITO</TableCell>);
            header.push(<TableCell key={'vacIng0'} className={classes.rightRow}></TableCell>);
            header.push(<TableCell key={'Egf0'} className={classes.stickyTopHeader}>NOTA CR??DITO</TableCell>);
            header.push(<TableCell key={'vacEg0'} className={classes.stickyTopHeader}></TableCell>);
            return(
                <TableRow key={'Header'}>
                    {header.map((row:any) => (
                    row
                    ))}
                </TableRow>
            )
        }
    }

    class MontoHRow extends React.Component {
        render() {
            let header =[];
            header.push(<TableCell key={'ConIng'} className={classes.stickyMontoHeader}>Concepto</TableCell>);
            header.push(<TableCell key={'montIng'} className={classes.stickyMontoHeader}>Monto ($)</TableCell>);
            header.push(<TableCell key={'conEg'} className={classes.stickyMontoHeader}>Concepto</TableCell>);
            header.push(<TableCell key={'montEg'} className={classes.stickyMontoHeader}>Monto ($)</TableCell>);
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
            let pTotal = 0.0;
            let cTotal = 0.0;
            for(let cont=0;cont<tableLength;cont++){
                let items=[];
                let prow = pObject[cont]===undefined ? {concepto:'-',value:0.0}:pObject[cont];
                let crow = cObject[cont]===undefined? {concepto:'-',value:0.0}:cObject[cont];
                items.push(<TableCell key={'conP'+cont} className={classes.customRow}>{prow.concepto}</TableCell>);
                items.push(<TableCell key={'valP'+cont} className={classes.customRow}>$  {formatter(prow.value)}</TableCell>);
                items.push(<TableCell key={'conC'+cont} className={classes.customRow}>{crow.concepto}</TableCell>);
                items.push(<TableCell key={'valC'+cont} className={classes.customRow}>$  {formatter(crow.value)}</TableCell>);
                valores.push(<TableRow hover key={'item'+cont}>{items}</TableRow>)
                pTotal = pTotal + prow.value;
                cTotal = cTotal + crow.value;
            }
            let items=[];
            items.push(<TableCell key={'conP'} className={classes.grises}>Total</TableCell>);
            items.push(<TableCell key={'valP'} className={classes.grises}>$  {formatter(pTotal)}</TableCell>);
            items.push(<TableCell key={'conC'} className={classes.grises}>Total</TableCell>);
            items.push(<TableCell key={'valC'} className={classes.grises}>$  {formatter(cTotal)}</TableCell>);
            valores.push(<TableRow hover key={'item'}>{items}</TableRow>)
            
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
                    <MontoHRow></MontoHRow>
                </TableHead>
                <TableBody>
                    <CustomRow></CustomRow>
                </TableBody>
            </Table>
        </TableContainer>
    </Paper> 
    )
}
export default ReliquidacionesMontoTable;