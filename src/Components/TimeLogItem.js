// Shows log entry with a delete button
import React from 'react';

const TimeLogItem = ({ log, deleteTimeLog }) => {

  // Display alert before delete the log
  const handleDelete = () => {
    alert(`Log entry for "${log.task}" has been deleted.`);
    deleteTimeLog(log.id);
  };

  return (
    <tr class='surface-50 shadow-5'> {/*Display the table cell*/}
      <td class='p-2' style={{ border: '1px solid black'}}>{log.task}</td>
      <td class='p-2' style={{ border: '1px solid black'}}>{log.startTime}</td>
      <td class='p-2' style={{ border: '1px solid black'}}>{log.endTime}</td>
      <td class='p-2' style={{ border: '1px solid black'}}>{log.date}</td>
      <td class='p-2' style={{ border: '1px solid black'}}>{log.duration}</td>
      <td class='p-2' style={{ border: '1px solid black'}}>{/*Delete */}

        {/*Delete button */}
        <button class='hover:bg-red-600 text-50 border-none border-round w-6 cursor-pointer bg-red-500'
            style={{padding: '5px 10px', fontFamily: 'cursive'}}
          onClick={() => handleDelete(log.id)
          }>
          Delete
          </button>
      </td>
    </tr>
  );
}

export default TimeLogItem