import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cafeActions } from "../../redux/cafeReducer";
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
  Divider,
} from "@mui/material";
import axios from "axios";
import Table from "../common/Table";
import EditCafe from "./EditCafe";
import { useNavigate } from "react-router-dom";

import styles from "./styles/Cafe.module.css";
import Card from "../common/Card";
import Header from "../common/Header";
import AddCafe from "./AddCafe";
const Cafe = () => {
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState([]);
  const [deleteData, setDeleteData] = useState({});
  const [addMode, setAddMode] = useState(false);

  const [displayDialog, setDisplayDialog] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cafe = useSelector((state) => state.cafe.data);

  useEffect(() => {
    fetchCafe();
  }, []);

  const fetchCafe = () => {
    axios.get("http://localhost:3001/cafes").then((res) => {
      console.log(res.data);
      dispatch(cafeActions.add(res.data));
    });

    setShowSnack(true);
    setSnackMessage("Succesfully fetched Cafe information");
  };

  const addNewCafe = () => {
    setAddMode(true);
  };
  const returnToCafe = () => {
    setEditData([]);
    setEditMode(false);
    setAddMode(false);
  };

  const editRow = (value) => {
    setEditData(value.data);
    setEditMode(true);
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

  const openEmployee = (event) => {
    const { employees, name, location } = event.data;
    if (employees <= 0) {
      setShowSnack(true);
      setSnackMessage("This cafe does not have any employees");
      return;
    }
    navigate(`/employee?name=${name}&location=${location}`);
    return;
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
    { headerName: "Description", field: "description" },
    { headerName: "Logo", field: "logo" },
    { headerName: "Location", field: "location" },
    {
      headerName: "Number of Employees",
      field: "employees",
      onCellClicked: (event) => {
        openEmployee(event);
      },
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: EditButtonComponent,
    },
  ];

  if (addMode) {
    return <AddCafe returnToCafe={returnToCafe} />;
  }

  if (editMode) {
    return <EditCafe editData={editData} returnToCafe={returnToCafe} />;
  }

  return (
    <Card>
      <Header>Cafe</Header>
      <Table data={cafe} columns={columns} />
      <Button
        className={styles.returnButton}
        onClick={() => {
          addNewCafe();
        }}
      >
        Add New Cafe
      </Button>
      <Button
        className={styles.returnButton}
        onClick={() => navigate("/employee")}
      >
        Go to Employee Page
      </Button>
      <Button className={styles.returnButton} onClick={() => fetchCafe()}>
        Reset Cafe information
      </Button>

      <Dialog open={displayDialog} onClose={closeDialog}>
        <DialogTitle>{"You are about to delete a Cafe"}</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this cafe? {deleteData.name} (
          {deleteData.location})
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

export default Cafe;
