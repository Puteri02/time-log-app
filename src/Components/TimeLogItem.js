// Shows log entry with a delete button
import React from "react";
import { Button } from "primereact/button";

const TimeLogItem = ({ log, handleDelete}) => {
  // Confirm dialog
  // const toast = useRef(null);

  // const accept = () => {
  //   deleteTimeLog(log.id); // Call the delete function
  //   toast.current.show({
  //     severity: "success", summary: "Deleted", detail: "The selected log have been deleted!", life: 2500 });
  // };

  // const reject = () => {
  //   toast.current.show({
  //     severity: "info", summary: "Canceled", detail: "The log is not deleted.", life: 2500 });
  // };
  // toast / confirm dialog
  // const handleDelete = () => {
  //   confirmDialog({
  //     message: "Do you want to delete this time log?",
  //     header: "Delete Confirmation",
  //     icon: "pi pi-info-circle",
  //     acceptClassName: "p-button-danger",
  //     accept: accept(log), // yes
  //     reject, // no
  //   });
  // };

  //   const handleConfirm = () => {
  //     console.log("Confirm dialog triggered");
  // };

  return (
    <div>
      <table>
        <tbody>
          <tr className="surface-50 shadow-5">
            <td>
              <Button
                onClick = {() => handleDelete(log)}
                icon="pi pi-times"
                label="Delete"
                className="p-button-danger p-button-outlined p-button-sm custom-button"
                style={{
                  border: "0.5px solid red",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TimeLogItem;
