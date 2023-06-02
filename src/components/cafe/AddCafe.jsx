import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import styles from "./styles/Cafe.module.css";
import Card from "../common/Card";
import CafeService from "./services/cafe.service";
import CONSTANTS from "../common/constants/actions";
import Form from "../common/Form";
import Header from "../common/Header";
import TextBox from "../common/TextBox";
import { validateInputForCafeCreation } from "../common/utilities/validation";

const AddCafe = ({ action, returnToCafe }) => {
  const [displayDialog, setDisplayDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const nameRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();
  const logoRef = useRef();

  const closeDialog = useCallback(() => {
    setDisplayDialog(false);
  }, []);

  const confirmDialog = useCallback(() => {
    setDisplayDialog(false);
    returnToCafe();
  }, [returnToCafe]);

  const CreateCafe = useCallback(
    (formData) => {
      CafeService.createCafe(formData)
        .then((res) => {
          returnToCafe(true);
        })
        .catch((err) => {
          setShowSnack(true);
          setSnackMessage(err.response.data);
        });
    },
    [returnToCafe]
  );

  const create = useCallback(() => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const location = locationRef.current.value;

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
      })
      .catch((err) => {
        if (err.input === "name") {
          nameRef.current.focus();
          setSnackMessage(err.message);
        } else if (err.input === "description") {
          descriptionRef.current.focus();
          setSnackMessage(err.message);
        } else if (err.input === "location") {
          locationRef.current.focus();
          setSnackMessage(err.message);
        }
        setShowSnack(true);
      });
  }, [selectedImage]);

  const handleImageChange = useCallback((event) => {
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
  }, []);

  const softReturn = useCallback(() => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const location = locationRef.current.value;

    if (action === CONSTANTS.CREATE && (name || description || location)) {
      setDisplayDialog(true);
    } else {
      returnToCafe();
    }
  }, [action, returnToCafe]);

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
        <Button className={styles.returnButton} onClick={create}>
          Create Cafe
        </Button>
        <Button className={styles.returnButton} onClick={softReturn}>
          Go back
        </Button>
      </Card>

      <Dialog open={displayDialog} onClose={closeDialog}>
        <DialogTitle>{"There are some unsaved changes"}</DialogTitle>
        <DialogContent>Do you wish to continue?</DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Disagree</Button>
          <Button onClick={confirmDialog}>Agree</Button>
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
