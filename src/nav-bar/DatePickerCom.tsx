import * as Icon from "react-bootstrap-icons";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from "react";

interface DatePickerProps {
  sDate: Date,
  eDate: Date,
  handleRangeDate: ((startDate: Date, endDate: Date) => void),
}

export const DatePickerCom: React.FC<DatePickerProps> = ({ sDate, eDate, handleRangeDate}) => {
  const history = useHistory();
  const [dateRange, setDateRange] = useState([sDate, eDate]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let text = "Selecciona un rango de fechas";
  const handleDate = (update: any) => {
    setDateRange(update);
    if(update[1] !== null){
      if(update[0]!=null && update[1]!=null){
        let days = ((update[1].getTime() - update[0].getTime())/86400000)+1;
       if(days<8){
        handleRangeDate(update[0], update[1]);
        history.push("/");
       }else{
        handleClickOpen();
       }
      }
    }
   }

  return (
    <>
      <div className="input-group input-group-sm mb-3">
        <DatePicker
          selectsRange={true}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={handleDate}
          dateFormat="dd/MM/yyyy"
          className="datepicker-sm"
          wrapperClassName="input-group-sm"
          maxDate={new Date()}
          placeholderText={text}
        />
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <Icon.Calendar3 className="fa-2x" />
          </span>
        </div>
      </div>
      {/*Codigo para mostrar el alert*/}
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Se excede el periodo de consulta!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Selecciona un máximo de 7 días para mostrar la información.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>Aceptar</Button>
        </DialogActions>
      </Dialog>
      </div>
    </>
  );
};




