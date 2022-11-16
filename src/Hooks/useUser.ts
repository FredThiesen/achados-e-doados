//use user hook

import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"
import { LoginRequest } from "../Interfaces/LoginRequest"
import { SignInRequest } from "../Interfaces/SignInRequest"
import { url } from "../Services"

export const useUser = () => {
	const userContext = useContext(UserContext)

	const login = async (user: LoginRequest) => {
		const resp = await axios.post(`${url}/login`, user)
		if (resp.status === 200) {
			try {
				userContext?.setUser(resp.data.user)
				userContext?.setToken(resp.data.access_token)
				return true
			} catch (err) {
				console.log("login error", err)
				return false
			}
		}
		return false
	}

	const signIn = async (user: SignInRequest) => {
		const resp = await axios.post(`${url}/signin`, user)
		if (resp.status === 201) return true
		return false
	}
	return { login, signIn }
}
