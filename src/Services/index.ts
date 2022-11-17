import axios from "axios"

export const url = "https://152.67.54.228/services"

export const axiosRequest = axios.create({
	baseURL: `${url}/`,
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		"Content-Type": "application/json",
	},
})
