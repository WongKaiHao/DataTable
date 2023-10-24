import { useSearch } from "hooks/useSearch";
import { useUsers } from "hooks/useUsers";
import React, { useMemo, useState, useEffect } from "react";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import Pagination from "components/shared/Pagination";

const Users = () => {
	const { users } = useUsers();
	const [query] = useSearch();

	const itemsPerPage = 5; // Number of items to display per page
	const [currentPage, setCurrentPage] = useState(1);
	const filteredList = useMemo(() => {
		return users.filter((user) => user.name.includes(query));
	}, [query, users]);

	const itemsToDisplay = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return filteredList.slice(startIndex, endIndex);
	}, [filteredList, currentPage, itemsPerPage]);

	const filteredListLength = useMemo(() => filteredList.length, [filteredList]);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// Update the currentPage when the query changes
	useEffect(() => {
		setCurrentPage(1);
	}, [query]);

	return (
    <>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ddd", // Add border to the table
        }}
      >
        <thead>
          <tr style={{ color: "white", backgroundColor: "#04AA6D" }}>
            <th style={tableCellStyle}>ID</th>
            <th style={tableCellStyle}>Name</th>
            <th style={tableCellStyle}>Contact</th>
            <th style={tableCellStyle}>Gender</th>
            <th style={tableCellStyle}>Age</th>
            <th colSpan={2} style={tableCellStyle}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {itemsToDisplay.map((user) => {
            return (
              <tr key={user.id} style={{ color: "black" }}>
                <td style={tableCellStyle}>{user.id}</td>
                <td style={tableCellStyle}>{user.name}</td>
                <td style={tableCellStyle}>{user.contactInfo}</td>
                <td style={tableCellStyle}>
                  {user.gender === "F" ? "Female" : "Male"}
                </td>
                <td style={tableCellStyle}>{user.age}</td>
                <td style={tableCellStyle}>
                  <UpdateUser user={user} />
                </td>
                <td style={tableCellStyle}>
                  <DeleteUser userDeleted={user.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan="7"
              style={{
                color: "white",
                backgroundColor: "#04AA6D",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Total: {users.length}
            </td>
          </tr>
        </tfoot>
      </table>
      <Pagination
        totalItems={filteredListLength}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

const tableCellStyle = {
	padding: "5px",
	border: "1px solid #ddd",
};

export default Users;
