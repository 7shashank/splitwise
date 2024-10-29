const bufferToArray = (buffer) => {
  const jsonString = buffer.toString();
  return JSON.parse(jsonString);
};

const arrayToBuffer = (array) => {
  const jsonString = JSON.stringify(array);
  return Buffer.from(jsonString);
};

module.exports = { bufferToArray, arrayToBuffer };
