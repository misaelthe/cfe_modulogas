/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect } from "react";

interface DetalleEnergiaGraphInt {
    data: any[];
    style: string;
   }

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
am4core.addLicense("CH211112185");
// Themes end

export const DetalleCentralesGraph = ({ data, style }: DetalleEnergiaGraphInt) => {
 // Create chart instance

 useEffect(() => {
let chart = am4core.create(style, am4charts.XYChart3D);
chart.legend = new am4charts.Legend();
chart.legend.position = "top";

chart.data = data;

// Create axes
let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "plant";
categoryAxis.numberFormatter.numberFormat = "#,###.00";
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.cellStartLocation = 0.1;
categoryAxis.renderer.cellEndLocation = 0.9;

let  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
valueAxis.renderer.opposite = true;

// Create series
function createSeries(field:any, name:any, number:any, stacked:any) {
  let series = chart.series.push(new am4charts.ColumnSeries3D());
  series.columns.template.stroke = am4core.color("#fffffff");
  series.columns.template.fill = chart.colors.getIndex(number);
  series.dataFields.valueX = field;
  series.dataFields.categoryY = "plant";
  series.name = name;
  series.columns.template.tooltipText = "{name}: $ [bold]{valueX}[/]";
  series.columns.template.height = am4core.percent(100);
  series.sequencedInterpolation = true;
  series.stacked = stacked;

  let valueLabel = series.bullets.push(new am4charts.LabelBullet());
  valueLabel.label.text = " $ {valueX}";
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

createSeries("ingreso", "Ingresos","3",false);
createSeries("egreso", "Egresos","7",false);
createSeries("diferencia", "Diferencia","4",false);
 });


return (
    <div id={style}></div>
  );

}