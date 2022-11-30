import axios from "axios"
import { isEmpty } from "lodash"

export const url = "https://timbeck.hopto.org/services"
//export const url = "https://localhost:8080/api"

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
						window.location.reload()
					}
				})
				.catch((e) => {
					console.log("error ao atualizar token", e)
				})
		}
		if(error.response.status===403){
			alert("Você não tem permissão para acessar essa página");
			window.location.href = "/home";
		}
	}

)


