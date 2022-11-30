import React, { useContext, useEffect, useState } from "react"
import { Button } from "../../Components/Button"
import { Input } from "../../Components/Input"
import { useUser } from "../../Hooks/useUser"
import { useNavigate } from "react-router-dom"
import colors from "../../Constants/colors"
import logo from "../../Assets/logo.svg"

import {
	Subtitle,
	Title,
	WrapperColumn,
	WrapperRow,
	WrapperScreen,
} from "./styles"
import { isEmpty, isNull } from "lodash"
import { axiosRequest } from "../../Services"
import { UserContext } from "../../Contexts/UserContext"

export const AuthLogin = () => {
	const userContext = useContext(UserContext)
	const navigate = useNavigate()
	const { login, user } = useUser()
	const [username, setUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	useEffect(() => {
		if (!isNull(user)) {
			userContext?.dropUser()
		}
	}, [])

	const handleLogin = async () => {
		const status = await login({ username, password })
		if (status) return navigate("/home")
		alert("Erro ao fazer login")
	}

	return (
		<WrapperScreen>
			<WrapperRow>
				<WrapperColumn>
					{/* logo from assets folder */}
					<Title style={{ color: colors.green, marginBottom: 10 }}>
						Achados e Doados
					</Title>
					<img src={logo} alt="logo" width={"90%"} />
				</WrapperColumn>
				<WrapperColumn style={{ background: colors.green }}>
					{/* justify - center */}
					<Title>Faça Login</Title>
					<Subtitle>
						Insira suas credenciais para acessar o sistema.
					</Subtitle>

					{/* email */}
					<Input
						placeholder="insira seu login"
						onChange={(e) => setUsername(e.target.value)}
					/>

					{/* password */}
					<Input
						placeholder="insira sua senha"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button
						title="Entrar"
						titleColor={colors.white}
						color={colors.orangeDark}
						loading
						onClick={handleLogin}
					/>
					<Button
						title="Criar conta"
						outline
						titleColor={colors.orangeDark}
						onClick={() => navigate("/signup")}
					/>
				</WrapperColumn>
			</WrapperRow>
		</WrapperScreen>
	)
}
