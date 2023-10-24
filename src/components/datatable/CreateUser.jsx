import { createUser } from "apis/userApi";
import Modal from "components/shared/Modal";
import { useUsers } from "hooks/useUsers";
import React, { useEffect, useState } from "react";

const CreateUser = () => {
	const { setUsers } = useUsers();
	const [isCreateMode, setIsCreateMode] = useState(false);
	const [contactType, setContactType] = useState("Contact Info");

	const [seconds, setSeconds] = useState(0);
	useEffect(() => {
		const intervalId = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			} else {
				if (seconds === 0) {
					clearInterval(intervalId);
				}
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [seconds]);

	const clickHandler = () => {
		setIsCreateMode((prevMode) => {
			return !prevMode;
		});
	};

	const newUserSubmitHadler = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		const userData = {};
		formData.forEach((value, key) => {
			userData[key] = value;
		});

		if (isNaN(parseInt(userData["contactInfo"]))) {
			userData["contactTyp"] = "E";
		} else {
			userData["contactTyp"] = "M";
		}

		if (
			userData["contactTyp"] === "E" &&
			!userData["contactInfo"].includes("@")
		) {
			alert("Incorrect Email Format");
			clickHandler();
			return;
		} else if (
			userData["contactTyp"] === "M" &&
			userData["contactInfo"].length < 10
		) {
			alert("Incorrect Mobile Format");
			clickHandler();
			return;
		}

		const newUser = await createUser(userData);
		setUsers((prevUsers) => [...prevUsers, newUser]);
		setSeconds(15);
		clickHandler();
	};

	return (
		<>
			<button
				style={{
					fontWeight: "bold",
					padding: "8px 16px", // Increase padding for better clickability
					cursor: "pointer",
					border: "none",
					backgroundColor: "#5bc0de",
					color: "white",
					borderRadius: "5px",
					marginRight: "5px",
				}}
				disabled={seconds !== 0}
				onClick={clickHandler}
			>
				{seconds !== 0 ? `${seconds}(s) left` : "Add +"}
			</button>
			{isCreateMode && (
				<Modal>
					<h2 style={{ textAlign: "center" }}>Add New User</h2>
					<form style={{ textAlign: "center" }} onSubmit={newUserSubmitHadler}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<label htmlFor="name">Name</label>
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
								required
							/>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<label htmlFor="gender">Gender</label>
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
							>
								<option value="M">Male</option>
								<option value="F">Female</option>
							</select>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<label htmlFor="contactInfo">{contactType}</label>
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
								required
								onChange={(e) => {
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
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<label htmlFor="age">Age</label>
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
								required
							/>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
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
								Add User
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
						</div>
					</form>
				</Modal>
			)}
		</>
	);
};

export default CreateUser;
