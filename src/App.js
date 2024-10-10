//Manages state and renders other components
import React, { useState } from "react";
import "./App.css";
import AddTimeLogForm from "./Components/AddTimeLogForm";
import TimeLogList from "./Components/TimeLogList";
import { Card } from 'primereact/card';
 

const App = () => {

  const [timeLog, setTimeLog] = useState(
    localStorage.getItem("timeLogs") ? JSON.parse(localStorage.getItem("timeLogs")) : []
  ); // Create state with empty array to store time logs

  // Set it with empty data, thus the table will blink whenever its refreshed
  // To display the stored logs
  // useEffect(() => {
  //   const logs = localStorage.getItem("timeLogs"); // Get logs from local storage
  //   if (logs) {
  //     // Convert the logs from a string to an object and set it in state
  //     const storedLogs = JSON.parse(logs);
  //     setTimeLog(storedLogs);
  //   }
  // }, []);

  // To add a new time log to the list
  function addTimeLog(log) {
    setTimeLog([...timeLog, log]); // Add new log to the array
  }

  // To delete a time log
  const deleteTimeLog = (id) => {
    const updatedLogs = timeLog.filter((log) => log.id !== id); // Delete log with matching ID
    setTimeLog(updatedLogs); // Update the remaining logs
    localStorage.setItem("timeLogs", JSON.stringify(updatedLogs)); // Update ls with new logs
  };

  return (
    <div className="card">
      <Card title="Time-Log Application" 
        style={{textAlign: "center", 
                color: "whitesmoke", 
                backgroundColor: "#88AB8E",
                paddingTop: "2em",
                paddingBelow: "2em"}}
      />
      <br/>
      <br/>
      <AddTimeLogForm addTimeLog={addTimeLog} /> {/* Add time log */}
      <br />
      <TimeLogList timeLogs={timeLog} deleteTimeLog={deleteTimeLog} />{" "}
      {/* Pass timeLogs and deleteTimeLog */}
    </div>
  );
};

export default App;
