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
    adquiriente:String;
}


export const TablaIngresosEgresos = ({ data,adquiriente}: TablaLiquidacion) => {
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
            boxShadow: "inset 0 1px 0 #fff,inset 0 -1px 0 #fff,inset -1px 0 #fff",
            textAlign: "center",
        },
        customRow:{
            boxShadow: "inset 0 -1px 0 #b9b9b9",
            textAlign: "center",
        },
        grises:{
            backgroundColor: "#e4e4e4",
            boxShadow: "inset 0 -1px 0 #b9b9b9",
            textAlign: "center",
        } 
    });

    let rows:any = [];
    let total = 0.0;
    let conceptosMap:any=new Map();
    conceptosMap.set('PC1', 'NOTA DE CRÉDITO RELIQ 1');
    conceptosMap.set('PD1', 'NOTA DE DÉBITO RELIQ 1');
    conceptosMap.set('PC2', 'NOTA DE CRÉDITO RELIQ 2');
    conceptosMap.set('PD2', 'NOTA DE DÉBITO RELIQ 2');
    conceptosMap.set('PC3', 'NOTA DE CRÉDITO RELIQ 3');
    conceptosMap.set('PD3', 'NOTA DE DÉBITO RELIQ 3');
    conceptosMap.set('PC4', 'NOTA DE CRÉDITO RELIQ 4');
    conceptosMap.set('PD4', 'NOTA DE DÉBITO RELIQ 4');
    conceptosMap.set('PC5', 'NOTA DE CRÉDITO RELIQ 5');
    conceptosMap.set('PD5', 'NOTA DE DÉBITO RELIQ 5');
    conceptosMap.set('PC6', 'NOTA DE CRÉDITO RELIQ 6');
    conceptosMap.set('PD6', 'NOTA DE DÉBITO RELIQ 6');
    conceptosMap.set('CC1', 'NOTA DE CRÉDITO RELIQ 1');
    conceptosMap.set('CD1', 'NOTA DE DÉBITO RELIQ 1');
    conceptosMap.set('CC2', 'NOTA DE CRÉDITO RELIQ 2');
    conceptosMap.set('CD2', 'NOTA DE DÉBITO RELIQ 2');
    conceptosMap.set('CC3', 'NOTA DE CRÉDITO RELIQ 3');
    conceptosMap.set('CD3', 'NOTA DE DÉBITO RELIQ 3');
    conceptosMap.set('CC4', 'NOTA DE CRÉDITO RELIQ 4');
    conceptosMap.set('CD4', 'NOTA DE DÉBITO RELIQ 4');
    conceptosMap.set('CC5', 'NOTA DE CRÉDITO RELIQ 5');
    conceptosMap.set('CD5', 'NOTA DE DÉBITO RELIQ 5');
    conceptosMap.set('CC6', 'NOTA DE CRÉDITO RELIQ 6');
    conceptosMap.set('CD6', 'NOTA DE DÉBITO RELIQ 6');
    
    
    
    function populateRows(){
        let mapa:any = new Map();
        Object.entries(data).forEach((elements: any) => {
            if(elements[0] ==="fechas"){
                Object.entries(elements[1]).forEach((dato: any) => {
                    Object.entries(dato[1]).forEach((arr: any) => {
                        if(arr[0]=== "conceptos"){
                            Object.entries(arr[1]).forEach((con: any) => {
                                if(con[0].startsWith(adquiriente)){
                                    if(mapa.get(con[0])==null){
                                        mapa.set(con[0],con[1]);
                                    }else{
                                        let value = mapa.get(con[0]);
                                        mapa.set(con[0], con[1]+value)
                                    }
                                }
                            })
                        }
                    });
                });
            }
        })

        for (let cont = 0;cont<6;cont++){
            for(let[key,value]of mapa){
                if(key.includes(cont)){
                    let row:any=[];
                    if(cont===0){
                        row.push('FACTURA 0')
                        
                    }else{
                        row.push(conceptosMap.get(key))
                    }
                    row.push(formatter(value))
                    row.push(value*1.16)
                    rows.push(row)
                }
            }
        }
    }


    class HeaderRow extends React.Component {
        render() {
            let header =[];
            let head = adquiriente === 'C' ? 'CENACE' : 'PARTICIPANTE'
            header.push(<TableCell key={'Factura'} className={classes.stickyTopHeader}>FACTURA {head}</TableCell>);
            header.push(<TableCell key={'Tipo'} className={classes.stickyTopHeader}>MONTO ($)</TableCell>);
            header.push(<TableCell key={'Valor'} className={classes.stickyTopHeader}>CON IVA ($)</TableCell>);
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
            for(let i = 0 ; i< rows.length ; i++){
                let item = [];
                for(let j = 0 ; j < rows[i].length ; j ++){
                    if(j===2){
                        item.push(<TableCell key={j} className={classes.customRow}>$ {formatter(rows[i][j])}</TableCell>) 
                    }else if(j===0){
                        item.push(<TableCell key={j} className={classes.grises}>{rows[i][j]}</TableCell>) 
                    }
                    else{
                        item.push(<TableCell key={j} className={classes.customRow}>$ {rows[i][j]}</TableCell>) 
                    }
                }
                total =  total + rows[i][2];
                valores.push(<TableRow hover key={i}>{item}</TableRow>)}
            return(
                valores.map((row:any) => (
                row
                ))
            )
        }
     }


     class FinalRow extends React.Component {
        render() {
            let header =[];
            header.push(<TableCell className={classes.grises} key={'Total'}>TOTAL</TableCell>);
            header.push(<TableCell className={classes.grises} key={'Espacio'}>$ {formatter(total/1.16)}</TableCell>);
            header.push(<TableCell className={classes.grises} key={'Valor'}>$ {formatter(total)}</TableCell>);
            return(
                <TableRow key={'Header'}>
                    {header.map((row:any) => (
                    row
                    ))}
                </TableRow>
            )
        }
    }

    function formatter(value:number){
        return (Math.round(value * 100) / 100).toLocaleString('en');
    }

    populateRows();
    const classes = useStyles();
    return(
        <Paper className={classes.root}>
        <TableContainer className={classes.container}>
            <Table aria-label="simple" className={classes.table}>
                <TableHead>
                    <HeaderRow/>
                </TableHead>
                <TableBody>
                   <CustomRow/>
                </TableBody>
                <TableBody>
                    <FinalRow/>
                </TableBody>
            </Table>
        </TableContainer>
    </Paper> 
    )
}
export default TablaIngresosEgresos;