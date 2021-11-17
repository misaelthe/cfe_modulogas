import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import { useEffect } from 'react';
import '../../styles/Charts.css';
import { ComparativoTech } from "../../utils/interfaces/Comparativo";


interface ContractListChartType {
  data: ComparativoTech[];
  tipo: String;
}

am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);
am4core.addLicense("CH211112185");

export const IngresosEgresosRoundChart = ({ data, tipo }: ContractListChartType) => {

  const nameDiv = tipo +"ListPieChart";
  useEffect(() => {
    let chart = am4core.create(nameDiv, am4charts.PieChart);
    chart.legend = new am4charts.Legend();

    // Set data
    let selected = "";
  
    chart.data = generateChartData();
    
    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "totalTech";
    pieSeries.dataFields.category = "tecnologia";
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.slices.template.propertyFields.isActive = "pulled";
    pieSeries.slices.template.stroke = am4core.color("#FFFF");
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.labels.template.fontSize = 14;
    pieSeries.slices.template.tooltipText = "{category}: ${value.value}";
    chart.legend.valueLabels.template.text = "${value}";

    function generateChartData() {
      let chartData:any = [];
      let cont = 0;
      
      Object.entries(data).forEach((d: any) => {
         if (d[0] === tipo) {
           Object.entries(d[1]).forEach((da: any) => {
            if (da[1].servicio === selected) {
              Object.entries((da[1].subs)).forEach((s: any) => {
                chartData.push({
                  tecnologia: s[1].concepto,
                  totalTech: s[1].total,
                  color: chart.colors.getIndex(cont),
                  pulled: true
                });
              });
            } else {
              chartData.push({
                tecnologia: da[1].servicio,
                totalTech: da[1].totalServicio,
                color: chart.colors.getIndex(cont)
              });
            }
            cont += 1;
          });
        }
      });
      return chartData;
    }

    pieSeries.slices.template.events.on("hit", (ev) => {
      const obj = Object(ev.target.dataItem?.dataContext);

      if (obj !== undefined) {
        selected = obj['tecnologia'];
      } else {
        selected = "empty";
      }
      chart.data = generateChartData();
    });

    
    return () => {
      chart.dispose();
    };
  });


  return (
    <div id={nameDiv}></div>
  );
}