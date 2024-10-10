// Shows log entry with a delete button
import React, { useRef} from "react";
//import { Toast } from 'primereact/toast';
//import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';

const TimeLogItem = ({ log, deleteTimeLog }) => {

  const toastBC = useRef(null);

  // Display alert before delete the log
  const handleDelete = () => {
    alert(`Log entry for "${log.task}" has been deleted.`);
    deleteTimeLog(log.id);
  };

  const showConfirm = () => {
    toastBC.current.show({ severity: 'warn', sticky: true, content: (
        <div className="flex flex-column" style={{flex: '1'}}>
            <div className="text-center">
                <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
                <h4>Are you sure?</h4>
                <p>Confirm to proceed</p>
            </div>
            <div className="grid p-fluid">
                <div className="col-6">
                    <Button type="button" label="Yes" className="p-button-success" />
                </div>
                <div className="col-6">
                    <Button type="button" label="No" className="p-button-secondary"/>
                </div>
            </div>
        </div>
    ) });
}


  return (
    <tr class="surface-50 shadow-5">
      {" "}
      {/*Display the table cell*/}
      <td class="p-2" style={{ border: "1px solid black" }}>
        {log.task}
      </td>
      <td class="p-2" style={{ border: "1px solid black" }}>
        {log.startTime}
      </td>
      <td class="p-2" style={{ border: "1px solid black" }}>
        {log.endTime}
      </td>
      <td class="p-2" style={{ border: "1px solid black" }}>
        {log.date}
      </td>
      <td class="p-2" style={{ border: "1px solid black" }}>
        {log.duration}
      </td>
      <td class="p-2" style={{ border: "1px solid black" }}>

        {/*Delete button */}
        {/*<button
          class="hover:bg-red-600 text-50 border-none border-round w-6 cursor-pointer bg-red-500"
          style={{ padding: "5px 10px", fontFamily: "cursive" }}
          onClick={() => handleDelete(log.id)}
        >
          Delete
        </button>*/}
        <div className="card flex flex-wrap justify-content-center gap-3">
            <Button label="Delete" severity="danger" raised onClick={() => handleDelete(log.id)}/>
        </div>
      </td>
    </tr>
  );
};

export default TimeLogItem