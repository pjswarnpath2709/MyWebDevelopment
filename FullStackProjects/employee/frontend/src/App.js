import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analysis from "./Pages/Analysis";
import Dashboard from "./components/Dashboard";
import MyForm from "./Pages/MyForm";
import TableComponent from "./Pages/TableComponent";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-row ">
        <div className="border border-black">
          <Dashboard />
        </div>

        <div className="right-content grow h-screen scrollbar">
          <Routes>
            <Route path="/" element={<TableComponent />} />
            <Route
              path="/create"
              element={
                <div className="h-screen flex justify-center items-center">
                  <MyForm />
                </div>
              }
            />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
