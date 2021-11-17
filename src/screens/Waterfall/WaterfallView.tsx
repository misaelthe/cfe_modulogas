import { WaterfallGraph } from "./WaterfallGraph";
import { Alert } from "@material-ui/lab";
import Select from "react-select";
import { useState } from "react";
interface WaterfallInterface {
  data: { Ingresos?: any[]; Egresos?: any[] };
}

export const WaterfallView: React.FC<WaterfallInterface> = ({ data }) => {
  const options: any[] = [
    { value: 0, label: "Liquidacion 0" },
    { value: 1, label: "Reliquidacion 1" },
    { value: 2, label: "Reliquidacion 2" },
    { value: 3, label: "Reliquidacion 3" },
    { value: 4, label: "Reliquidacion 4" },
    { value: 5, label: "Reliquidacion 5" },
    { value: 6, label: "Reliquidacion 6" },
  ];
  const [sltReliquidaciones, setSltReliquidaciones] = useState<any[]>([]);
  return (
    <div className="container-fluid p-top">
      <h3 className="title">Waterfall Ingresos-Egresos</h3>
      <div className="card">
        <div className="card-body">
          <Select
            isMulti
            value={sltReliquidaciones}
            options={options}
            onChange={(selectedOptions: any) => {
              setSltReliquidaciones(selectedOptions);
            }}
          ></Select>
        </div>
      </div>
      <div className="row">
        <div className="col-12 p-top10">
          <div className="card">
            <div className="card-header">Cascada por montos</div>
            {Object.keys(data).length > 0 ? (
              <div className="card-body">
                <WaterfallGraph
                  data={data}
                  sltReliquidaciones={sltReliquidaciones}
                ></WaterfallGraph>
              </div>
            ) : (
              <div className="row">
                <div className="col-12 p-top10">
                  <Alert severity="info">
                    No hay datos para el periodo de fechas seleccionado.
                  </Alert>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
