import axios from "axios"

export const url = "https://timbeck.hopto.org/services"

export const axiosRequest = axios.create({
	baseURL: `${url}/`,
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		"Content-Type": "application/json",
	},
})
