const convertDatas = (tempData, labels) => {
  let arr = [];
  if (tempData) {
    for (let i = 0; i < tempData.length; i++) {
      arr.push({ x: labels[i], y: tempData[i] });
    }
  }
  return arr;
};

export default convertDatas;
