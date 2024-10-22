// src/components/Dashboard/Table.js
import React from "react";
import { useTable, usePagination } from "react-table";

const Table = ({ data, columns, title, isLoading }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // Default to first page, 5 rows per page
    },
    usePagination
  );

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition mt-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{title}</h2>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">Loading...</div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">No data available</div>
      ) : (
        <table {...getTableProps()} className="w-full table-auto">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, colIndex) => (
                  <th
                    key={colIndex}
                    {...column.getHeaderProps()}
                    className="px-4 py-2 text-left text-gray-800 dark:text-white border-b dark:border-gray-700"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  key={rowIndex}
                  {...row.getRowProps()}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={previousPage}
          disabled={!canPreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page <strong>{pageIndex + 1}</strong>
        </span>
        <button
          onClick={nextPage}
          disabled={!canNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
