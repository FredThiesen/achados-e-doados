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

	const renderEmptyDonations = (donationList: Array<TypeDonation>) => {
		if (isEmpty(donationList)) {
			return (
				<>
					<TitleDonation style={{ marginTop: 30 }}>
						Nenhuma doação ainda.
					</TitleDonation>
					<SubtitleDonation>
						Faça uma doação clicando no botão abaixo
					</SubtitleDonation>
				</>
			)
		}
	}

	const renderAllDonations = () => {
		return (
			<WrapperDonationList>
				<h1>Todas as Doações</h1>
				<WrapperDonations>
					{donations.map((donation) => {
						return (
							<WrapperDonation key={donation.id}>
								<TitleDonation>
									Usuário: {donation.userName}
								</TitleDonation>
								<SubtitleDonation>
									Itens: <br />
									{donation.itens.map((item) => {
										return (
											<p key={item.product.id}>
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
					{renderEmptyDonations(donations)}
				</WrapperDonations>
			</WrapperDonationList>
		)
	}

	const renderUserDonations = () => {
		return (
			<WrapperDonationList>
				<h1>Doações feitas por você</h1>
				<WrapperDonations>
					{userDonations.map((userDonation) => {
						return (
							<WrapperDonation key={userDonation.id}>
								<TitleDonation>
									Usuário: {userDonation.userName}
								</TitleDonation>
								<SubtitleDonation>
									Itens: <br />
									{userDonation.itens.map((item) => {
										return (
											<p key={item.product.id}>
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
					{renderEmptyDonations(userDonations)}
				</WrapperDonations>
			</WrapperDonationList>
		)
	}

	return (
		<Wrapper>
			<Title>Teste Home</Title>
			{loading ? <p>Carregando...</p> : null}
			<Button
				title="Sair"
				color={colors.orangeLight}
				onClick={handleLogout}
			/>
			<WrapperRow style={{ marginBottom: 80 }}>
				{renderUserDonations()}
				{renderAllDonations()}
			</WrapperRow>

			<Button
				title="Fazer doação"
				color={colors.green}
				onClick={handleDonation}
			/>
		</Wrapper>
	)
}
