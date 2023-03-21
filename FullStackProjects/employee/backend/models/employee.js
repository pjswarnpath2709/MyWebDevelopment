const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Remote Location", "Contract Employee", "Full-Time"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.path("age").validate(function (age) {
  return age > 0 && age <= 100;
}, "Entered age is not valid");

module.exports = mongoose.model("Employee", employeeSchema);
