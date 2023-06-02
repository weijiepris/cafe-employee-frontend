import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cafeActions } from "../../redux/cafeReducer";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import Table from "../common/Table";
import EditCafe from "./EditCafe";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./styles/Cafe.module.css";
import Card from "../common/Card";
import Header from "../common/Header";
import AddCafe from "./AddCafe";
import ShowImage from "../common/ShowImage";
import CafeService from "./services/cafe.service";
import CONSTANTS from "../common/constants/actions";

const Cafe = () => {
  const [addMode, setAddMode] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [displayDialog, setDisplayDialog] = useState(false);
  const [editData, setEditData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cafe = useSelector((state) => state.cafe.data);

  // to get url params
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const locationParams = params.get("location");
  const nameParams = params.get("name");

  useEffect(() => {
    console.log("name:", nameParams, " location:", locationParams);

    if (nameParams && locationParams) {
      console.log("here, find by name and location only");
      // GetCafeByNameAndLocation();
      return;
    }

    if (nameParams && !locationParams) {
      console.log("here, find by name only");
      GetCafeByName(nameParams);
      return;
    }

    if (!nameParams && locationParams) {
      console.log("here, find by location only");
      GetCafeByLocation(locationParams);
      return;
    }

    // GetEmployee();
    GetCafe();
  }, []);

  const GetCafe = useCallback((stopEmitToast) => {
    CafeService.fetchCafe().then((res) => {
      console.log(res.data);
      dispatch(cafeActions.add(res.data));
    });
    if (!stopEmitToast) {
      setShowSnack(true);
      setSnackMessage("Succesfully fetched cafe information");
    }
  }, []);

  const GetCafeByLocation = useCallback((locationParams) => {
    CafeService.fetchCafeByLocation(locationParams).then((res) => {
      console.log(res.data);
      dispatch(cafeActions.add(res.data));
    });
  });

  const GetCafeByName = useCallback((nameParams) => {
    CafeService.fetchCafeByCafeName(nameParams).then((res) => {
      console.log(res.data);
      dispatch(cafeActions.add(res.data));
    });
  });

  const DeleteCafe = useCallback((id) => {
    CafeService.deleteCafeById(id).then((res) => {
      closeDialog();
      setShowSnack(true);
      setSnackMessage("Succesfully deleted Cafe");
      GetCafe(true);
    });
  }, []);

  const addNewCafe = useCallback(() => {
    setAddMode(true);
  }, []);

  const returnToCafe = useCallback((getAllData) => {
    setEditData([]);
    setEditMode(false);
    setAddMode(false);

    if (getAllData) {
      GetCafe(true);
    }
  }, []);

  const editRow = useCallback((value) => {
    setEditData(value.data);
    setEditMode(true);
  }, []);

  const deleteRow = useCallback((value) => {
    console.log(value.data);
    setDeleteData(value.data);
    openDialog();
  }, []);

  const closeDialog = useCallback(() => {
    setDeleteData({});
    setDisplayDialog(false);
  }, []);

  const openDialog = useCallback(() => {
    setDisplayDialog(true);
  }, []);

  const openEmployee = useCallback((event) => {
    const { employees, name, location } = event.data;
    if (employees <= 0) {
      setShowSnack(true);
      setSnackMessage("This cafe does not have any employees");
      return;
    }
    navigate(`/employee?name=${name}&location=${location}`);
    return;
  }, []);

  const openEmployeeByName = useCallback((event) => {
    const { employees, name, location } = event.data;
    if (employees <= 0) {
      setShowSnack(true);
      setSnackMessage("This cafe does not have any employees");
      return;
    }
    navigate(`/employee?name=${name}`);
    return;
  }, []);

  const openEmployeeByLocation = useCallback((event) => {
    const { employees, name, location } = event.data;
    if (employees <= 0) {
      setShowSnack(true);
      setSnackMessage("This cafe does not have any employees");
      return;
    }
    navigate(`/employee?location=${location}`);
    return;
  }, []);

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

  const ImageComponent = (value) =>
    useMemo(() => {
      return <ShowImage blobImage={value.data.logo} />;
    }, []);

  const columns = useMemo(
    () => [
      {
        headerName: "UUID",
        field: "id",
      },
      {
        headerName: "Name",
        field: "name",
        onCellClicked: (event) => {
          openEmployeeByName(event);
        },
      },
      { headerName: "Description", field: "description" },
      { headerName: "Logo", field: "logo", cellRenderer: ImageComponent },
      {
        headerName: "Location",
        field: "location",
        onCellClicked: (event) => {
          openEmployeeByLocation(event);
        },
      },
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
    ],
    []
  );

  if (addMode) {
    return <AddCafe returnToCafe={returnToCafe} action={CONSTANTS.CREATE} />;
  }

  if (editMode) {
    return (
      <EditCafe
        editData={editData}
        returnToCafe={returnToCafe}
        action={CONSTANTS.UPDATE}
      />
    );
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
      <Button className={styles.returnButton} onClick={() => GetCafe()}>
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
          <Button onClick={() => DeleteCafe(deleteData.id)}>Agree</Button>
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
