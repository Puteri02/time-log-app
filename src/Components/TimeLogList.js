import React, { useRef, useState } from "react";
import TimeLogItem from "./TimeLogItem";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Style.css";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
// import { InputText } from 'primereact/inputtext';

const TimeLogList = ({ timeLogs, deleteTimeLog, log }) => {
  // Confirm dialog
  const toast = useRef(null);
  // Filter
  // const [onGlobalFilterChange, setGlobalFilter] = useState();

  const accept = (log) => {
    deleteTimeLog(log?.id);
    toast.current.show({
      severity: "success",
      summary: "Deleted",
      detail: "The selected log have been deleted!",
      life: 2500,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "info", summary: "Canceled", detail: "The log is not deleted.", life: 2500,
    });
  };

  // toast / confirm dialog
  const handleDelete = (log) => {
    confirmDialog({
      message: "Do you want to delete this time log?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(log), // yes
      reject, // no
    });

  //   const onGlobalFilterChange = (e) => {
  //     setGlobalFilter(e.target.value);
  // };
  };

  return (
    <div>
      {/* Have to be outside of the column */}
      <Toast ref={toast} />
      <ConfirmDialog style={{ width: "30vw" }} />
      <div
        className="card"
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
      {/* <span className="p-input-icon-left">
        <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={onGlobalFilterChange}
            placeholder="Global Search"
          />
      </span> */}

        <DataTable
          value={timeLogs}
          paginator rows={4} rowsPerPageOptions={[4, 8, 12]} // Pagination
          tableStyle={{ width: "80vw" }}
          removableSort
          //responsiveLayout="stack" // responsiveness
        >
          {/*Display log table with sort*/}
          <Column field="task" header="Task" filter filterPlaceholder="Search by task" sortable style={{ width: "20%" }} />
          <Column field="startTime" header="Start Time" sortable style={{ width: "20%" }} />
          <Column field="endTime" header="End Time"  sortable style={{ width: "20%" }} />
          {/* sort by month */}
          <Column field="date" header="Date" filter filterPlaceholder="Search by Date" sortable style={{ width: "20%" }} />
          {/* do more than 60 min or less than 60 min
          <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} /> */}
          <Column field="duration" header="Duration"  sortable style={{ width: "30%" }} />
          <Column
            // Delete button
            body={(rowData) => (
              <TimeLogItem log={rowData} handleDelete={handleDelete} />
            )}
            header="Action"
            style={{ width: "50%", justifyContent: "center" }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default TimeLogList;
