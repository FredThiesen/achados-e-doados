import React, { useState } from "react"
import { Input } from "../../Components/Input"
import { Button } from "../../Components/Button"
import { useNavigate } from "react-router-dom"
import { SignInRequest } from "../../Interfaces/SignInRequest"
import { useUser } from "../../Hooks/useUser"
import colors from "../../Constants/colors"
import logo2 from "../../Assets/logo2.svg"

import {
	Title,
	WrapperRow,
	WrapperColumn,
	WrapperScreen,
	WrapperInput,
} from "./styles"

export const AuthSignup = () => {
	const navigate = useNavigate()
	const { signIn } = useUser()
	const [name, setName] = useState<string>("")
	const [username, setUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")
	const [addressNumber, setAddressNumber] = useState<string>("")
	const [city, setCity] = useState<string>("")
	const [state, setState] = useState<string>("")
	const [complement, setComplement] = useState<string>("")

	const makeRequestUser = (): SignInRequest => {
		const user = {
			name,
			username,
			password,
			address: {
				addressNumber,
				city,
				state,
				complement,
			},
		}
		return user
	}

	const handleSignUp = async () => {
		const user = makeRequestUser()
		const status = await signIn(user)
		if (status) return navigate("/login")
		alert("Erro ao criar conta")
	}

	return (
		<WrapperScreen>
			<WrapperRow>
				<WrapperColumn>
					<Title style={{ color: colors.green }}>
						Crie sua conta!
					</Title>
					<img
						src={logo2}
						alt="logo"
						width={"90%"}
						style={{ marginTop: 100 }}
					/>
				</WrapperColumn>
				<WrapperColumn style={{ background: colors.green }}>
					<Title>Cadastro</Title>
					<WrapperInput>
						<Input
							placeholder="Nome completo"
							width={"100%"}
							onChange={(e) => setName(e.target.value)}
						/>
					</WrapperInput>
					<WrapperInput width="">
						<Input
							placeholder="Login"
							width={"50%"}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							placeholder="Senha"
							type="password"
							width={"50%"}
							style={{ marginLeft: "10px" }}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</WrapperInput>
					<WrapperInput>
						<Input
							placeholder="Cidade"
							width={"50%"}
							onChange={(e) => setCity(e.target.value)}
						/>
						<Input
							placeholder="Estado"
							width={"50%"}
							style={{ marginLeft: "10px" }}
							onChange={(e) => setState(e.target.value)}
						/>
					</WrapperInput>
					<WrapperInput>
						<Input
							placeholder="Número"
							width={"20%"}
							type="number"
							onChange={(e) => setAddressNumber(e.target.value)}
						/>
						<Input
							placeholder="Complemento"
							width={"80%"}
							style={{ marginLeft: "10px" }}
							onChange={(e) => setComplement(e.target.value)}
						/>
					</WrapperInput>
					<Button
						title="Cadastrar"
						color={colors.orangeDark}
						titleColor={colors.white}
						onClick={handleSignUp}
					/>
					<Button
						title="Voltar"
						outline
						titleColor={colors.orangeDark}
						onClick={() => navigate("/login")}
					/>
				</WrapperColumn>
			</WrapperRow>
		</WrapperScreen>
	)
}
