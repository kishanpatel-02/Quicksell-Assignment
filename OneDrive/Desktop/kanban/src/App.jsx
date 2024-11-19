import React, { useState, useEffect } from "react";
import KanbanBoard from "./Components/KanbanBoard.jsx";
import "./App.css";
import display from "./assets/Display.svg";
import dropdown from "./assets/down.svg";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [showNestedDropdowns, setShowNestedDropdowns] = useState(false);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority'); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(" https://api.quicksell.co/v1/internal/frontend-assignment").then((res) => res.json());
      setTickets(data.tickets);
      setUsers(data.users);
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

 
  const handleDisplayClick = () => {
    setShowNestedDropdowns(!showNestedDropdowns);
  };

  return (
    <div className="app">
      
      <div className="dropdown">
        <div className="display-dropdown">
          <img style={{height:"minHeight",width:"minWidth"}}  src={display} alt="user avatar" className="display-img" />
          <p style={{marginBlockStart: "0em",marginBlockEnd: "0em",padding:"8px 2px"}} onClick={handleDisplayClick}>Display</p>
          <img style={{height:"minHeight",width:"minWidth"}} src={dropdown} alt="user avatar" className="dropdown-img" onClick={handleDisplayClick} />
        </div>

        {showNestedDropdowns && (
          <div className="nested-dropdowns">
            
            <div className="dropdown-group">
              <label htmlFor="groupBy">Grouping </label>
              <select
                id="groupBy"
                value={groupBy}
                onChange={(e) => {
                  setGroupBy(e.target.value);}}
              >
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            
            <div className="dropdown-group">
              <label htmlFor="sortBy">Ordering </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
};

export default App;
