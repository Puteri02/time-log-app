//Manages state and renders other components
import React, { useState, useEffect } from 'react';
import './App.css';
import AddTimeLogForm from './Components/AddTimeLogForm';
import TimeLogList from './Components/TimeLogList';

const App = () => {
  const [timeLog, setTimeLog] = useState([]); // Create state with empty array to store time logs

  // To display the stored logs
  useEffect(() => {
    const logs = localStorage.getItem('timeLogs'); // Get logs from local storage
    if (logs) {
      // Convert the logs from a string to an object and set it in state
      const storedLogs = JSON.parse(logs);
      setTimeLog(storedLogs);
    }
  }, []);

  // To add a new time log to the list
  function addTimeLog(log) {
    setTimeLog([...timeLog, log]); // Add new log to the array
  }

  // To delete a time log
  const deleteTimeLog = (id) => {
    const updatedLogs = timeLog.filter((log) => log.id !== id); // Delete log with matching ID
    setTimeLog(updatedLogs); // Update the remaining logs
    localStorage.setItem('timeLogs', JSON.stringify(updatedLogs)); // Update ls with new logs
  }

  return (
    <div class='bg-teal-100' style={{ minHeight: '100vh'}}>
      <br/><br/>
      <h1 style={{ textAlign: 'center', color: '#1E0342' }}>Time-Log Application</h1>
      <br/>
      <AddTimeLogForm addTimeLog={addTimeLog} /> {/* Add time log */} <br/>
      <TimeLogList timeLogs={timeLog} deleteTimeLog={deleteTimeLog} /> {/* Pass timeLogs and deleteTimeLog */}
    </div>
  )
}

export default App