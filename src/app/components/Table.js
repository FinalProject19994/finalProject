import React from "react";

const Table = ({ columns, renderRow, data }) => {
  return (
    <table className="mt-4 w-full">
      <thead>
        <tr className="sticky top-0 z-10 bg-white text-left text-sm text-gray-500">
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
