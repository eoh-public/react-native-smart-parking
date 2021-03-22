export const isValidPhoneNumber = (phoneNumber) => {
  return /(0)+([1-9])+([0-9]{8})\b/.test(phoneNumber);
};

export const isValidateLicencePlate = (plate_number) => {
  const regexes = [
    /^([1-9]\d)[A-Z-]{2,3}[0-9]{4}$/g,
    /^([1-9]\d)[A-Z-]{2,3}[0-9]{3}[.]{1}[0-9]{2}$/g,
  ];
  for (let i = 0; i < regexes.length; i++) {
    if (regexes[i].test(plate_number)) {
      return true;
    }
  }
  return false;
};
