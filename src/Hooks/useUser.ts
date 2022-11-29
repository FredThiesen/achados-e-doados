import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"
import { LoginRequest } from "../Interfaces/LoginRequest"
import { LoginResponse } from "../Interfaces/LoginResponse"
import { SignInRequest } from "../Interfaces/SignInRequest"
import { User } from "../Interfaces/User"
import { axiosRequest } from "../Services"

export const useUser = () => {
	const userContext = useContext(UserContext)

	const makeUser = (response: LoginResponse): User => ({
		name: response.name,
		username: response.username,
		address: response.address,
		roles: response.roles,
	})

	// headers: {
	// 	Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 	"Content-Type": "application/json",
	// },

	const login = async (user: LoginRequest) => {
		const resp = await axiosRequest.post(`login`, user)
		if (resp.status === 200) {
			try {
				console.log("response login data", resp.data)
				userContext?.setUser(makeUser(resp.data))
				userContext?.setToken(resp.data.token)
				userContext?.setRefreshToken(resp.data.refreshToken)
				return true
			} catch (err) {
				console.log("login error", err)
				return false
			}
		}
		return false
	}

	const signIn = async (user: SignInRequest) => {
		const resp = await axiosRequest.post(`signin`, user)
		if (resp.status === 201) return true
		return false
	}
	return { login, signIn, user: userContext?.user }
}
