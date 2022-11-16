import React, { useEffect, useState } from "react"
import { User } from "../../Interfaces/User"
import { axiosRequest } from "../../Services"
import { Title } from "../AuthLogin/styles"
export const Home = () => {
	const [users, setUsers] = useState<User[]>([])
	useEffect(() => {
		const axios = async () => {
			const request = await axiosRequest.get("/users")
			setUsers(request.data)
		}
		axios()
	}, [])

	return (
		<div>
			{users.map((user) => (
				<div>{user.name}</div>
			))}
			<Title>Teste Home</Title>
		</div>
	)
}
