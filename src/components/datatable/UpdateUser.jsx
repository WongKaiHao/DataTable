import { editUser } from "apis/userApi";
import Modal from "components/shared/Modal";
import { useUsers } from "hooks/useUsers";
import React, { useState } from "react";

const UpdateUser = ({ user }) => {
	const { setUsers } = useUsers();
	const [userEditted, setUserEditted] = useState(user);
	const [isEditMode, setIsEditMode] = useState(false);
	const [contactType, setContactType] = useState(() => {
		if (userEditted["contactInfo"] === "") {
			return "Contact Info";
		}
		if (isNaN(parseInt(userEditted["contactInfo"]))) {
			return "Email";
		} else {
			return "Phone";
		}
	});
	const clickHandler = () => {
		setIsEditMode((prevMode) => {
			return !prevMode;
		});
	};

	const updateUserHandler = async (e) => {
		e.preventDefault();

		if (isNaN(parseInt(userEditted.contactInfo))) {
			userEditted["contactTyp"] = "E";
		} else {
			userEditted["contactTyp"] = "M";
		}

		if (
			userEditted["contactTyp"] === "E" &&
			!userEditted["contactInfo"].includes("@")
		) {
			alert("Incorrect Email Format");
			clickHandler();
			return;
		} else if (
			userEditted["contactTyp"] === "M" &&
			userEditted["contactInfo"].length < 10
		) {
			alert("Incorrect Mobile Format");
			clickHandler();
			return;
		}

		const updatedUser = await editUser(user.id, userEditted);
		setUsers((prevUsers) => {
			return prevUsers.map((userEdit) => {
				if (userEdit.id === user.id) {
					return updatedUser;
				}
				return userEdit;
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
					backgroundColor: "#f0ad4e",
					color: "white",
					borderRadius: "5px",
					marginRight: "5px",
				}}
				onClick={clickHandler}
			>
				Edit
			</button>
			{isEditMode && (
				<Modal>
					<h2 style={{ textAlign: "center" }}>Update User</h2>
					<form style={{ textAlign: "center" }} onSubmit={updateUserHandler}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<label htmlFor="name">Name</label>
							<br />
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Name"
								style={{
									width: "94%",
									padding: "10px",
									margin: "5px 0",
									border: "1px solid #ccc",
									borderRadius: "5px",
								}}
								value={userEditted.name}
								required
								onChange={(e) =>
									setUserEditted({ ...userEditted, name: e.target.value })
								}
							/>
						</div>
						<br />
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<label htmlFor="gender">Gender</label>
							<br />
							<select
								id="gender"
								name="gender"
								style={{
									width: "100%",
									padding: "10px",
									margin: "5px 0",
									border: "1px solid #ccc",
									borderRadius: "5px",
								}}
								value={userEditted.gender}
								required
								onChange={(e) =>
									setUserEditted({ ...userEditted, gender: e.target.value })
								}
							>
								<option value="M">Male</option>
								<option value="F">Female</option>
							</select>
						</div>
						<br />
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<label htmlFor="contactInfo">{contactType}</label>
							<br />
							<input
								type="text"
								id="contactInfo"
								name="contactInfo"
								placeholder="Email or mobile number"
								style={{
									width: "94%",
									padding: "10px",
									margin: "5px 0",
									border: "1px solid #ccc",
									borderRadius: "5px",
								}}
								value={userEditted.contactInfo}
								required
								onChange={(e) => {
									setUserEditted({
										...userEditted,
										contactInfo: e.target.value,
									});

									if (e.target.value === "") {
										setContactType("Contact Info");
										return;
									}
									if (isNaN(parseInt(e.target.value))) {
										setContactType("Email");
									} else {
										setContactType("Phone");
									}
								}}
							/>
						</div>
						<br />
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<label htmlFor="age">Age</label>
							<br />
							<input
								type="number"
								id="age"
								name="age"
								placeholder="Age"
								style={{
									width: "94%",
									padding: "10px",
									margin: "5px 0",
									border: "1px solid #ccc",
									borderRadius: "5px",
								}}
								value={userEditted.age}
								required
								onChange={(e) =>
									setUserEditted({ ...userEditted, age: e.target.value })
								}
							/>
						</div>
						<br />
						<button
							type="submit"
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
							Save Changes
						</button>
						<button
							type="button"
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
					</form>
				</Modal>
			)}
		</>
	);
};

export default UpdateUser;
