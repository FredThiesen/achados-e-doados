import React, { createContext, useState, useEffect } from "react"
import { isNil, isObject } from "lodash"
// user context
import { User } from "../Interfaces/User"

interface UserContextProps {
	user: User | null
	token: string | null
	refreshToken: string | null
	setUser: (user: User | null) => void
	setToken: (token: string | null) => void
	setRefreshToken: (refreshToken: string | null) => void
	dropUser: () => void
}

export const UserContext = createContext<UserContextProps | null>(null)

// create context provider

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [token, setToken] = useState<string | null>(null)
	const [refreshToken, setRefreshToken] = useState<string | null>(null)

	const dropUser = () => {
		setUser(null)
		setToken(null)
		setRefreshToken(null)
		localStorage.removeItem("user")
		localStorage.removeItem("token")
		localStorage.removeItem("refreshToken")
	}

	useEffect(() => {
		try {
			const localUser = localStorage.getItem("user")
			const localToken = localStorage.getItem("token")
			const localRefreshToken = localStorage.getItem("refreshToken")
			if (!isNil(localUser)) {
				!isNil(localUser) &&
					localUser !== "undefined" &&
					setUser(JSON.parse(localUser))
			}
			if (!isNil(localToken)) {
				!isNil(localToken) &&
					localToken !== "undefined" &&
					setToken(localToken)
			}
			if (!isNil(localRefreshToken)) {
				!isNil(localRefreshToken) &&
					localRefreshToken !== "undefined" &&
					setRefreshToken(localRefreshToken)
			}
		} catch (e) {
			console.log("erro no localStore context user", e)
		} finally {
			console.log("finally context")
		}
	}, [])

	useEffect(() => {
		console.log("user no context", user)
		if (!isNil(user)) {
			localStorage.setItem("user", JSON.stringify(user))
		}
		if (isNil(user)) {
			setToken(null)
		}
	}, [user])

	useEffect(() => {
		console.log("token no context", token)
		if (!isNil(token)) {
			localStorage.setItem("token", token || "")
		}
	}, [token])

	useEffect(() => {
		console.log("refreshToken no context", refreshToken)
		if (!isNil(refreshToken)) {
			localStorage.setItem("refreshToken", refreshToken || "")
		}
	}, [refreshToken])

	return (
		<UserContext.Provider
			value={{
				user,
				token,
				setUser,
				setToken,
				refreshToken,
				setRefreshToken,
				dropUser,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
