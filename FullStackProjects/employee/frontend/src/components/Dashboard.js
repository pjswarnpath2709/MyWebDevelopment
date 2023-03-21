import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-50 gap-3">
      <div className="bg-black w-full text-white text-2xl py-3 px-4 ">
        Dashboard
      </div>
      <NavLink
        to="/"
        // activeClassName="bg-gray-900 text-white rounded-md"
        className="px-4 py-2 rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-200"
      >
        Table
      </NavLink>
      <NavLink
        to="/create"
        // activeClassName="bg-gray-900 text-white rounded-md"
        className="px-4 py-2 rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-200"
      >
        Add new Employee
      </NavLink>
      <NavLink
        to="/analysis"
        // activeClassName="bg-gray-900 text-white rounded-md"
        className="px-4 py-2 rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-200"
      >
        Analysis
      </NavLink>
    </div>
  );
};

export default Dashboard;
