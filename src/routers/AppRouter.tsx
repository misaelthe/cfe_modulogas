import { HashRouter, Route, Switch } from "react-router-dom";
import { NavMenu } from "../nav-bar/NavMenu";
import { RangeDateHandler } from "../utils/handlers/RangeDate";
import LoadingScreen from "../screens/Loading/LoadingScreen";

export const AppRouter = () => {
  let showInfo = false;
  const [startDate, endDate, handleRangeDate] = RangeDateHandler();

  return (
    <HashRouter>
      <NavMenu
        startDate={startDate}
        endDate={endDate}
        handleRangeDate={handleRangeDate}
      />
      <div>
        {showInfo ? (
          <Switch></Switch>
        ) : (
          <div>
            <LoadingScreen></LoadingScreen>
          </div>
        )}
      </div>
    </HashRouter>
  );
};
