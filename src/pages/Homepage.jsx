import React from "react";
import Users from "components/datatable/Users";
import { UserProvider } from "hooks/useUsers.js";
import { SearchProvider } from "hooks/useSearch";
import SearchBar from "components/datatable/SearchBar";
import CreateUser from "components/datatable/CreateUser";

const Homepage = () => {
	return (
		<>
			<UserProvider>
				<SearchProvider>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<CreateUser />
						<SearchBar />
					</div>
					<Users />
				</SearchProvider>
			</UserProvider>
		</>
	);
};

export default Homepage;
