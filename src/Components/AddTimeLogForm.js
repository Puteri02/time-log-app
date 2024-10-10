// A form for new log entries
import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
//import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from 'primereact/calendar'; 
import { Toast } from 'primereact/toast';
 
function AddTimeLogForm({ addTimeLog }) {
  // Variables to store form data
  const [task, setTask] = useState(""); // For the task name
  const [startTime, setStartTime] = useState(""); // For the start time
  const [endTime, setEndTime] = useState(""); // For the end time
  const [date, setDate] = useState(""); // For the date

  // PrimeReact successbtn
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Success Message', detail:'Time Log successfully added!', life: 2500});
  };
  // PrimeReact errorbtn
  const showError = () => {
    toast.current.show({severity:'error', summary: 'Error Message', detail:'Please fill up all the data needed!', life: 2500});
  }

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
        <span>
        {/*<div className="card flex justify-content-center">
            <FloatLabel>
                <InputText id="username" 
                  value={task} 
                  onChange={(e) => setTask(e.target.value)} 
                  required/>
                <label htmlFor="username">Task name 🔎</label>
            </FloatLabel>
        </div>*/}
        <label style={{justifyContent: "left", textAlign: "left", paddingBottom: '1em', fontFamily: 'cursive'}}>Task name 🔎</label>
        <div className="card flex justify-content-center">
            <InputText 
              value={task} 
              onChange={(e) => setTask(e.target.value)} 
              required />
        </div>
        </span>

         <span style={{marginLeft: '10em'}}>
            {/*<label style={{display:"block", textAlign:'left', paddingBottom: '1em', fontFamily: 'cursive'}}>
              Task Name 🔎
            </label>
              <input
                  class="w-12rem h-2rem"
                  style={{backgroundColor: '#EBD3F8'}}
                  type="text"
                  placeholder="Task ..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)} // Update task state on change
                  //required
                />*/}
          </span>

        {/* Input for Start Time */}
         <span>
            <label style={{display:"block", textAlign:'left', paddingBottom: '1em', fontFamily: 'cursive'}}>
              Start Time <span>⏳</span>
            </label>
              {/*<input
                  class=" w-10rem h-2rem"
                  style={{backgroundColor: '#FFF6EA'}}
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)} // Update task state on change
                  //required
                />*/}
                <div className="field col-12 md:col-8">
                    <Calendar id="time12" 
                      type="time" 
                      value={startTime} 
                      onChange={(e) => setStartTime(e.target.value)} 
                      timeOnly 
                      hourFormat="12" 
                      required />
                </div>
          </span>

        {/* Input for End Time */}
         <span>
            <label style={{display:"block", textAlign:'left', paddingBottom: '1em', fontFamily: 'cursive'}}>
              End Time ⌛
            </label>
              {/*<input
                    class="w-10rem h-2rem"
                    style={{backgroundColor: '#FFF6EA'}}
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)} // Update task state on change
                    //required
                  />*/}
                <div className="field col-12 md:col-8">
                  <Calendar id="time12" 
                    value={endTime} 
                    type="time" 
                    onChange={(e) => setEndTime(e.target.value)} 
                    timeOnly 
                    hourFormat="12" 
                    required/>
                </div>
          </span>

        {/* Input for Date */}
         <span style={{marginRight: '10em'}}>
            <label style={{display:"block", textAlign:'left', paddingBottom: '1em', fontFamily: 'cursive'}}>
              Date 📅
            </label>    
            <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.target.value)} 
              type="date" 
              minDate={minDate} 
              maxDate={maxDate} 
              readOnlyInput 
              required
              panelStyle={{height: "280px", width: "280px"}}
              //maxDate={new Date().toISOString().split('T')[0]}
              />
            </div>
              {/*<input
                    class="w-10rem h-2rem"
                    style={{ backgroundColor: '#CAF4FF' }}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} // Update task state on change
                    required

                    max={new Date().toISOString().split('T')[0]} // Convert date to string, display date
                    max = "2024-10-03" //Put the max date
                  />*/}
          </span>
      </div>
      <br/>
      {/* Add Task button */}
      <button
      style={{fontFamily: 'cursive'}}
        class="text-50 bg-green-500 border-none text-center mt-5 mb-5 text-lg border-round-lg w-1 p-1 hover:bg-green-700 cursor-pointer"
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