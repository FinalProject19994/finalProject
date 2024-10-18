import React from "react";

const Table = ({ columns, renderRow, data }) => {
  return (
    <table className="mt-4 w-full">
      <thead>
        <tr className="text-left text-sm text-gray-500">
          {columns.map((column) => (
            <th key={column.accessor} className={column.className}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
