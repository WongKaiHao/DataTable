import { removeUser } from "apis/userApi";
import Modal from "components/shared/Modal";
import { useUsers } from "hooks/useUsers";
import React, { useState } from "react";

const DeleteUser = ({ userDeleted }) => {
	const { setUsers } = useUsers();
	const [isDeleteMode, setIsDeleteMode] = useState(false);
	const clickHandler = () => {
		setIsDeleteMode((prevMode) => {
			return !prevMode;
		});
	};

	const confirmDelete = async () => {
		await removeUser(userDeleted);
		setUsers((prevUsers) => {
			return prevUsers.filter((user) => {
				return user.id !== userDeleted;
			});
		});
		clickHandler();
	};

	return (
		<>
			<button
				style={{
					fontWeight: "bold",
					padding: "8px 16px",
					cursor: "pointer",
					border: "none",
					backgroundColor: "#d9534f",
					color: "white",
					borderRadius: "5px",
					marginRight: "5px",
				}}
				onClick={clickHandler}
			>
				Delete
			</button>
			{isDeleteMode && (
				<Modal>
					<h2 style={{ textAlign: "center" }}>Confirm Delete</h2>
					<p style={{ textAlign: "center" }}>
						Are you sure you want to delete this user?
					</p>
					<div style={{ textAlign: "center" }}>
						<button
							onClick={confirmDelete}
							style={{
								cursor: "pointer",
								border: "none",
								backgroundColor: "#5cb85c",
								width: "48%",
								padding: "10px 0",
								borderRadius: "5px",
								color: "white",
							}}
						>
							Confirm
						</button>
						<button
							onClick={clickHandler}
							style={{
								cursor: "pointer",
								border: "none",
								backgroundColor: "#d9534f",
								width: "48%",
								padding: "10px 0",
								borderRadius: "5px",
								color: "white",
							}}
						>
							Cancel
						</button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default DeleteUser;
