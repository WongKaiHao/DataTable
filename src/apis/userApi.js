import service from "utils/axiosConfig.js";

export const fetchData = async () => {
	try {
		const response = await service.get("/userProfile");
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const createUser = async (data) => {
	try {
		const response = await service.post("/userProfile", data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const editUser = async (id, data) => {
	try {
		const response = await service.put(`/userProfile/${id}`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const removeUser = async (id) => {
	try {
		const response = await service.delete(`/userProfile/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
