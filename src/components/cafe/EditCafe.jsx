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
import Form from "../common/Form";
import Header from "../common/Header";
import TextBox from "../common/TextBox";
import { validateInputForCafeCreation } from "../common/utilities/validation";
import CafeService from "./services/cafe.service";
import CONSTANTS from "../common/constants/actions";
import Image from "../common/Image";

const EditCafe = ({ editData, returnToCafe, action }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [displayDialog, setDisplayDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [iFormData, setIFormData] = useState();

  const descriptionRef = useRef();
  const locationRef = useRef();
  const logoRef = useRef();
  const nameRef = useRef();

  const closeDialog = () => {
    setDisplayDialog(false);
  };

  const confirmDialog = () => {
    setDisplayDialog(false);
    returnToCafe();
  };

  const editCafe = () => {
    const name = nameRef.current.value;
    const location = locationRef.current.value;
    const description = descriptionRef.current.value;

    if (
      name === editData.name &&
      location === editData.location &&
      editData.description === description
    ) {
      setShowSnack(true);
      setSnackMessage("There are no changes to make, please check again");
      return;
    }

    validateInputForCafeCreation(name, description, location)
      .then(() => {
        const cafeObject = {
          id: editData.id,
          name,
          location,
          description,
        };

        updateCafe(cafeObject);
      })
      .catch((err) => {
        if (err.input === "name") {
          nameRef.current.focus();
        }
        if (err.input === "description") {
          descriptionRef.current.focus();
        }
        if (err.input === "location") {
          locationRef.current.focus();
        }
        if (err.input === "logo") {
          logoRef.current.focus();
        }
        setSnackMessage(err.message);
        setShowSnack(true);
      });
  };

  const softReturn = () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const location = locationRef.current.value;

    if (
      action === CONSTANTS.UPDATE &&
      (name !== editData.name ||
        location !== editData.location ||
        editData.description !== description)
    ) {
      setDisplayDialog(true);
    } else {
      returnToCafe();
    }
  };

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

      const formData = new FormData();
      formData.append("image", file);
      setIFormData(formData);

      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  }, []);

  const updateCafe = useCallback(
    (cafeObject) => {
      CafeService.updateCafe(cafeObject)
        .then(() => {
          returnToCafe(true);
        })
        .catch((err) => {
          setSnackMessage(err.response.data);
          setShowSnack(true);
        });
    },
    [returnToCafe]
  );

  return (
    <>
      <Card>
        <Header>Cafe Edit Page</Header>
        <Form>
          <TextBox label="UUID" value={editData.id} disabled={true} />
          <br />
          <TextBox
            type="text"
            label="Name"
            value={editData.name}
            inputRef={nameRef}
          />
          <br />
          <TextBox
            label="Logo"
            type="file"
            InputLabelProps={{ shrink: true }}
            onChange={handleImageChange}
            inputRef={logoRef}
          />
          <br />
          <TextBox
            type="text"
            label="Location"
            value={editData.location}
            inputRef={locationRef}
          />
          <br />
          <TextBox
            type="text"
            label="Description"
            value={editData.description}
            inputRef={descriptionRef}
          />
          <br />
          <Image logo={editData.logo} />
        </Form>
        <br />
        <br />
        <Button className={styles.returnButton} onClick={() => softReturn()}>
          Go back
        </Button>
        <Button className={styles.returnButton} onClick={() => editCafe()}>
          Edit Cafe
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
