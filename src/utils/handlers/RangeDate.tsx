import { useState } from "react";


export function RangeDateHandler(): [Date, Date, ((sDate: Date, eDate:Date) => void)] {

  
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const handleDate = (sDate: Date, eDate:Date) => { setStartDate(sDate); setEndDate(eDate)}
  
  return [startDate, endDate, handleDate];
}

