import { DatePickerCom } from "./DatePickerCom";
import { Link } from "react-router-dom";
import { useState } from "react";

interface NavmenuProps {
  startDate: Date;
  endDate: Date;
  handleRangeDate: (sDate: Date, eDate: Date) => void;
}

export const NavMenu: React.FC<NavmenuProps> = ({
  startDate,
  endDate,
  handleRangeDate,
}) => {
  const [accion, setAccion] = useState("/");

  return (
    <>
      <nav className="navbar navbar-expand-lg background-nav-section fixed-top pt-4">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <DatePickerCom
                sDate={startDate}
                eDate={endDate}
                handleRangeDate={handleRangeDate}
              />
            </li>
            <Link to="/">
              <button
                type="button"
                className={`btn btn-sm ml-3 m-rigth ${
                  accion === "/" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setAccion("/")}
              >
                Waterfall (I-E)
              </button>
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavMenu;
