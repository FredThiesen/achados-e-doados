import React, { useState } from "react"
import { Button } from "../../Components/Button"
import { Input } from "../../Components/Input"
import colors from "../../Constants/colors"
import { useNavigate } from "react-router-dom"
import {
	Subtitle,
	Title,
	WrapperColumn,
	WrapperRow,
	WrapperScreen,
} from "./styles"
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../../Contexts/User"
export const AuthLogin = () => {
	const navigate= useNavigate();
	const [user, setUser]=useState<any>({}) //gambiarra mostro, favor arrumar
	const value=useContext(UserContext)
	//pq diabos n consigo usar desestruct pra pegar os metodos/atributos do context? wtf

	const siginIn = async () => {
		const resp=await axios.post('http://localhost:8080/api/login', user)
		if(resp.status===200){
		localStorage.setItem("token", resp.data.access_token) //ta dando problema de assincronismo aqui...
	
		} 
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>,name:string) => {
		let userEdit={...user};
		userEdit[name]=e.target.value;
		setUser(userEdit)
	}
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
					<Input placeholder="insira seu login"  onChange={(e)=>handleChange(e,'username')}/>

					{/* password */}
					<Input placeholder="insira sua senha" type="password" onChange={(e)=>handleChange(e,'password')}/>

					<Button
						title="Entrar"
						titleColor={colors.white}
						color={colors.orangeDark}
						loading
						onClick={siginIn}
					/>
					<Button
						title="Criar conta"
						outline
						titleColor={colors.orangeDark}
						onClick={()=>navigate('/signup')}
					/>
				</WrapperColumn>
			</WrapperRow>
		</WrapperScreen>
	)
}
