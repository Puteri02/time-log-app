// Shows log entry with a delete button
import React from "react";
import { Button } from "primereact/button";

const TimeLogItem = ({ log, handleDelete}) => {
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
                className="p-button-danger p-button-outlined p-button-sm delete-button"
                style={{
                  border: "1px solid red",
                  borderRadius: "5px",
                  padding: "5px"
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
