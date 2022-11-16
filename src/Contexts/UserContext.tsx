import React, { createContext, useState, useEffect } from "react"
import { isNil, isObject } from "lodash"
// user context
import { User } from "../Interfaces/User"

interface UserContextProps {
	user: User | null
	token: string | null
	setUser: (user: User | null) => void
	setToken: (token: string | null) => void
}

export const UserContext = createContext<UserContextProps | null>(null)

// create context provider

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [token, setToken] = useState<string | null>(null)

	useEffect(() => {
		try {
			const localUser = localStorage.getItem("user")
			const localToken = localStorage.getItem("token")
			if (!isNil(localUser)) {
				console.log("user no context", localUser)
				isObject(localUser) && setUser(JSON.parse(localUser))
			}
			if (!isNil(localToken)) {
				console.log("token no context", localToken)
				setToken(localToken)
			}
		} finally {
			console.log("finally context")
		}
	}, [])

	useEffect(() => {
		if (!isNil(user)) {
			localStorage.setItem("user", JSON.stringify(user))
		}
		if (isNil(user)) {
			setToken(null)
		}
	}, [user])

	useEffect(() => {
		if (!isNil(token)) {
			localStorage.setItem("token", token || "")
		}
	}, [token])

	return (
		<UserContext.Provider value={{ user, token, setUser, setToken }}>
			{children}
		</UserContext.Provider>
	)
}
