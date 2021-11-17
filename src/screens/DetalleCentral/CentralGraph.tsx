/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect } from "react";

interface CentralGraphInterface {
    data: any[];
    style: string;
   }

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
am4core.addLicense("CH211112185");
// Themes end

export const CentralGraph = ({ data, style }: CentralGraphInterface) => {
 // Create chart instance
 let liqIngreso:any=[];
 let liqEgreso:any=[];
 Object.entries(data).forEach((dato:any)=>{
   Object.entries(dato[1]).forEach((liq:any)=>{
    if(liq[0].includes("Ingresos-")){
      if(!liqIngreso.includes(liq[0])){
        liqIngreso.push(liq[0])
      }
    }else if(liq[0].includes("Egresos-")){
      if(!liqEgreso.includes(liq[0])){
        liqEgreso.push(liq[0])
      }
    }
  });
 });
 useEffect(() => {
let chart = am4core.create(style, am4charts.XYChart);
chart.data = data;
 
var categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
categoryAxis.dataFields.date = "date";
categoryAxis.renderer.grid.template.location = 0;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "MXN $";
valueAxis.numberFormatter.numberFormat = "#,###.00";
valueAxis.renderer.opposite = false;
valueAxis.renderer.grid.template.disabled = false;

function createSeries(field:any, name:any, stacked:any) {
  // Set up series
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.name = name;
  series.dataFields.valueY = field;
  series.dataFields.dateX = "date";
  series.sequencedInterpolation = true;
  
  // Make it stacked
  series.stacked = stacked;
  
  // Configure columns
  series.columns.template.width = am4core.percent(60);
  series.tooltipText = "[bold]{name}[/]:\n[font-size:14px] ${valueY}";
  series.tooltipX = am4core.percent(100);
  series.tooltipY = am4core.percent(0);
  series.hoverOnFocus = true;
  
  // Add label
  var labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.label.text = "${valueY}";
  labelBullet.label.fontSize = 10;
  labelBullet.locationY = 0.5;
  labelBullet.label.truncate = false;
  labelBullet.label.hideOversized = true;
  
  return series;
}

createSeries("Ingresos", "Ingresos",false);
createSeries("Egresos", "Egresos",false);
createSeries("Diferencia", "Diferencia",false);

let flag = true;
for (let cont=0;cont<6;cont++){
  let filter = liqIngreso.filter((dato:any)=>dato.includes(cont));
  for (let i=0;i<filter.length;i++){
    if(flag===true){
      createSeries(filter[i], filter[i],false);
      flag = false;
    }else{
      createSeries(filter[i], filter[i],true);
      flag = false;
    }
  }
}

flag = true;
for (let cont=0;cont<6;cont++){
  let filter = liqEgreso.filter((dato:any)=>dato.includes(cont));
  for (let i=0;i<filter.length;i++){
    if(flag===true){
      createSeries(filter[i], filter[i],false);
      flag = false;
    }else{
      createSeries(filter[i], filter[i],true);
      flag = false;
    }
  }
}

// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "zoomXY";

// Add legend
chart.legend = new am4charts.Legend();
chart.legend.position = "top";

// Add scrollbar
chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarY = new am4core.Scrollbar();

 });


return (
    
    <div id={style}></div>
  );

}
