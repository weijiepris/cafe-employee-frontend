import React, { useState, useRef, useCallback } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

import styles from "./styles/Cafe.module.css";
import Card from "../common/Card";
import Header from "../common/Header";
import Form from "../common/Form";
import TextBox from "../common/TextBox";
import { validateInputForCafeCreation } from "../common/utilities/validation";
import CONSTANTS from "../common/constants/actions";
import CafeService from "./services/cafe.service";

const AddCafe = ({ returnToCafe, action }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [displayDialog, setDisplayDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const nameRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();
  const logoRef = useRef();

  const create = () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const location = locationRef.current.value;
    // const logo = logoRef.current.value;

    validateInputForCafeCreation(name, description, location, selectedImage)
      .then(() => {
        const formData = new FormData();
        if (selectedImage) {
          const blobImage = new Blob([selectedImage], {
            type: selectedImage.type,
          });

          try {
            formData.append("image", blobImage, "image.jpg");
          } catch (err) {
            setSnackMessage(
              "An unexpected error occurred, please refresh the page and try again."
            );
            setShowSnack(true);
          }
        }

        formData.append("name", name);
        formData.append("description", description);
        formData.append("location", location);

        CreateCafe(formData);
        return;
      })
      .catch((err) => {
        if (err.input === "name") {
          nameRef.current.focus();
          setSnackMessage(err.message);
        }
        if (err.input === "description") {
          descriptionRef.current.focus();
          setSnackMessage(err.message);
        }
        if (err.input === "location") {
          locationRef.current.focus();
          setSnackMessage(err.message);
        }
        // if (err.input === "logo") {
        //   logoRef.current.focus();
        //   setSnackMessage(err.message);
        // }
        setShowSnack(true);
      });
  };

  const CreateCafe = useCallback((formData) => {
    CafeService.createCafe(formData)
      .then((res) => {
        returnToCafe(true);
      })
      .catch((err) => {
        setShowSnack(true);
        setSnackMessage(err.response.data);
      });
  }, []);

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

  const softReturn = () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const location = locationRef.current.value;

    if (action === CONSTANTS.CREATE && (name || description || location)) {
      setDisplayDialog(true);
    } else {
      returnToCafe();
    }
  };

  const closeDialog = () => {
    setDisplayDialog(false);
  };

  const confirmDialog = () => {
    setDisplayDialog(false);
    returnToCafe();
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
            inputRef={logoRef}
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
        <Button className={styles.returnButton} onClick={() => softReturn()}>
          Go back
        </Button>
        <Button className={styles.returnButton} onClick={() => create()}>
          Create Cafe
        </Button>
      </Card>

      <Dialog open={displayDialog} onClose={closeDialog}>
        <DialogTitle>{"There are some unsaved changes"}</DialogTitle>
        <DialogContent>Do you wish continue?</DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Disagree</Button>
          <Button onClick={() => confirmDialog()}>Agree</Button>
        </DialogActions>
      </Dialog>

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
