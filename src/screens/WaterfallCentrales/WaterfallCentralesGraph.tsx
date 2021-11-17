import { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/animated";

interface IWaterfallCentrales {
  centralData: {
    ingresos: any[];
    egresos: any[];
    central: string;
  };
  sltLiquidaciones: any[];
}
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
am4core.addLicense("CH211112185");
export const WaterfallCentralesGraph = ({
  centralData,
  sltLiquidaciones,
}: IWaterfallCentrales) => {
  //METHOD
  const getTotalByLiquidacion = (
    extLiquidaciones: any,
    sltLiquidaciones: any[]
  ): number => {
    let total: number = 0;
    Object.entries(extLiquidaciones).forEach((val: any) => {
      if (sltLiquidaciones.includes(val[0])) total += val[1];
    });
    return total;
  };
  function sortArreglo(a: any, b: any) {
    if (sltLiquidaciones.length > 0) {
      return Math.abs(
        getTotalByLiquidacion(a.reliquidaciones, sltLiquidaciones)
      ) > Math.abs(getTotalByLiquidacion(b.reliquidaciones, sltLiquidaciones))
        ? -1
        : 1;
    } else {
      return Math.abs(a.total) > Math.abs(b.total) ? -1 : 1;
    }
  }
  //VARIABLES
  let total: number = 0;
  let incomeExcome: any[] = [];
  if ("ingresos" in centralData) {
    const sortedIng: any[] = centralData.ingresos.sort((a, b) =>
      sortArreglo(a, b)
    );
    console.log("sortedIng");
    console.log(sortedIng);
    let otrosIng: number = 0;
    sortedIng.forEach((val, ix) => {
      const amount = sltLiquidaciones.length
        ? getTotalByLiquidacion(val.reliquidaciones, sltLiquidaciones)
        : val.total;
      total += amount;
      if (ix < 3 && amount !== 0) {
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
    if (otrosIng !== 0) {
      incomeExcome.push({
        service: "Otros (I)",
        value: total,
        stepValue: total,
        open: total - otrosIng,
        displayValue: otrosIng,
      });
    }
  }
  if ("egresos" in centralData) {
    const sortedEg: any[] = centralData.egresos.sort((a, b) =>
      sortArreglo(a, b)
    );
    let otrosEg: number = 0;
    sortedEg.forEach((val, ix) => {
      const amount = sltLiquidaciones.length
        ? getTotalByLiquidacion(val.reliquidaciones, sltLiquidaciones)
        : val.total;
      total += amount;
      if (ix < 3 && amount !== 0) {
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
    if (otrosEg !== 0) {
      incomeExcome.push({
        service: "Otros (E)",
        value: total,
        stepValue: total,
        open: total - otrosEg,
        displayValue: otrosEg,
      });
    }
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
    let chart = am4core.create(
      `${centralData.central}Chart`,
      am4charts.XYChart
    );
    //DATA
    let ixcolor = 0;
    const finalData = incomeExcome.map((val) => {
      ixcolor++;
      return { ...val, color: chart.colors.getIndex(ixcolor) };
    });
    chart.data = finalData;
    //CREATES AXES X AND Y
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "service";
    categoryAxis.title.text = "Ingresos / Egresos";
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.renderer.labels.template.fontSize = 12;
    categoryAxis.cursorTooltipEnabled = false;
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "$ MXN";
    //CREATES SERIES
    var columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Liquidaciones";
    columnSeries.dataFields.categoryX = "service";
    columnSeries.dataFields.valueY = "value";
    columnSeries.dataFields.openValueY = "open";
    columnSeries.interpolationDuration = 1500;
    columnSeries.sequencedInterpolation = true;
    columnSeries.columns.template.propertyFields.fill = "color";
    columnSeries.columns.template.strokeOpacity = 0;
    columnSeries.columns.template.width = am4core.percent(100);
    //TOOLTIP
    columnSeries.tooltipText =
      "[bold]{service}[/]:\n[font-size:14px] $ {displayValue}";
    columnSeries.tooltipX = am4core.percent(100);
    columnSeries.tooltipY = am4core.percent(0);
    //ADJUST WIDTH OF EACH CATEGORY
    const categoryLabels = categoryAxis.renderer.labels.template;
    categoryLabels.wrap = true;
    categoryLabels.maxWidth = 150;

    var stepSeries = chart.series.push(new am4charts.StepLineSeries());
    stepSeries.dataFields.categoryX = "service";
    stepSeries.dataFields.valueY = "stepValue";
    stepSeries.noRisers = true;
    stepSeries.startLocation = 0.1;
    stepSeries.endLocation = 1.1;
    stepSeries.sequencedInterpolation = true;
    stepSeries.strokeDasharray = "3,3";
    stepSeries.interpolationDuration = 2000;
    stepSeries.stroke = new am4core.InterfaceColorSet().getFor(
      "alternativeBackground"
    );
    //CURSOR
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomXY";
  });
  return (
    <div id={`${centralData.central}Chart`} style={{ height: "600px" }}></div>
  );
};
