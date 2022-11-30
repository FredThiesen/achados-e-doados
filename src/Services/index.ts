import axios from "axios"
import { isEmpty } from "lodash"

export const url = "https://timbeck.hopto.org/services"

export const axiosRequest = axios.create({
	baseURL: `${url}/`,
	headers: {
		"Content-Type": "application/json",
	},
})
axiosRequest.defaults.headers.authorization = `Bearer ${localStorage.getItem(
	"token"
)}`

axiosRequest.interceptors.response.use(
	function (response) {
		return response
	},
	function (error) {
		//se cair nesse erro é pq o token expirou
		if (error.response.status === 419) {
			axiosRequest
				.get(`/token/refreshtoken`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"refreshToken"
						)}`,
					},
				})
				.then((resp) => {
					if (!isEmpty(resp.data)) {
						localStorage.setItem("token", resp.data.access_token)
						localStorage.setItem(
							"refreshToken",
							resp?.data?.refresh_token || ""
						)
						axiosRequest.defaults.headers.authorization = `Bearer ${resp.data.access_token}`
					}
				})
				.catch((e) => {
					console.log("error ao atualizar token", e)
				})
		}
	}
)
