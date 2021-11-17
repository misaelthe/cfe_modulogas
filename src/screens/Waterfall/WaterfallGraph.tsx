import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/animated";
import { useEffect } from "react";

interface WaterfallInterface {
  data: { Ingresos?: any[]; Egresos?: any[] };
  sltReliquidaciones: any[];
}
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
am4core.addLicense("CH211112185");

export const WaterfallGraph = ({
  data,
  sltReliquidaciones,
}: WaterfallInterface) => {
  //METHODS
  function getTotalByLiquidacion(
    reliquidaciones: any[],
    reliquidacionIds: any[]
  ): number {
    let total: number = 0;
    const ids = reliquidacionIds.map((val: any) => {
      return val.value;
    });
    Object.entries(reliquidaciones).forEach((obj: any) => {
      if (ids.includes(parseInt(obj[0]))) {
        total += parseFloat(obj[1]);
      }
    });
    return total;
  }
  function sortArreglo(a: any, b: any) {
    if (sltReliquidaciones.length > 0) {
      return Math.abs(
        getTotalByLiquidacion(a.reliquidaciones, sltReliquidaciones)
      ) > Math.abs(getTotalByLiquidacion(b.reliquidaciones, sltReliquidaciones))
        ? -1
        : 1;
    } else {
      return Math.abs(a.totalServicio) > Math.abs(b.totalServicio) ? -1 : 1;
    }
  }
  //VARIABLES
  let total: number = 0;
  let incomeExcome: any[] = [];
  if (data.Ingresos !== undefined) {
    const sortedIng: any[] = data.Ingresos.sort((a, b) => sortArreglo(a, b));
    let otrosIng: number = 0;
    sortedIng.forEach((val: any, ix: number) => {
      const amount = sltReliquidaciones.length
        ? getTotalByLiquidacion(val.reliquidaciones, sltReliquidaciones)
        : val.totalServicio;
      total += amount;
      if (ix < 4 && amount !== 0) {
        incomeExcome.push({
          service: `${val.servicio} (I)`,
          value: total,
          stepValue: total,
          open: total - amount,
          displayValue: amount,
        });
      } else {
        otrosIng += amount;
      }
    });
    incomeExcome.push({
      service: "Otros (I)",
      value: total,
      stepValue: total,
      open: total - otrosIng,
      displayValue: otrosIng,
    });
  }
  if (data.Egresos !== undefined) {
    const sortedEg: any[] = data.Egresos.sort((a, b) => sortArreglo(a, b));
    let otrosEg: number = 0;
    sortedEg.forEach((val: any, ix: number) => {
      const amount = sltReliquidaciones.length
        ? getTotalByLiquidacion(val.reliquidaciones, sltReliquidaciones)
        : val.totalServicio;
      total += amount;
      if (ix < 4 && amount !== 0) {
        incomeExcome.push({
          service: `${val.servicio} (E)`,
          value: total,
          stepValue: total,
          open: total - amount,
          displayValue: amount,
        });
      } else {
        otrosEg += amount;
      }
    });
    incomeExcome.push({
      service: "Otros (E)",
      value: total,
      stepValue: total,
      open: total - otrosEg,
      displayValue: otrosEg,
    });
  }
  incomeExcome.push({
    service: "Total",
    value: total,
    stepValue: total,
    open: 0,
    displayValue: total,
  });
  //HOOKS
  useEffect(() => {
    let chart = am4core.create("chartDiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;
    //DATA
    let ixcolor = 0;
    const finalData = incomeExcome.map((val) => {
      ixcolor++;
      return { ...val, color: chart.colors.getIndex(ixcolor) };
    });
    chart.data = finalData;
    //AXES
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "service";
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.renderer.labels.template.fontSize = 12;
    categoryAxis.cursorTooltipEnabled = false;
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "$ MXN";
    //COLUMNS
    var columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.dataFields.categoryX = "service";
    columnSeries.dataFields.valueY = "value";
    columnSeries.dataFields.openValueY = "open";
    columnSeries.fillOpacity = 0.8;
    columnSeries.sequencedInterpolation = true;
    columnSeries.interpolationDuration = 1500;
    columnSeries.tooltipText =
      "[bold]{service}[/]:\n[font-size:14px] $ {displayValue}";
    columnSeries.tooltipX = am4core.percent(100);
    columnSeries.tooltipY = am4core.percent(0);

    var columnTemplate = columnSeries.columns.template;
    columnTemplate.strokeOpacity = 0;
    columnTemplate.propertyFields.fill = "color";
    columnTemplate.width = am4core.percent(100);

    var stepSeries = chart.series.push(new am4charts.StepLineSeries());
    stepSeries.dataFields.categoryX = "service";
    stepSeries.dataFields.valueY = "stepValue";
    stepSeries.noRisers = true;
    stepSeries.stroke = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    stepSeries.strokeDasharray = "3,3";
    stepSeries.interpolationDuration = 2000;
    stepSeries.sequencedInterpolation = true;

    stepSeries.startLocation = 0.1;
    stepSeries.endLocation = 1.1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomXY";

    var labels = categoryAxis.renderer.labels.template;
    labels.wrap = true;
    labels.maxWidth = 120;
  });

  return <div id={"chartDiv"} style={{ height: "600px" }}></div>;
};
