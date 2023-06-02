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

const EditCafe = ({ editData, returnToCafe, action }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [displayDialog, setDisplayDialog] = useState(false);

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
          {/* 
          unsure how to implement this feature, unable to load existing logo onto input
          <TextBox
            label="Logo"
            type="file"
            InputLabelProps={{ shrink: true }}
            onChange={handleImageChange}
            inputRef={logoRef}
            value={editData.logo}
          /> */}
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
