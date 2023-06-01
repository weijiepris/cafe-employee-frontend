import React from "react";
import { AgGridReact } from "ag-grid-react";
import "./styles/Table.css";
const Table = ({ data, columns, defaultColDef }) => {
  return (
    <div
      className="ag-theme-alpine "
      style={{ height: "300px", width: "100vw", margin: "0 auto" }}
    >
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        className="thStyle"
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default Table;
