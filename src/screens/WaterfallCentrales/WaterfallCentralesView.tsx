import { useState } from "react";
import {
  Stack,
  Box,
  CardContent,
  Card,
  CardHeader,
} from "@mui/material";
import Select from "react-select";
import { grey } from "@mui/material/colors";
import { WaterfallCentralesGraph } from "./WaterfallCentralesGraph";
interface IWaterfallCentralesView {
  data: any[];
}
export const WaterfallCentralesView = ({ data }: IWaterfallCentralesView) => {
  const liquidacionOptions: any[] = [
    { value: "0", label: "Liquidacion 0" },
    { value: "1", label: "Reliquidacion 1" },
    { value: "2", label: "Reliquidacion 2" },
    { value: "3", label: "Reliquidacion 3" },
    { value: "4", label: "Reliquidacion 4" },
    { value: "5", label: "Reliquidacion 5" },
    { value: "6", label: "Reliquidacion 6" },
  ];
  const centralOptions: { label: string }[] = data.map((val) => {
    return { value: val.central, label: val.central };
  });
  //HOOKS
  const [sltLiquidaciones, setSltLiquidaciones] = useState<any[]>([]);
  const [sltCentrales, setSltCentrales] = useState<any[]>([]);
  //VARIABLES
  const centralNames: any[] = sltCentrales.map((val) => val.label);
  const centrales = data.filter((centralObj) =>
    centralNames.includes(centralObj.central)
  );
  const liquidaciones: any[] = sltLiquidaciones.map((val) => val.value);
  return (
    <div className="container-fluid p-top">
      <h3 className="title">Waterfall por Centrales</h3>
      <Stack
        direction="row"
        spacing={2}
        p={2}
        my={1}
        justifyContent="center"
        alignItems="center"
        border="2px solid #999999"
        borderRadius="10px"
      >
        <Box sx={{ width: "40%" }}>
          <Select
            id="liquidacionSelector"
            closeMenuOnSelect={false}
            isMulti
            placeholder={"Seleccione Liquidacion"}
            value={sltLiquidaciones}
            options={liquidacionOptions}
            onChange={(selectedOptions: any) => {
              setSltLiquidaciones(selectedOptions);
            }}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <Select
            id="centralSelector"
            isMulti
            placeholder={"Seleccione Central"}
            value={sltCentrales}
            options={centralOptions}
            onChange={(selectedOptions: any) => {
              setSltCentrales(selectedOptions);
            }}
          />
        </Box>
      </Stack>
      <Box>
        {centrales.length > 0 &&
          centrales.map((cen) => {
            return (
              <Box py={2} key={cen.central}>
                <Card>
                  <CardHeader
                    title={cen.central}
                    titleTypographyProps={{ variant: "h6" }}
                    sx={{ backgroundColor: grey[100] }}
                  ></CardHeader>
                  <CardContent>
                    <WaterfallCentralesGraph
                      centralData={cen}
                      sltLiquidaciones={liquidaciones}
                    />
                  </CardContent>
                </Card>
              </Box>
            );
          })}
      </Box>
    </div>
  );
};
