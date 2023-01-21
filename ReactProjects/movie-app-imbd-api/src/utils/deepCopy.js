const deepCopy = (object) => {
  return JSON.parse(JSON.stringify(object));
};

export default deepCopy;
