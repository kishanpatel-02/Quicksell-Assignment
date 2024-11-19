import React from "react";
import "./TicketCard.css";
import noPriority from "../assets/No-priority.svg";
import urgent from "../assets/SVG - Urgent Priority colour.svg";
import high from "../assets/Img - High Priority.svg";
import medium from "../assets/Img - Medium Priority.svg";
import low from "../assets/Img - Low Priority.svg";
import status from "../assets/status.svg";

const priorityMap={
    0:noPriority,
    1:low,
    2:medium,
    3:high,
    4:urgent
}
const TicketCard = ({ ticket,groupBy }) => {

    let random = Math.floor(Math.random() * 10);
   


    return (
        <div className="ticket-card">
            <div className="ticket-header">
                <p className="ticket-title">{ticket.id}</p>
                {groupBy==="userId"?<></>:<img style={{width:"23px",height:"23px", borderRadius:"50%"}} src={`https://picsum.photos/200?random=${random}`} alt="User Avatar" className="card-image-profile" />}
            </div>
            <div className="ticket-container">
                <p className="ticket-details">{ticket.title}</p>
            </div>
            <div className="ticket-footer">
                {groupBy==="priority" ?<></> :<img src={priorityMap[ticket.priority]} alt="Priority" className="card-image-priority" />}
                <div className="ticket-tag-container">
                    <img style={{height:"10px", width:"10px"}} src={status} alt="user avatar"/>
                    <p className="ticket-tag">{ticket.tag}</p>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
