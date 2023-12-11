import React from "react";

const FormatDate = ({date}) => {
    console.log(date)
    let createdAtDate = new Date(date);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[createdAtDate.getMonth()];
    const day = createdAtDate.getDate();
    const year = createdAtDate.getFullYear();
    // const hours = createdAtDate.getHours().toString().padStart(2, '0');
    // const minutes = createdAtDate.getMinutes().toString().padStart(2, '0');
    return(
        <span>
            {day} {month}, {year}
            {/* {hours}:{minutes} */}
        </span>
    )
  };

export default FormatDate;
