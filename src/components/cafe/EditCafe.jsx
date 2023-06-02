import React, { useState } from "react";
import { Button, TextField, Alert, Snackbar } from "@mui/material";

import styles from "./styles/Cafe.module.css";
import Card from "../common/Card";
import Header from "../common/Header";
import Form from "../common/Form";

const EditCafe = ({ editData, returnToCafe }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const refuseEdit = () => {
    setShowSnack(true);
    setSnackMessage("UUID cannot be changed");
  };

  return (
    <>
      <Card>
        <Header>Cafe Edit Page</Header>
        <Form>
          <TextField
            label="UUID"
            value={editData.id}
            contentEditable={false}
            onKeyDown={() => {
              refuseEdit();
            }}
          />
          <br />
          <TextField label="Name" value={editData.name} />
          <br />
          <TextField label="Logo" value={editData.logo ?? ""} />
          <br />
          <TextField label="Location" value={editData.location} />
          <br />
          <TextField label="Description" value={editData.description} />
        </Form>
        <br />
        <br />
        <Button className={styles.returnButton} onClick={() => returnToCafe()}>
          Go back
        </Button>
        <Button className={styles.returnButton} onClick={() => returnToCafe()}>
          Edit Cafe
        </Button>
      </Card>

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
    </>
  );
};

export default EditCafe;
