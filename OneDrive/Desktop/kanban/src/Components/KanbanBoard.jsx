import React from "react";
import TicketCard from "./TicketCard";
import "./KanbanBoard.css";
import todo from "../assets/To-do.svg";
import inProgress from "../assets/in-progress.svg";
import done from "../assets/Done.svg";
import cancelled from "../assets/Cancelled.svg";
import noPriority from "../assets/No-priority.svg";
import urgent from "../assets/SVG - Urgent Priority colour.svg";
import high from "../assets/Img - High Priority.svg";
import medium from "../assets/Img - Medium Priority.svg";
import low from "../assets/Img - Low Priority.svg";

import backlog from "../assets/Backlog.svg";
import add from "../assets/add.svg";
import dot from "../assets/3 dot menu.svg";

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
    const headerImages = {
        "In progress": inProgress,
        Todo: todo,
        Done: done,
        Cancelled: cancelled,
        Backlog: backlog,
        "urgent": urgent,
        "high": high,
        "medium": medium,
        "low": low,
        "No priority": noPriority,
    };
    


    const groupTickets = (tickets, groupBy) => {
        const groups = {
            "urgent": [],
            "high": [],
            "medium": [],
            "low": [],
            "No priority": []
        };
        tickets.forEach((ticket) => {
            let key = ticket[groupBy];
            if (key === 0) {
                key = "No priority";
            }
            else if (key === 1) {
                key = "low";
            }
            else if (key === 2) {
                key = "medium";
            }
            else if (key === 3) {
                key = "high";
            }
            else if (key === 4) {
                key = "urgent";
            }
            if (!groups[key]) groups[key] = [];
            groups[key].push(ticket);
        });
        return groups;
    };

    const sortTickets = (tickets, sortBy) => {
        return tickets.sort((a, b) => {
            if (sortBy === "priority") return b.priority - a.priority;
            if (sortBy === "title") return a.title.localeCompare(b.title);
            return 0;
        });
    };

    const groupedTickets = groupTickets(tickets, groupBy);
    const sortedGroups = Object.keys(groupedTickets).map((group) => ({
        group,
        tickets: sortTickets(groupedTickets[group], sortBy),
    }));
    

    return (
        
        <div className="kanban-board">
            {sortedGroups.map(({ group, tickets }) =>{
                let random = Math.floor(Math.random() * 10);
                return (
               tickets.length > 0 && <div key={group} className="kanban-column">
                    <div className="column-header">
                        <div className="header-mixed-up">
                            {groupBy === "userId" ? <img src={`https://picsum.photos/200?random=${random}`} style={{width:"23px",height:"23px", borderRadius:"50%"}} alt="User Avatar" className="card-image-profile" /> :
                                headerImages[group] && (
                                    <img
                                        src={headerImages[group]}
                                        alt={`${group} header`}
                                        className="header-image"
                                    />
                                )}
                            {groupBy === "userId"
                                ? users.find((user) => user.id === group)?.name || "Unknown User"
                                : group.toUpperCase()}
                        <p className="ticket-count">{tickets.length}</p>
                        </div>
                        
                        <div className="header-icons">
                            <img src={add} alt="user avatar" className="header-add" />
                            <img src={dot} alt="user avatar" className="header-dot" />
                        </div>
                    </div>
                    <div className="ticket-list">
                        {tickets.map((ticket) => (
                            <TicketCard key={ticket.id} ticket={ticket} groupBy={groupBy} />
                        ))}
                    </div>
                </div>
            )})}
        </div>
    );
};

export default KanbanBoard;
