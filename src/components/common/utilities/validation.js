export const validEmailCheck = (email) => {
  //eslint-disable-next-line
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username);
};

export const isInputEmail = (email) => {
  return username.includes("@");
};

export const validNameCheck = (name) => {
  return name.length > 6 && name.length < 11;
};

export const validDescriptionCheck = (description) => {
  return description.length > 0 && description.length < 256;
};

// 8 digits only
export const validContactNumberCheck = (contactNumber) => {
  return /^[89]\d{7}$/.test(contactNumber);
};
