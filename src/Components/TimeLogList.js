import React, { useRef, useState } from "react";
import TimeLogItem from "./TimeLogItem";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import "./Style.css";

const TimeLogList = ({ timeLogs, deleteTimeLog }) => {
  // Confirm dialog
  const toast = useRef(null);

  // Global search
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    task: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  // accept and reject condition
  const accept = (log) => {
    deleteTimeLog(log?.id);
    toast.current.show({
      severity: "success",
      summary: "Deleted 🗑️",
      detail: "Selected log have been deleted!",
      life: 2500,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "info",
      summary: "Canceled ❌",
      detail: "The log is not deleted.",
      life: 2500,
    });
  };

  // toast + confirm dialog
  const handleDelete = (log) => {
    confirmDialog({
      message: "Do you want to delete this time log?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(log), // yes
      reject, // no
    });
  };

  // Global search
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end" >
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search..."
            // Hovering effect
            tooltip="Search by Task name & Date"
            tooltipOptions={{ position: "top"}}
          />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="grid pl-6 pr-6">
      {/* Have to be outside of the column */}
      <Toast ref={toast} />
      <ConfirmDialog
        style={{ width: "70vw" }}
        breakpoints={{ "1500px": "30vw", "960px": "100vw" }}
      />
      <div
        className="card"
        style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <DataTable
          value={timeLogs}
          // Pagination
          paginator
          rows={4}
          rowsPerPageOptions={[4, 8, 12]}
          removableSort
          style={{
            backgroundColor: "#FEF9F2",
            paddingLeft: "2em",
            paddingRight: "2em",
          }}
          // Filter + Global filter
          filters={filters}
          globalFilterFields={["task", "date"]} // Don't filter time and duration
          header={header} // Call the header func
          emptyMessage="No log found 😓."
        >
          {/*Display log table with sort*/}
          <Column
            field="task"
            header="Task"
            filter
            filterPlaceholder="Search by task..."
            sortable
          />
          <Column field="startTime" header="Start Time" sortable />
          <Column field="endTime" header="End Time" sortable />
          <Column field="date" header="Date" sortable />
          <Column field="duration" header="Duration" sortable />
          <Column
            //Delete
            body={(rowData) => (
              <TimeLogItem log={rowData} handleDelete={handleDelete} />
            )}
            header="Action"
            style={{ justifyContent: "center", textAlign: "center" }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default TimeLogList;
