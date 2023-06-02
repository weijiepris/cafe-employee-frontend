import React, { useState } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";

import styles from "./styles/Employee.module.css";
import Card from "../common/Card";
import Header from "../common/Header";
import Form from "../common/Form";

const EditEmployee = ({ editData, returnToEmployee }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const refuseEdit = () => {
    setShowSnack(true);
    setSnackMessage("UUID cannot be changed");
  };

  return (
    <>
      <Card>
        <Header>Employee Edit Page</Header>
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
          <TextField label="Email Address" value={editData.email_address} />
          <br />
          <TextField label="Phone Number" value={editData.phone_number} />
          <br />
          <TextField label="Gender" value={editData.gender} />
          <br />
          <TextField label="Cafe Name" value={editData.cafe_name ?? ""} />
          <br />
          <TextField label="Location" value={editData.cafe_location ?? ""} />
        </Form>
        <br />
        <br />
        <Button
          className={styles.returnButton}
          onClick={() => returnToEmployee()}
        >
          Go back
        </Button>
        <Button
          className={styles.returnButton}
          onClick={() => returnToEmployee()}
        >
          Edit Employee
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

export default EditEmployee;
