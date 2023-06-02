import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";

import CafeService from "../cafe/services/cafe.service";
import Card from "../common/Card";
import Form from "../common/Form";
import Header from "../common/Header";
import InitCap from "../common/utilities/InitCap";
import TextBox from "../common/TextBox";
import { useDispatch } from "react-redux";
import { validateInputForEmployeeCreation } from "../common/utilities/validation";
import CONSTANTS from "../common/constants/actions";
import EmployeeService from "./services/employee.service";
import styles from "./styles/Employee.module.css";

const EditEmployee = ({ editData, returnToEmployee, action }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [displayDialog, setDisplayDialog] = useState(false);

  const [cafeValue, setCafeValue] = useState("");
  const [locationValue, setLocationValue] = useState("");

  const [cafes, setCafes] = useState([]);
  const [locations, setLocations] = useState([]);

  const dispatch = useDispatch();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const genderRef = useRef();
  const cafeNameRef = useRef();
  const locationRef = useRef();

  useEffect(() => {
    GetAllCafe();
  }, []);

  useMemo(async () => {
    console.log(cafeValue);
    if (cafeValue) {
      const fetchedLocation = await CafeService.fetchCafeByCafeName(
        cafeValue
      ).then((res) => res.data);

      let locationSet = new Set(
        fetchedLocation.map((cafe) => InitCap(cafe.location))
      );
      let locationList = [];

      locationSet.forEach((location) => {
        locationList.push({ location });
      });

      if (editData.location) {
        console.log(locationList);
        setLocationValue(InitCap(editData.location));
      }

      setLocations([...locationList]);
    }
  }, [cafeValue]);

  const GetAllCafe = useCallback(async () => {
    const fetchedCafes = await CafeService.fetchCafe().then((res) => res.data);

    let nameSet = new Set(fetchedCafes.map((cafe) => InitCap(cafe.name)));

    let cafeList = [];

    nameSet.forEach((name) => {
      cafeList.push({ name });
    });

    if (editData.cafe_name) {
      setCafeValue(InitCap(editData.cafe_name));
    }

    setCafes([...cafeList]);
  }, []);

  const closeDialog = () => {
    setDisplayDialog(false);
  };

  const handleCafeChange = (event) => {
    setCafeValue(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationValue(event.target.value);
  };

  const softReturn = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const cafeName = cafeValue;
    const location = locationValue;

    let tempCafeName = cafeName;
    let tempLocation = location;

    if (tempLocation === "") {
      tempLocation = null;
    }
    if (tempCafeName === "") {
      tempCafeName = null;
    }
    if (
      action === CONSTANTS.UPDATE &&
      (name.toLowerCase() !== editData.name.toLowerCase() ||
        email.toLowerCase() !== editData.email_address.toLowerCase() ||
        Number(phoneNumber) !== editData.phone_number ||
        tempCafeName.toLowerCase() !== editData.cafe_name.toLowerCase() ||
        tempLocation.toLowerCase() !== editData.location.toLowerCase())
    ) {
      setDisplayDialog(true);
    } else {
      returnToEmployee();
    }
  };

  const update = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const gender = genderRef.current.value;
    const cafeName = cafeValue;
    const location = locationValue;

    let tempCafeName = cafeName;
    let tempLocation = location;

    if (tempLocation === "") {
      tempLocation = null;
    }
    if (tempCafeName === "") {
      tempCafeName = null;
    }

    if (
      name === editData.name &&
      email === editData.email_address &&
      Number(phoneNumber) === editData.phone_number &&
      gender === editData.gender &&
      tempCafeName === editData.cafe_name &&
      tempLocation === editData.location
    ) {
      setShowSnack(true);
      setSnackMessage("There are no changes to make, please check again");
      return;
    }

    validateInputForEmployeeCreation(
      name,
      email,
      phoneNumber,
      gender,
      cafeName,
      location
    )
      .then(() => {
        const employeeObject = {
          id: editData.id,
          name,
          email_address: email,
          phone_number: Number(phoneNumber),
          gender: gender.toUpperCase(),
          cafe: cafeName,
          location,
        };

        UpdateEmployee(employeeObject);

        returnToEmployee();
        return;
      })
      .catch((err) => {
        if (err.input === "name") {
          nameRef.current.focus();
          setSnackMessage(err.message);
        }
        if (err.input === "email") {
          emailRef.current.focus();
          setSnackMessage(err.message);
        }
        if (err.input === "phone") {
          phoneNumberRef.current.focus();
          setSnackMessage(err.message);
        }
        if (err.input === "gender") {
          genderRef.current.focus();
          setSnackMessage(err.message);
        }
        if (err.input === "cafeName") {
          cafeNameRef.current.focus();
          setSnackMessage(err.message);
        }
        if (err.input === "location") {
          locationRef.current.focus();
          setSnackMessage(err.message);
        }
        setShowSnack(true);
      });
  };

  const UpdateEmployee = useCallback((data) => {
    EmployeeService.updateEmployee(data)
      .then((res) => {
        returnToEmployee(true);
      })
      .catch((err) => {
        setShowSnack(true);
        setSnackMessage(err.response.data);
      });
  }, []);

  return (
    <>
      <Card>
        <Header>Employee Edit Page</Header>
        <Form>
          <TextBox label="UUID" value={editData.id} disabled={true} />
          <br />
          <TextBox label="Name" value={editData.name} inputRef={nameRef} />
          <br />
          <TextBox
            label="Email Address"
            value={editData.email_address}
            inputRef={emailRef}
          />
          <br />
          <TextBox
            label="Phone Number"
            value={editData.phone_number}
            inputRef={phoneNumberRef}
          />
          <br />
          <TextBox
            label="Gender"
            value={editData.gender}
            inputRef={genderRef}
            disabled={true}
          />
          <br />
          <Form>
            <InputLabel id="demo-simple-select-label">Select a Cafe</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cafeValue}
              label="Select a Cafe"
              style={{ textAlign: "left" }}
              onChange={handleCafeChange}
            >
              <MenuItem value={""}>Select a Cafe</MenuItem>
              {cafes.map((c) => (
                <MenuItem key={c.name} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </Form>

          <br />
          <Form>
            <InputLabel id="demo-simple-select-label">
              Select a Location
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={locationValue}
              label="Select a Location"
              style={{ textAlign: "left" }}
              onChange={handleLocationChange}
            >
              <MenuItem value={""}>Select a Location</MenuItem>
              {locations.map((c) => (
                <MenuItem key={c.location} value={c.location}>
                  {c.location}
                </MenuItem>
              ))}
            </Select>
          </Form>
        </Form>
        <br />
        <br />
        <Button className={styles.returnButton} onClick={() => softReturn()}>
          Go back
        </Button>
        <Button className={styles.returnButton} onClick={() => update()}>
          Edit Employee
        </Button>
      </Card>

      <Dialog open={displayDialog} onClose={closeDialog}>
        <DialogTitle>{"There are some unsaved changes"}</DialogTitle>
        <DialogContent>Do you wish continue?</DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Disagree</Button>
          <Button onClick={() => returnToEmployee()}>Agree</Button>
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

export default EditEmployee;
