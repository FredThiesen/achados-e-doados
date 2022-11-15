import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Contexts/User"
import { User } from "../../Interfaces/User";
import {axiosRequest} from "../../Services"
export const Home = () => {
	const value=useContext(UserContext);
	const [users, setUsers]=useState<User[]>([])
	useEffect(() => {
		const axios= async () =>{
			const request=await axiosRequest.get("/users")
			setUsers(request.data)
		}
		axios();
		
	},[])
	
	return <div>{users.map(user=>(
		<div>{user.name}</div>
	))}</div>
}
