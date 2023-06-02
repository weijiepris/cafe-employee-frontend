import React, { useState, useRef } from "react";
import { Button, TextField, Snackbar, Alert } from "@mui/material";

import styles from "./styles/Cafe.module.css";
import Card from "../common/Card";
import Header from "../common/Header";
import Form from "../common/Form";
import TextBox from "../common/TextBox";

const AddCafe = ({ returnToCafe }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const nameRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();

  const create = () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const location = locationRef.current.value;
    console.log(name, description, location);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check file extension
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.test(file.name)) {
        setShowSnack(true);
        setSnackMessage(
          "Invalid file format. Only JPG, JPEG, PNG, and GIF files are allowed."
        );
        setSelectedImage(null);
        return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setShowSnack(true);
        setSnackMessage("File size exceeds the maximum limit of 2MB.");
        setSelectedImage(null);
        return;
      }

      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <>
      <Card>
        <Header>Cafe Creation Page</Header>
        <Form>
          <TextBox label="Name" inputRef={nameRef} />
          <br />
          <TextBox label="Description" inputRef={descriptionRef} />
          <br />
          <TextBox
            label="Logo"
            type="file"
            InputLabelProps={{ shrink: true }}
            onChange={handleImageChange}
          />
          <br />
          <TextBox label="Location" inputRef={locationRef} />
          <br />
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              width={"150px"}
              height={"150px"}
            />
          )}
        </Form>
        <br />
        <br />
        <Button className={styles.returnButton} onClick={() => returnToCafe()}>
          Go back
        </Button>
        <Button className={styles.returnButton} onClick={() => create()}>
          Create Cafe
        </Button>
      </Card>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnack}
        autoHideDuration={5000}
        onClose={() => {
          setShowSnack(false);
        }}
      >
        <Alert severity="info">{snackMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default AddCafe;
