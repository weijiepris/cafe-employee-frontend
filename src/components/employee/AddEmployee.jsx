import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

import styles from "./styles/Employee.module.css";
import Card from "../common/Card";
import Header from "../common/Header";
import Form from "../common/Form";
import TextBox from "../common/TextBox";
import { validateInputForEmployeeCreation } from "../common/utilities/validation";
import CONSTANTS from "../common/constants/actions";
import EmployeeService from "./services/employee.service";
import CafeService from "../cafe/services/cafe.service";
import InitCap from "../common/utilities/InitCap";

const AddEmployee = ({ returnToEmployee, action }) => {
  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [displayDialog, setDisplayDialog] = useState(false);
  const [radioValue, setRadioValue] = useState("M");
  const [cafeValue, setCafeValue] = useState("");
  const [locationValue, setLocationValue] = useState("");

  const [cafes, setCafes] = useState([]);
  const [locations, setLocations] = useState([]);

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

      console.log(fetchedLocation);

      let locationSet = new Set(
        fetchedLocation.map((cafe) => InitCap(cafe.location))
      );
      let locationList = [];

      locationSet.forEach((location) => {
        locationList.push({ location });
      });

      console.log(locationList);

      setLocations([...locationList]);
    }
  }, [cafeValue]);

  const closeDialog = () => {
    setDisplayDialog(false);
  };

  const GetAllCafe = useCallback(async () => {
    const fetchedCafes = await CafeService.fetchCafe().then((res) => res.data);

    let nameSet = new Set(fetchedCafes.map((cafe) => InitCap(cafe.name)));

    let cafeList = [];

    nameSet.forEach((name) => {
      cafeList.push({ name });
    });

    setCafes([...cafeList]);
  }, []);

  const create = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const gender = radioValue;
    const cafeName = cafeValue;
    const location = locationValue;
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
          name,
          email_address: email,
          phone_number: Number(phoneNumber),
          gender: radioValue,
          cafe: cafeName,
          location,
        };

        CreateEmployee(employeeObject);
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

  const softReturn = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;
    const gender = radioValue;
    const cafeName = cafeValue;
    const location = locationValue;

    if (
      action === CONSTANTS.CREATE &&
      (name ||
        email ||
        phoneNumber ||
        gender !== "M" ||
        cafeName !== "" ||
        location !== "")
    ) {
      setDisplayDialog(true);
    } else {
      returnToEmployee();
    }
  };

  const CreateEmployee = useCallback((data) => {
    EmployeeService.createEmployee(data)
      .then(() => {
        setShowSnack(true);
        setSnackMessage("Successfully created Employee");
        returnToEmployee(true);
      })
      .catch((err) => {
        setShowSnack(true);
        setSnackMessage(err.response.data);
      });
  }, []);

  const confirmDialog = () => {
    setDisplayDialog(false);
    returnToEmployee();
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleCafeChange = (event) => {
    setCafeValue(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationValue(event.target.value);
  };

  return (
    <>
      <Card>
        <Header>Employee Creation Page</Header>
        <Form>
          <TextBox label="Name" inputRef={nameRef} />
          <br />
          <TextBox label="Email Address" inputRef={emailRef} />
          <br />
          <TextBox label="Phone Number" inputRef={phoneNumberRef} />
          <br />

          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="radio-buttons-group"
            defaultValue="M"
            value={radioValue}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="F" control={<Radio />} label="Female" />
          </RadioGroup>

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
        <Button className={styles.returnButton} onClick={() => create()}>
          Create Employee
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

export default AddEmployee;
