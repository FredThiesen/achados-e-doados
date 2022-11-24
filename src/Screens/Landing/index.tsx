import React from "react"
import { Button } from "../../Components/Button"
import colors from "../../Constants/colors"

import { Title, Wrapper } from "./styles"
import { Subtitle } from "./styles"
import LogoLanding from "../../Assets/logoLanding.svg"
import { useNavigate } from "react-router-dom"
export const Landing = () => {
	const navigator = useNavigate()
	const handleClick = () => {
		navigator("/login")
	}
	return (
		<Wrapper>
			<Title>Bem vindo ao Achados e Doados!</Title>
			<img
				src={LogoLanding}
				alt="logo"
				width={"60%"}
				style={{ margin: 50 }}
			/>

			<Subtitle>
				Neste site, você será capaz de ajudar o próximo de maneira
				rápida e fácil.
			</Subtitle>
			<Subtitle>É muito simples:</Subtitle>
			<ul>
				<li style={{ marginBottom: 15 }}>
					Você tem algum objeto que não precisa mais, que esteja em
					boas condições?
				</li>
				<li style={{ marginBottom: 15 }}>
					Então, cadastre-o no site, e lance um pedido de coleta.
				</li>
				<li style={{ marginBottom: 15 }}>
					Em seguida, alguém irá buscar o objeto e levará para uma
					instituição de caridade.
				</li>
				<li style={{ marginBottom: 15 }}>
					Se você quiser, pode acompanhar o andamento do pedido.
				</li>
			</ul>
			<Button
				title="Entrar"
				color={colors.orangeDark}
				onClick={handleClick}
			/>
		</Wrapper>
	)
}
