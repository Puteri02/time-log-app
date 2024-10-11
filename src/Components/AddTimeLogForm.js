// A form for new log entries
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";

function AddTimeLogForm({ addTimeLog }) {
  // Variables to store form data
  const [task, setTask] = useState(""); // For the task name
  const [startTime, setStartTime] = useState(""); // For the start time
  const [endTime, setEndTime] = useState(""); // For the end time
  const [date, setDate] = useState(""); // For the date

  // PrimeReact successbtn
  const toast = useRef(null);
  // Toast
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Time Log successfully added!",
      life: 2500,
    });
  };
  // Toast
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail: "Please fill up all the data needed!",
      life: 2500,
    });
  };

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year - 1 : year;

  // PrimeReact date picker
  let minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date(); // today is max

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Stop the form from refreshing before submission
    // Create Date objects for start and end times
    const start = startTime.toLocaleTimeString()
    const end = endTime.toLocaleTimeString()
    const diff = (endTime - startTime) / 1000 / 60; // To convert ms to mn

    // Create a new log object with the form data
    const newLog = {
      id: Date.now(), // Unique ID based on the time
      task: task, // Task name from the input
      startTime: start, // Start time from the input
      endTime: end, // End time from the input
      date: date.toLocaleDateString(), // Date from the input // Convert date obj to string
      duration: diff > 0 ? `${diff.toFixed(0)} mins` : "Invalid duration", // Duration
    };

    // Call the addTimeLog function a prop to add the new log
    addTimeLog(newLog);

    // Retrieve the existing logs
    const existingLogs = JSON.parse(localStorage.getItem("timeLogs")) || [];
    // Combine the existing logs with new log
    localStorage.setItem("timeLogs", JSON.stringify([...existingLogs, newLog]));

    // To display
    //console.log(JSON.parse(localStorage.getItem("timeLogs")));

    // Reset the input boxes after submission
    setTask(""); // Clear task input
    setStartTime(""); // Clear start time input
    setEndTime(""); // Clear end time input
    setDate(""); // Clear date input
  }

  return (
    <form onSubmit={handleSubmit} className="text-center mt-3">
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {/* Input for task */}
        <span style={{marginLeft: "10em", marginRight: "4em"}}>
          <label
            style={{
              display:"block", 
              textAlign:'left', 
              paddingBottom: '1em', 
              fontFamily: 'cursive'
            }}>
            Task name 🔎
          </label>
          <InputText
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required/>
        </span>

        {/* Input for Start Time */}
        <span style={{marginRight: "6em"}}>
          <label
            style={{
              display: "block",
              textAlign: "left",
              paddingBottom: "1em",
              fontFamily: "cursive",
            }}
          >
            Start Time <span>⏳</span>
          </label>
          <Calendar
              id="time12"
              type="time"
              value={startTime}
              onChange={(e) => {
                console.log(e)
                setStartTime(e.target.value);
              }}
              timeOnly
              hourFormat="12"
              required
            />
        </span>

        {/* Input for End Time */}
        <span style={{marginRight: "6em"}}>
          <label
            style={{
              display: "block",
              textAlign: "left",
              paddingBottom: "1em",
              fontFamily: "cursive",
            }}
          >
            End Time ⌛
          </label>
          <Calendar
              id="time12"
              value={endTime}
              type="time"
              onChange={(e) => setEndTime(e.target.value)}
              timeOnly
              hourFormat="12"
              required
            />
        </span>

        {/* Input for Date */}
        <span style={{ marginRight: "10em" }}>
          <label
            style={{
              display: "block",
              textAlign: "left",
              paddingBottom: "1em",
              fontFamily: "cursive",
            }}>
            Date 📅
          </label>
          <Calendar
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              minDate={minDate}
              maxDate={maxDate}
              readOnlyInput
              required
              //panelStyle={{ height: "280px", width: "280px" }}
              //maxDate={new Date().toISOString().split('T')[0]}
            />
        </span>
      </div>
      {/* Add Task button */}
      <button
        style={{ fontFamily: "cursive" }}
        className ="text-50 bg-green-500 border-none text-center mt-5 mb-5 text-lg border-round-lg w-1 p-1 hover:bg-green-700 cursor-pointer"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (!task || !startTime || !endTime || !date) {
            showError();
          } else {
            showSuccess();
            handleSubmit(e);
          }
        }}>
        Add New
      </button>
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>
    </form>
  );
}

export default AddTimeLogForm