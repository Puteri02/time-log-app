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
      summary: "Success 😀",
      detail: "Time Log successfully added!",
      life: 2500,
    });
  };
  // Toast
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error 😡",
      detail: "Please fill up all the data needed!",
      life: 2500,
    });
  };

  let today = new Date();
  // let month = today.getMonth();
  // let year = today.getFullYear();
  // let prevMonth = month === 0 ? 11 : month - 1;
  // let prevYear = prevMonth === 11 ? year - 1 : year;

  // PrimeReact date picker
  let minDate = new Date();
  // minDate.setMonth(prevMonth);
  // minDate.setFullYear(prevYear);

  minDate.setDate(today.getDate() - 14); // Allow to pick date between 2 weeks from current date

  let maxDate = new Date(); // Today is max

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Stop the form from refreshing before submission
    // Create Date objects for start and end times
    const start = startTime.toLocaleTimeString();
    const end = endTime.toLocaleTimeString();
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
      <div className="grid pl-6 pr-6">
        {/* Input for task */}
        <span className="col-12 md:col-6 lg:col-3 ">
          <label
            style={{
              display: "block",
              textAlign: "left",
              paddingBottom: "0.8em",
            }}
          >
            Task 🔎
          </label>
          <InputText
            className="w-full"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
            placeholder="Enter task name ..."
          />
        </span>

        {/* Input for Start Time */}
        <span className="col-12 md:col-6 lg:col-3">
          <label
            style={{
              display: "block",
              textAlign: "left",
              paddingBottom: "0.8em",
            }}
          >
            Start Time <span>⏳</span>
          </label>
          <Calendar
            className="w-full"
            // id="time12"
            type="time"
            value={startTime}
            onChange={(e) => {
              console.log(e);
              setStartTime(e.target.value);
            }}
            timeOnly
            hourFormat="12"
            required
            placeholder="Select start time ..."
          />
        </span>

        {/* Input for End Time */}
        <span className="col-12 md:col-6 lg:col-3">
          <label
            style={{
              display: "block",
              textAlign: "left",
              paddingBottom: "0.8em",
            }}
          >
            End Time ⌛
          </label>
          <Calendar
            id="time12"
            className="w-full"
            value={endTime}
            type="time"
            onChange={(e) => setEndTime(e.target.value)}
            timeOnly
            hourFormat="12"
            required
            placeholder="Select end time ..."
          />
        </span>

        {/* Input for Date */}
        <span className="col-12 md:col-6 lg:col-3">
          <label
            style={{
              display: "block",
              textAlign: "left",
              paddingBottom: "0.8em",
            }}
          >
            Date 📅
          </label>
          <Calendar
            className="w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            minDate={minDate}
            maxDate={maxDate}
            readOnlyInput
            required
            placeholder="Pick a date ..."
          />
        </span>
      </div>

      {/* Add Task button */}
      <div className="grid pl-6 pr-6" style={{ justifyContent: "center" }}>
        <button
          className="col-12 md:col-7 lg:col-4 text-50 bg-green-500 border-none text-center mt-5 mb-5 text-lg border-round-lg w-2 p-2 hover:bg-green-700 cursor-pointer"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (!task || !startTime || !endTime || !date) {
              showError();
            } else {
              showSuccess();
              handleSubmit(e);
            }
          }}
        >
          {" "}
          Add New
        </button>
      </div>
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>
    </form>
  );
}

export default AddTimeLogForm;
