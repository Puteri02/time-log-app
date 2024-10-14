import React from "react";
import TimeLogItem from "./TimeLogItem";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './TimeLogList.css'

const TimeLogList = ({ timeLogs, deleteTimeLog }) => {
  return (
    <div className="card" style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
      <DataTable
        value={timeLogs}
        paginator rows={5} rowsPerPageOptions={[5, 10, 15]} // Pagination
        tableStyle={{width: '60rem'}}
        removableSort
        //responsiveLayout="stack" // responsiveness
      >
        {/*Display log table with sort*/}
        <Column field="task" header="Task" sortable style={{ width: '20%'}} />
        <Column field="startTime" header="Start Time" sortable style={{ width: '25%'}} />
        <Column field="endTime" header="End Time" sortable style={{ width: '25%'}} />
        <Column field="date" header="Date" sortable style={{ width: '25%'}} />
        <Column field="duration" header="Duration" sortable style={{ width: '30%'}} />
        <Column body={(rowData) => (
            // Delete button
            <TimeLogItem log={rowData} deleteTimeLog={deleteTimeLog} />
          )}
          header="Action"
          style={{ width: '50%', justifyContent: 'center'}}
        />
      </DataTable>
    </div>
  );
};

export default TimeLogList;