import React from "react";
import { AgGridReact } from "ag-grid-react";

import "./styles/Table.css";
import { defaultColDef } from "./utilities/TableSettings";

const Table = ({ data, columns }) => {
  return (
    <>
      <div
        className="ag-theme-alpine "
        style={{
          height: "300px",
          width: "99vw",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <AgGridReact
          rowData={data}
          columnDefs={columns}
          className="thStyle"
          defaultColDef={defaultColDef}
        />
      </div>
      <br />
    </>
  );
};

export default Table;
