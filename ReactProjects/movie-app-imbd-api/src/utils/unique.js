const getUniqueKey = (startString) => {
  return startString + "_" + Date.now() + Math.floor(Math.random() * 20000);
};

export default getUniqueKey;
