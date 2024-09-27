//Displays a list of logged time entries
import React from 'react';
import TimeLogItem from './TimeLogItem';

//Display log by row or column
const TimeLogList = ({ timeLogs, deleteTimeLog }) => 
  {
  return (
    <div class='flex justify-content-center'>
      <table class='text-center w-10 my-0 mx-auto' style={{ borderCollapse: 'collapse' }}>
        <thead style={{
          backgroundColor: '#51DACF'
        }}>
          <tr class='shadow-5'>
            {/*Display table headers */}
            <th class='p-2 w-2' style={{ border: '1px solid black' }}>Task</th>
            <th class='p-2 w-2' style={{ border: '1px solid black' }}>Start Time</th>
            <th class='p-2 w-2' style={{ border: '1px solid black' }}>End Time</th>
            <th class='p-2 w-2' style={{ border: '1px solid black' }}>Date</th>
            <th class='p-2 w-2' style={{ border: '1px solid black' }}>Duration</th>
            <th class='p-2 w-2' style={{ border: '1px solid black' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {/*Map timelogs (array) to TimeLogItem for each log */}
          {timeLogs.map((log) => (
            //Each log have own id
            <TimeLogItem key={log.id} log={log} deleteTimeLog={deleteTimeLog} />
          ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default TimeLogList