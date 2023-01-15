const getBoardId = () => {
  return "Board" + Math.random() * 1000 + "" + Date.now();
};

const getCardId = () => {
  return "Card" + Math.random() * 2000 + "" + Date.now();
};

const getUniqueKey = (elementName) => {
  return elementName + Math.random() * 2000 + "" + Date.now();
};

export { getBoardId, getCardId, getUniqueKey };
