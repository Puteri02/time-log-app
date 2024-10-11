import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import TimeLogItem from "./TimeLogItem";

const TimeLogList = ({ timeLogs, deleteTimeLog }) => {
  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <DataTable
        value={timeLogs}
        paginator rows={5} rowsPerPageOptions={[5, 10, 15]} // Pagination
        tableStyle={{ maxWidth: '80rem'}}
      >
        {/*Display log table with sort*/}
        <Column field="task" header="Task" sortable style={{ width: '20%', textAlign: 'center', justifyContent: 'center'}} />
        <Column field="startTime" header="Start Time" sortable style={{ width: '20%', textAlign: 'center'}} />
        <Column field="endTime" header="End Time" sortable style={{ width: '20%', textAlign: 'center'}} />
        <Column field="date" header="Date" sortable style={{ width: '20%', textAlign: 'center'}} />
        <Column field="duration" header="Duration" sortable style={{ width: '20%', textAlign: 'center' }} />
        <Column
          body={(rowData) => (
            // Delete button
            <TimeLogItem log={rowData} deleteTimeLog={deleteTimeLog} />
          )}
          header="Action"
          style={{ width: '50%' }}
        />
      </DataTable>
    </div>
  );
};

export default TimeLogList;