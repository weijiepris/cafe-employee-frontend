import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeActions } from "../../redux/employeeReducer";
import Table from "../common/Table";
import {
  Stack,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Container,
  Box,
} from "@mui/material";
import EditEmployee from "./EditEmployee";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchAllEmployees,
  fetchAllEmployeesByCafeLocation,
  fetchAllEmployeesByCafeName,
  fetchEmployeesByCafeNameAndLocation,
} from "./services/employee.service";

import Card from "../common/Card";

import styles from "./styles/Employee.module.css";
import Header from "../common/Header";
import AddEmployee from "./AddEmployee";
const Employee = () => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const [deleteData, setDeleteData] = useState({});
  const [displayDialog, setDisplayDialog] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  // to get url params
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nameParams = params.get("name");
  const locationParams = params.get("location");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.data);

  useEffect(() => {
    console.log("name:", nameParams, " location:", locationParams);

    if (nameParams && locationParams) {
      console.log("here, find by name and location only");
      GetEmployeeByNameAndLocation();
      return;
    }

    if (nameParams && !locationParams) {
      console.log("here, find by name only");
      GetAllEmployeesByCafeName();
      return;
    }

    if (!nameParams && locationParams) {
      console.log("here, find by location only");
      GetAllEmployeesByCafeLocation();
      return;
    }

    getEmployee();
  }, []);

  const addNewEmployee = () => {
    setAddMode(true);
  };

  const editRow = (value) => {
    console.log(value.data);
    setEditData(value.data);
    setEditMode(true);
  };

  const returnToEmployee = () => {
    setEditData([]);
    setEditMode(false);
    setAddMode(false);
  };

  const deleteRow = (value) => {
    console.log(value.data);
    setDeleteData(value.data);
    openDialog();
  };

  const closeDialog = () => {
    setDeleteData({});
    setDisplayDialog(false);
  };

  const openDialog = () => {
    setDisplayDialog(true);
  };

  const EditButtonComponent = (value) =>
    useMemo(() => {
      return (
        <Stack spacing={1} direction="row">
          <Button
            className={styles.returnButton}
            onClick={() => editRow(value)}
          >
            Edit
          </Button>
          <Button
            className={styles.returnButton}
            onClick={() => deleteRow(value)}
          >
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
    { headerName: "Cafe Location", field: "cafe_location" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: EditButtonComponent,
    },
  ];

  const getEmployee = () => {
    fetchAllEmployees().then((res) => {
      console.log(res.data);
      dispatch(employeeActions.add(res.data));
    });
    setShowSnack(true);
    setSnackMessage("Succesfully fetched Employee information");
  };

  const GetEmployeeByNameAndLocation = useCallback(() => {
    fetchEmployeesByCafeNameAndLocation(nameParams, locationParams).then(
      (res) => {
        console.log(res.data);
        dispatch(employeeActions.add(res.data));
      }
    );
  }, []);

  const GetAllEmployeesByCafeName = useCallback(() => {
    fetchAllEmployeesByCafeName(nameParams)
      .then((res) => {
        console.log(res.data);
        dispatch(employeeActions.add(res.data));
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  const GetAllEmployeesByCafeLocation = useCallback(() => {
    fetchAllEmployeesByCafeLocation(locationParams)
      .then((res) => {
        console.log(res.data);
        dispatch(employeeActions.add(res.data));
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  if (addMode) {
    return <AddEmployee returnToEmployee={returnToEmployee} />;
  }

  if (editMode) {
    return (
      <EditEmployee editData={editData} returnToEmployee={returnToEmployee} />
    );
  }

  return (
    <Card>
      <Header>Employee</Header>
      <Table data={employee} columns={columns} />

      <Button
        className={styles.returnButton}
        onClick={() => {
          addNewEmployee();
        }}
      >
        Add New Employee
      </Button>
      <Button className={styles.returnButton} onClick={() => navigate("/cafe")}>
        Go to Cafe Page
      </Button>
      <Button className={styles.returnButton} onClick={() => getEmployee()}>
        Reset Employee information
      </Button>

      <Dialog open={displayDialog} onClose={closeDialog}>
        <DialogTitle>{"You are about to delete a Employee"}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Employee? {deleteData.name}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Disagree</Button>
          <Button onClick={() => console.log("agree")}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnack}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnack(false);
        }}
      >
        <Alert severity="info">{snackMessage}</Alert>
      </Snackbar>
    </Card>
  );
};

export default Employee;
