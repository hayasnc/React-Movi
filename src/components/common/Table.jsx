import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./table_body";

const Table = ({ data, columns, onSort, sortColumn }) => {
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        onSort={onSort}
        sortColumn={sortColumn}
      ></TableHeader>
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
