import React, { useState, useRef } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";

import styles from "./styles/Employee.module.css";
import Card from "../common/Card";
import Header from "../common/Header";
import Form from "../common/Form";
import TextBox from "../common/TextBox";

const AddEmployee = ({ returnToEmployee }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const genderRef = useRef();
  const cafeNameRef = useRef();
  const locationRef = useRef();

  const create = () => {
    console.log("create");
  };

  return (
    <>
      <Card>
        <Header>Employee Creation Page</Header>
        <Form>
          <TextBox label="Name" ref={nameRef} />
          <br />
          <TextBox label="Email Address" ref={emailRef} />
          <br />
          <TextBox label="Phone Number" ref={phoneNumberRef} />
          <br />
          <TextBox label="Gender" ref={genderRef} />
          <br />
          <TextBox label="Cafe Name" ref={cafeNameRef} />
          <br />
          <TextBox label="Location" ref={locationRef} />
        </Form>
        <br />
        <br />
        <Button
          className={styles.returnButton}
          onClick={() => returnToEmployee()}
        >
          Go back
        </Button>
        <Button className={styles.returnButton} onClick={() => create()}>
          Create Employee
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

export default AddEmployee;
