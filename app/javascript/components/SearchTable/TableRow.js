import React from "react";

function TableRow({ row, headers }) {
  return (
    <tr>
      {headers.map((col, index) => {
        return (
          <td key={index} className="fs-4">
            {col.isUrl && row[col.val] !== "" ? (
              <a href={row[col.val]}>{col.placeholder}</a>
            ) : (
              row[col.val]
            )}
          </td>
        );
      })}
    </tr>
  );
}

export default TableRow;
