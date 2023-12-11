import React from "react";

const DateTimeFormat = ({date}) => {
    let createdAtDate = new Date(date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[createdAtDate.getMonth()];
    const day = createdAtDate.getDate();
    const year = createdAtDate.getFullYear();
    let hours = createdAtDate.getHours();
    let minutes = createdAtDate.getMinutes();
    let AMPM = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0'+minutes : minutes;
    return(
        <span>
            {day} {month}, {year} {hours}:{minutes} {AMPM}        
        </span>
    )
  };

export default DateTimeFormat;
