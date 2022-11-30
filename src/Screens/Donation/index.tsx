import { isEmpty, isNull } from "lodash"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../Components/Button"
import colors from "../../Constants/colors"
import { UserContext } from "../../Contexts/UserContext"
import { Donation as TypeDonation } from "../../Interfaces/Donation"
import { User } from "../../Interfaces/User"
import { axiosRequest } from "../../Services"
import { Title } from "../AuthLogin/styles"
import {
	SubtitleDonation,
	TitleDonation,
	Wrapper,
	WrapperDonations,
	WrapperDonation,
	WrapperDonationList,
	WrapperRow,
} from "./styles"

export const Donation = () => {
	const userContext = useContext(UserContext)
	const navigate = useNavigate()
	const [users, setUsers] = useState<User[]>([])
	const [donations, setDonations] = useState<TypeDonation[]>([])
	const [userDonations, setUserDonations] = useState<TypeDonation[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	const handleLogout = async () => {
		try {
			userContext?.dropUser()
			navigate("/login")
		} catch (e) {
			console.log(e)
		}
	}

	const handleGetDonations = async () => {
		setLoading(true)
		const request = await axiosRequest.get("donations")
		setDonations(request.data)
		setLoading(false)
	}

	const handleDonation = () => {
		navigate("/donation")
	}

	useEffect(() => {
		if (!isNull(userContext?.token)) {
			handleGetDonations()
		}
	}, [userContext?.token])

	return <Wrapper></Wrapper>
}
