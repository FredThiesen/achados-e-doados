import { isNull } from "lodash"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../Components/Button"
import colors from "../../Constants/colors"
import { UserContext } from "../../Contexts/UserContext"
import { Donation } from "../../Interfaces/Donation"
import { User } from "../../Interfaces/User"
import { axiosRequest } from "../../Services"
import { Title } from "../AuthLogin/styles"
import {
	SubtitleDonation,
	TitleDonation,
	Wrapper,
	WrapperAllDonations,
	WrapperDonation,
} from "./styles"
export const Home = () => {
	const userContext = useContext(UserContext)
	const navigate = useNavigate()
	const [users, setUsers] = useState<User[]>([])
	const [donations, setDonations] = useState<Donation[]>([])
	const [userDonations, setUserDonations] = useState<Donation[]>([])

	const handleLogout = async () => {
		try {
			userContext?.dropUser()
			navigate("/login")
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		const axios = async () => {
			const request = await axiosRequest.get("donations")
			setDonations(request.data)
		}
		axios()
	}, [])

	const renderAllDonations = () => {
		return (
			<>
				<h1>Todas as Doações</h1>
				<WrapperAllDonations>
					{donations.map((donation) => {
						return (
							<WrapperDonation>
								<TitleDonation>
									Usuário: {donation.userName}
								</TitleDonation>
								<SubtitleDonation>
									Itens: <br />
									{donation.itens.map((item) => {
										return (
											<p>
												{" "}
												{item.quantity}x -{" "}
												{item.product.description}
											</p>
										)
									})}
								</SubtitleDonation>
							</WrapperDonation>
						)
					})}
				</WrapperAllDonations>
			</>
		)
	}

	return (
		<Wrapper>
			<Title>Teste Home</Title>
			<Button
				title="Sair"
				color={colors.orangeLight}
				onClick={handleLogout}
			/>
			{renderAllDonations()}
			{/* {renderUserDonations()} */}
		</Wrapper>
	)
}
