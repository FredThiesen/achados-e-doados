import axios from "axios"
import https from "https"

export const url = "http://152.67.54.228:8081/api"

export const axiosRequest = axios.create({
	baseURL: `${url}/`,
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		"Content-Type": "application/json",
	},
	httpsAgent: new https.Agent({
		rejectUnauthorized: false,
	}),
})
