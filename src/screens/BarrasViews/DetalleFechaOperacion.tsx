import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {getDateInverted} from '../../utils/data/ParseDates';
import { useEffect } from "react";

interface DetalleBarras {
    data: any[];
    style: string;
   }

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
am4core.addLicense("CH211112185");
// Themes end

export const DetalleFechaOperacion = ({ data, style }: DetalleBarras) => {
    // Create chart instance
  let dates:any=[];
  Object.entries(data).forEach((elements: any) => {
    dates.push({fecha:elements[1].fecha})
  })
  orderDates();
  let fechaArray:any=[];
  for(let i=0;i<dates.length;i++){
    Object.entries(data).forEach((elements: any) => {
      if(elements[1].fecha === dates[i].fecha){
        fechaArray.push(elements[1])
      }
    })
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

 useEffect(() => {
    let chart = am4core.create(style, am4charts.XYChart);
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top";
    
    chart.data = fechaArray;
    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "fecha";
    categoryAxis.numberFormatter.numberFormat = "#,###.00";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;
    
    let  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
    valueAxis.renderer.opposite = true;
    
    // Create series
    function createSeries(field:any, name:any) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "fecha";
      series.name = name;
      series.columns.template.tooltipText = "{name}: $[bold]{valueX}[/]";
      series.columns.template.height = am4core.percent(100);
      series.sequencedInterpolation = true;
    
      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "${valueX}";
      valueLabel.label.horizontalCenter = "left";
      valueLabel.label.dx = 10;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;
    
      let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.horizontalCenter = "right";
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color("#fff");
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false;
      chart.legend.valueLabels.template.text = "{value}";
    
    }
    
    createSeries("Ingreso", "Ingreso");
    createSeries("Egreso", "Egreso");
     });
    
    return (
    
        <div id={style}></div>
      );
    
}