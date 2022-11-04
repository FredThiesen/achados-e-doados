import React, { createContext, useState, useEffect } from "react"

// user context
import { User } from "../Interfaces/User"

interface UserContextProps {
	user: User | null
	setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextProps | null>(null)

// create context provider

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const user = localStorage.getItem("user")
		if (user) {
			setUser(JSON.parse(user))
		}
	}, [])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}
