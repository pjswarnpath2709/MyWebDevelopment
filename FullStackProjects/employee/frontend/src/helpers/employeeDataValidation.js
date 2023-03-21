export const validateEmployeeData = ({
  name,
  address,
  department,
  status,
  age,
}) => {
  console.log("\x1b[35m", "👉👉👉 name :", name);
  console.log("\x1b[35m", "👉👉👉 department :", department);
  console.log("\x1b[35m", "👉👉👉 address :", address);
  console.log("\x1b[35m", "👉👉👉 status :", status);
  console.log("\x1b[35m", "👉👉👉 age :", age);
  if (
    ![name, address, department, status].every(
      (item) => item && item.length > 0
    ) ||
    !["Full-Time", "Contract Employee", "Remote Location"].includes(status) ||
    age <= 0 ||
    age > 100
  ) {
    return false;
  } else {
    return true;
  }
};
