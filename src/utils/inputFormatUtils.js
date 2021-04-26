import { insertToString } from './Utils';

export const formatLicencePlate = (text) => {
  let customText = text.toUpperCase();
  const regexes = [/^[0-9]{2}[A-Z]{1,2}/g, /\.[0-9]{1}$/g];
  if (customText.length > 4) {
    if (!customText.includes('-') && regexes[0].test(customText)) {
      customText = insertToString(customText, regexes[0].lastIndex, '-');
    }
    let plateNumber = customText.split('-');
    if (customText.includes('-')) {
      const index = plateNumber[0].length + 1 + plateNumber[1].length - 2;
      if (plateNumber[1].length === 5 && !customText.includes('.')) {
        customText = insertToString(customText, index, '.');
      }
    }
  }
  return customText;
};
