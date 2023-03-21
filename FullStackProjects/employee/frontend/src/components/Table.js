import React from "react";
import { useDispatch } from "react-redux";

const TableHead = ({ columns }) => {
  return (
    <thead className="sticky top-0">
      <tr>
        {columns.map((column) => {
          return (
            <th key={column} className="border px-4 py-2 bg-black text-white">
              {column}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const TableRow = ({ rowData, columns, handleClick }) => {
  const renderRow = columns.map((item) => {
    return (
      <td key={rowData._id + item} className="border px-4 py-2">
        {rowData[item.toLowerCase()]}
      </td>
    );
  });
  return (
    <tr
      className="cursor-pointer hover:bg-gray-100"
      onClick={() => handleClick(rowData._id)}
    >
      {renderRow}
    </tr>
  );
};

const Table = ({ columns, rows, handleClick }) => {
  return (
    <table className="table-auto w-full">
      <TableHead columns={columns} />
      <tbody>
        {rows.map((rowData) => (
          <TableRow
            key={rowData._id}
            columns={columns}
            rowData={rowData}
            handleClick={handleClick}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
