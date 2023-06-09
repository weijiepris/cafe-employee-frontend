export const validEmailCheck = (email) => {
  //eslint-disable-next-line
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const isInputEmail = (email) => {
  return email.includes("@");
};

export const validNameCheck = (name) => {
  return name.length > 5 && name.length < 11;
};

export const validDescriptionCheck = (description) => {
  return description.length > 0 && description.length < 256;
};

export const validLocationCheck = (location) => {
  return location.length > 0 && location.length < 256;
};

// 8 digits only
export const validContactNumberCheck = (contactNumber) => {
  return /^[89]\d{7}$/.test(contactNumber);
};

export const validateInputForCafeCreation = (
  name,
  description,
  location,
  selectedImage
) => {
  return new Promise((resolve, reject) => {
    if (!validNameCheck(name.trim())) {
      reject({
        input: "name",
        message:
          "Invalid name provided. Must be at least 6 characters and at most 10 characters",
      });
    }
    if (!validDescriptionCheck(description.trim())) {
      reject({
        input: "description",
        message:
          "Invalid description provided. Cannot be empty, and at most 255 characters",
      });
    }
    if (!validLocationCheck(location.trim())) {
      reject({
        input: "location",
        message:
          "Invalid location provided. Cannot be empty, and at most 255 characters",
      });
    }
    if (!selectedImage) {
      reject({
        input: "logo",
        message:
          "Invalid logo provided. Please ensure that image size does not exceed 2mb",
      });
    }
    resolve();
  });
};

export const validateInputForEmployeeCreation = (
  name,
  email,
  phoneNumber,
  gender,
  cafeName,
  location,
  tempDateStart,
  tempDateEnd
) => {
  return new Promise((resolve, reject) => {
    if (!validNameCheck(name.trim())) {
      reject({
        input: "name",
        message:
          "Invalid name provided. Must be at least 6 characters and at most 10 characters",
      });
    }
    if (!validEmailCheck(email)) {
      reject({
        input: "email",
        message: "Invalid email provided.",
      });
    }
    if (!validContactNumberCheck(phoneNumber)) {
      reject({
        input: "phone",
        message:
          "Invalid contact number provided. Starts with 8 or 9, and have 8 digits",
      });
    }
    if (!["m", "f"].includes(gender.toLowerCase())) {
      reject({
        input: "gender",
        message: "Invalid gender provided. Only M or F accepted",
      });
    }

    // check if cafe name and location provided
    if (cafeName || location) {
      if (!validNameCheck(cafeName.trim())) {
        reject({
          input: "cafeName",
          message: "Invalid cafe name provided. Must not be empty",
        });
      }
      if (!validLocationCheck(location.trim())) {
        reject({
          input: "location",
          message: "Invalid location provided. Must not be empty",
        });
      }
      console.log("hereee", tempDateStart);
      if (tempDateStart) {
        const temp_start = new Date(tempDateStart);
        if (isNaN(temp_start.getTime())) {
          reject({
            input: "dateStart",
            message:
              "You have inputted a invalid date, please check and try again",
          });
        }

        if (new Date().getTime() < new Date(tempDateStart).getTime()) {
          reject({
            input: "dateStart",
            message: "Start date cannot be after today",
          });
        }
      }

      // compare date
      if (tempDateEnd) {
        const temp_end = new Date(tempDateEnd);
        if (isNaN(temp_end.getTime())) {
          reject({
            input: "dateEnd",
            message:
              "You have inputted a invalid date, please check and try again",
          });
        }
        if (new Date().getTime() < new Date(tempDateEnd).getTime()) {
          reject({
            input: "dateEnd",
            message: "End date cannot be after today",
          });
        }
        if (
          new Date(tempDateEnd).getTime() < new Date(tempDateStart).getTime()
        ) {
          reject({
            input: "dateEnd",
            message: "End date cannot be before start date",
          });
        }
      }
    }

    resolve();
  });
};
