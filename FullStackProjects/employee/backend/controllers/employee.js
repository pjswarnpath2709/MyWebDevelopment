const Employee = require("../models/employee");
const {
  throwError,
  errorMessage,
  setDefaultStatus,
} = require("../utils/error");

exports.getAllEmployee = async (req, res, next) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const employees = await Employee.find().sort({ createdAt: -1 });
    if (!employees) {
      throw throwError(errorMessage.EmployeeNotFound);
    }
    res.status(200).json({
      message: "employees fetched",
      totalEmployees: totalEmployees,
      employees: employees,
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      throw throwError(errorMessage.EmployeeNotFound);
    }

    res.status(200).json({
      message: "employee found",
      employee: employee._doc,
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const employee = new Employee(req.body);

    await employee.validate();

    await employee.save();

    res.status(200).json({
      message: "employee created",
      employee: employee._id,
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const updateHelper = (data, dataField, employeeObj) => {
      if (data) {
        employeeObj[dataField] !== data && (employeeObj[dataField] = data);
      }
    };
    const { employeeId } = req.params;
    const { name, address, age, department, status } = req.body;

    const employee = await Employee.findById(employeeId);

    updateHelper(name, "name", employee);
    updateHelper(address, "address", employee);
    updateHelper(age, "age", employee);
    updateHelper(department, "department", employee);
    updateHelper(status, "status", employee);

    await employee.save();
    res.status(201).json({
      message: "update successful",
      employee: employee._doc,
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      throw throwError(errorMessage.EmployeeNotFound);
    }
    await employee.deleteOne();
    res.status(200).json({
      message: "employee deleted",
      employee: employee._doc,
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const departmentNames = await Employee.distinct("department");

    const departmentData = await Promise.all(
      departmentNames.map(async (department) => {
        const departmentCount = await Employee.countDocuments({ department });
        return {
          department,
          departmentCount,
        };
      })
    );

    const statusNames = await Employee.distinct("status");

    const statusData = await Promise.all(
      statusNames.map(async (status) => {
        const statusCount = await Employee.countDocuments({ status });
        return {
          status,
          statusCount,
        };
      })
    );

    res.status(200).json({
      message: "data fetched",
      data: {
        totalEmployees,
        departmentData,
        statusData,
      },
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};
