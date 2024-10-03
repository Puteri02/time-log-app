// A form for new log entries
import React, { useState } from "react";

function AddTimeLogForm({ addTimeLog }) {
  // Variables to store form data
  const [task, setTask] = useState(""); // For the task name
  const [startTime, setStartTime] = useState(""); // For the start time
  const [endTime, setEndTime] = useState(""); // For the end time
  const [date, setDate] = useState(""); // For the date
  
  // Handle form submission
  function handleSubmit(e) {
    //e.preventDefault(); // Stop the form from refreshing before submission

    // Create Date objects for start and end times
    const start = new Date(`1970-01-01T${startTime}:00`); // Format of YYYY-MM-DD
    const end = new Date(`1970-01-01T${endTime}:00`);

    const diff = (end - start) / 1000 / 60; // To convert the input take from ms to mn

    // Create a new log object with the form data
    const newLog = {
      id: Date.now(), // Unique ID based on the time
      task: task, // Task name from the input
      startTime: startTime, // Start time from the input
      endTime: endTime, // End time from the input
      date: date, // Date from the input
      duration: diff > 0 ? `${diff.toFixed(0)} mins` : "Invalid duration", // Duration
    };

    // Call the addTimeLog function a prop to add the new log
    addTimeLog(newLog);

    // Retrieve the existing logs
    const existingLogs = JSON.parse(localStorage.getItem("timeLogs")) || [];
    // Combine the existing logs with new log
    localStorage.setItem("timeLogs", JSON.stringify([...existingLogs, newLog]));

    // To display
    console.log(JSON.parse(localStorage.getItem("timeLogs")));

    // Reset the input boxes after submission
    setTask(""); // Clear task input
    setStartTime(""); // Clear start time input
    setEndTime(""); // Clear end time input
    setDate(""); // Clear date input
  }


  return (
    <form onSubmit={handleSubmit} class="text-center mt-3">
      <div style={{display:"flex", justifyContent:"space-around"}}>
        {/* Input for task */}
         <span style={{marginLeft: '10em'}}>
            <label style={{display:"block", textAlign:'left', paddingBottom: '1em', fontFamily: 'cursive'}}>
              Task Name 🔎
            </label>
              <input
                  class="w-12rem h-2rem"
                  style={{backgroundColor: '#EBD3F8'}}
                  type="text"
                  placeholder="Task ..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)} // Update task state on change
                  required
                />
          </span>
        {/* Input for Start Time */}
         <span>
            <label style={{display:"block", textAlign:'left', paddingBottom: '1em', fontFamily: 'cursive'}}>
              Start Time <span>⏳</span>
            </label>
              <input
                  class=" w-10rem h-2rem"
                  style={{backgroundColor: '#FFF6EA'}}
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)} // Update task state on change
                  required
                />
          </span>
        {/* Input for End Time */}
         <span>
            <label style={{display:"block", textAlign:'left', paddingBottom: '1em', fontFamily: 'cursive'}}>
              End Time ⌛
            </label>
              <input
                    class="w-10rem h-2rem"
                    style={{backgroundColor: '#FFF6EA'}}
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)} // Update task state on change
                    required
                  />
          </span>
        {/* Input for Date */}
         <span style={{marginRight: '10em'}}>
            <label style={{display:"block", textAlign:'left', paddingBottom: '1em', fontFamily: 'cursive'}}>
              Date 📅
            </label>
              <input
                    class="w-10rem h-2rem"
                    style={{ backgroundColor: '#CAF4FF' }}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} // Update task state on change
                    required

                    max={new Date().toISOString().split('T')[0]} // Convert date to string, display date
                    //max = "2024-10-03" //Put the max date
                  />
          </span>
      </div>
      <br/>
      {/* Add Task button */}
      <button
      style={{fontFamily: 'cursive'}}
        class="text-50 bg-green-500 border-none text-center mt-5 mb-5 text-lg border-round-lg w-1 p-1 hover:bg-green-700 cursor-pointer"
        type="submit"
        onClick={() => {
          if (!task || !startTime || !endTime || !date) {
            alert("Please fill up all the data needed!"); // Show error message
            return;
          } else {
            alert(`Log entry for "${task}" is added!`); // Show success message
            return;
          }
        }}
      >
        Add New
      </button>
    </form>
  );
}

export default AddTimeLogForm