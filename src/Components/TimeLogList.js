import React, { useRef, useState } from "react";
import TimeLogItem from "./TimeLogItem";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import "./Style.css";

const TimeLogList = ({ timeLogs, deleteTimeLog, log }) => {
  // Confirm dialog
  const toast = useRef(null);

  // Global search
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [filters, setFilters] = useState
  ({ global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      task: { value: null, matchMode: FilterMatchMode.CONTAINS }}); 

  const accept = (log) => {
    deleteTimeLog(log?.id);
    toast.current.show({
      severity: "success", summary: "Deleted 🗑️", detail: "The selected log have been deleted!", life: 2500 }); };
  
  const reject = () => {
    toast.current.show({
      severity: "info", summary: "Canceled ❌", detail: "The log is not deleted.", life: 2500 }); };

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

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search..."
          />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();

return (
    <div>
      {/* Have to be outside of the column */}
      <Toast ref={toast} />
      <ConfirmDialog style={{ width: "30vw" }} />
      <div
        className="card"
        style={{
          textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%",
        }}
      >
        <DataTable
          value = { timeLogs }
           // Pagination
          paginator rows = { 4 } rowsPerPageOptions = {[ 4, 8, 12 ]}
          tableStyle = {{ width: "80vw" }}
          removableSort
          style = {{ backgroundColor: '#FEF9F2'}}
          // Filter + Global filter
          filters = { filters } globalFilterFields={['task', 'duration', 'date']} // Don't filter time
          header = { header } // Call the header func
          emptyMessage = "No log found 😓."
          //responsiveLayout="scroll" // responsiveness
          // breakpoint="960px"
        >
          {/*Display log table with sort*/}
          <Column field="task" header="Task" filter filterPlaceholder="Search by task..." sortable style={{ width: "12.5%" }} />
          <Column field="startTime" header="Start Time" sortable style={{ width: "12.5%" }} />
          <Column field="endTime" header="End Time" sortable style={{ width: '12.5%'}}/>
          <Column field="date" header="Date" sortable style={{ width: "12.5%" }} />
          <Column field="duration" header="Duration" sortable style={{ width: "12.5%" }}  />
          <Column
          //Delete
            body={(rowData) => (
              <TimeLogItem log={rowData} handleDelete={handleDelete} />
            )}
            header="Action" style={{width: "6%", justifyContent: "center", textAlign: "center"}}
          />
        </DataTable>
      </div>
    </div>
  );
};


export default TimeLogList;
