import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cafeActions } from "../../redux/cafeReducer";
import { Stack, Button, TextField, InputLabel } from "@mui/material";
import axios from "axios";
import Table from "../common/Table";

const Cafe = () => {
  const dispatch = useDispatch();
  const cafe = useSelector((state) => state.cafe.data);

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState([]);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const editRow = (value) => {
    console.log(value.data);
    setEditMode(true);
    setEditData(value.data);
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
    { headerName: "Description", field: "description" },
    { headerName: "Logo", field: "logo" },
    { headerName: "Location", field: "location" },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: EditButtonComponent,
    },
  ];

  const fetchCafe = () => {
    console.log("fetching cafe info");
    axios.get("http://localhost:3001/cafes").then((res) => {
      console.log(res.data);
      dispatch(cafeActions.add(res.data));
    });
  };

  useEffect(() => {
    fetchCafe();
  }, []);

  if (editMode) {
    return (
      <>
        <div>Cafe Edit Page</div>
        <form>
          <InputLabel>UUID</InputLabel>
          <TextField value={editData.id} disabled />

          <InputLabel>Name</InputLabel>
          <TextField value={editData.name} />

          <InputLabel>Logo</InputLabel>
          <TextField value={editData.logo ?? ''} />

          <InputLabel>Location</InputLabel>
          <TextField value={editData.location} />

          <InputLabel>Description</InputLabel>
          <TextField value={editData.description} />
        </form>
      </>
    );
  }

  return (
    <>
      <div>Cafe</div>
      <button onClick={() => fetchCafe()}>Fetch Cafe information</button>
      <Table data={cafe} columns={columns} defaultColDef={defaultColDef} />
    </>
  );
};

export default Cafe;
