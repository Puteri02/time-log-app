// Shows log entry with a delete button
import React, { useRef } from "react";
import { Button } from "primereact/button";
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method

const TimeLogItem = ({ log, deleteTimeLog }) => {

  // Confirm dialog
const toast = useRef(null);

const accept = () => {
  toast.current.show({ severity: 'error', summary: 'Confirmed', detail: 'You have deleted the log!', life: 2500 });
}

const reject = () => {
  toast.current.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected to delete.', life: 2500 });
}

const handleDelete = () => {
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };


  // Display alert before delete the log
  // const handleDelete = () => {
  //   alert(`Log entry for "${log.task}" has been deleted.`);
  //   deleteTimeLog(log.id);
  // };

  return (
    <tr className="surface-50 shadow-5">
      <td>
        {/* Delete button */}
        <Button onClick={() => handleDelete(log.id)}
         icon="pi pi-times"
          label="Delete"
          className="p-button-danger p-button-outlined">
        </Button>
      </td>
    </tr>
  );
};

export default TimeLogItem;