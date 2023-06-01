import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "../../redux/employeeReducer";
import Table from "../common/Table";
import { Button, Stack } from "@mui/material";

const Employee = () => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.data);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const editRow = (value) => {
    console.log(value.data);
  };

  const deleteRow = (value) => {
    console.log(value.data);
  };

  const EditButtonComponent = (value) =>
    useMemo(() => {
      return (
        <Stack spacing={1} direction="row">
          <Button variant="contained" onClick={() => editRow(value)}>
            Edit
          </Button>
          <Button variant="contained" onClick={() => deleteRow(value)}>
            Delete
          </Button>
        </Stack>
      );
    }, []);
  const columns = [
    {
      headerName: "UUID",
      field: "id",
    },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "email_address" },
    { headerName: "Phone Number", field: "phone_number" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Days Worked", field: "days_worked" },
    { headerName: "Cafe Name", field: "cafe_name" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: EditButtonComponent,
    },
  ];

  const fetchEmployee = async () => {
    console.log("fetching employee info");
    axios.get("http://localhost:3001/employees").then((res) => {
      console.log(res.data);
      dispatch(employeeActions.add(res.data));
    });
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <>
      <div>Employee</div>
      <button onClick={() => fetchEmployee()}>
        Fetch Employee information
      </button>
      <Table data={employee} columns={columns} defaultColDef={defaultColDef} />
      <Button variant="outlined">Add New Employee</Button>
    </>
  );
};

export default Employee;
