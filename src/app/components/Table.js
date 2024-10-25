import React from "react";

const Table = ({ columns, renderRow, data }) => {
  return (
    <table className="mx-2 w-[99%]">
      <thead>
        <tr className="sticky top-0 z-10 bg-primary_blue text-left text-sm text-gray-500">
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
