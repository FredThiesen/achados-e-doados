import { isEmpty, isNull } from "lodash"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../Components/Button"
import colors from "../../Constants/colors"
import { UserContext } from "../../Contexts/UserContext"
import { useDonations } from "../../Hooks/useDonations"
import { Donation } from "../../Interfaces/Donation"
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
export const Home = () => {
	const userContext = useContext(UserContext)
	const navigate = useNavigate()
	const { getDonationStatus } = useDonations()
	const [users, setUsers] = useState<User[]>([])
	const [donations, setDonations] = useState<Donation[]>([])
	const [userDonations, setUserDonations] = useState<Donation[]>([])
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

	const handleGetUserDonations = async () => {
		setLoading(true)
		const request = await axiosRequest.get(
			`donations/${userContext?.user?.username}`
		)
		setUserDonations(request.data)
		setLoading(false)
	}

	const handleDonation = () => {
		navigate("/donation")
	}

	useEffect(() => {
		if (!isNull(userContext?.token)) {
			handleGetDonations()
			handleGetUserDonations()
		}
	}, [userContext?.token])

	const renderEmptyDonations = (donationList: Array<Donation>) => {
		if (isEmpty(donationList)) {
			return (
				<>
					<TitleDonation style={{ marginTop: 30 }}>
						Nenhuma doação ainda.
					</TitleDonation>
					<SubtitleDonation>
						Faça uma doação clicando no botão acima
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
												{item.quantity}x - - - - - - - -
												- {item.product.description}
											</p>
										)
									})}
								</SubtitleDonation>
								<SubtitleDonation>
									Status: {getDonationStatus(donation.status)}
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
												{item.quantity}x - - - - - - - -
												- {item.product.description}
											</p>
										)
									})}
								</SubtitleDonation>
								<SubtitleDonation>
									Status:{" "}
									{getDonationStatus(userDonation.status)}
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
			<Title>Home</Title>
			{userContext?.user?.roles?.includes("ADMIN") && (
				<Button
					title="Gerenciar"
					color={colors.pink}
					onClick={() => navigate("/management")}
				/>
			)}
			{loading ? <p>Carregando...</p> : null}
			<WrapperRow>
				<Button
					title="Sair"
					color={colors.orangeLight}
					onClick={handleLogout}
				/>
				<Button
					title="Fazer doação"
					color={colors.green}
					onClick={handleDonation}
				/>
			</WrapperRow>
			<WrapperRow style={{ marginBottom: 80 }}>
				{renderUserDonations()}
				{renderAllDonations()}
			</WrapperRow>
		</Wrapper>
	)
}
