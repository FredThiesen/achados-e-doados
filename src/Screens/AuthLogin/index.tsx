import React from "react"
import { Button } from "../../Components/Button"
import { Input } from "../../Components/Input"
import colors from "../../Constants/colors"
import {
	Subtitle,
	Title,
	WrapperColumn,
	WrapperRow,
	WrapperScreen,
} from "./styles"

export const AuthLogin = () => {
	return (
		<WrapperScreen>
			<WrapperRow>
				<WrapperColumn></WrapperColumn>
				<WrapperColumn style={{ background: colors.green }}>
					{/* justify - center */}
					<Title>Faça Login</Title>
					<Subtitle>
						Insira suas credenciais para acessar o sistema.
					</Subtitle>

					{/* email */}
					<Input placeholder="insira seu email" />

					{/* password */}
					<Input placeholder="insira sua senha" type="password" />

					<Button
						title="Entrar"
						titleColor={colors.white}
						color={colors.orangeDark}
						loading
					/>
					<Button
						title="Criar conta"
						outline
						titleColor={colors.orangeDark}
					/>
				</WrapperColumn>
			</WrapperRow>
		</WrapperScreen>
	)
}
