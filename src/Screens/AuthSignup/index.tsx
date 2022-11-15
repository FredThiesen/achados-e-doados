import React, { useContext, useState } from "react"
import colors from "../../Constants/colors"
import {
	Subtitle,
	Title,
	WrapperRow,
	WrapperColumn,
	WrapperScreen,
	WrapperInput
} from "./styles"
import { Input } from "../../Components/Input"
import { Button } from "../../Components/Button"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const AuthSignup = () => {
	const navigate = useNavigate();
	const [user, setUser]=useState<any>({address:{}}) //arruma essa gambiarra tb
	const signUp = async () => {
		const resp=await axios.post('http://localhost:8080/api/signin', user)
	if(resp.status===201) navigate('/login')
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>,name:string) => {
		let userEdit={...user};
		userEdit[name]=e.target.value;
		setUser(userEdit)
	}
	const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>,name:string) => {
		let userEdit={...user};
		userEdit['address'][name]=e.target.value;
		setUser(userEdit)

	}
	return (
		<WrapperScreen>
			<WrapperRow>
				<WrapperColumn></WrapperColumn>
				<WrapperColumn style={{background:colors.green}}>
					<Title>
						Cadastro
					</Title>
					<WrapperInput>
						<Input placeholder="Nome completo" width={'100%'} onChange={(e)=>handleChange(e,'name')} />
					</WrapperInput>
					<WrapperInput width="">
						<Input placeholder="Login" width={'50%'}  onChange={(e)=>handleChange(e,'username')}/>
						<Input placeholder="Senha" type='password' width={'50%'}  style={{marginLeft:'10px'}}  onChange={(e)=>handleChange(e,'password')}/>
					</WrapperInput>
					<WrapperInput>
						<Input placeholder="Cidade" width={'50%'}  onChange={(e)=>handleChangeAddress(e,'city')}/>
						<Input placeholder="Estado" width={'50%'} style={{marginLeft:'10px'}}  onChange={(e)=>handleChangeAddress(e,'state')}/>
					</WrapperInput>
					<WrapperInput>
						<Input placeholder="Número" width={'20%'} type='number'  onChange={(e)=>handleChangeAddress(e,'addressNumber')}  />
						<Input placeholder="Complemento" width={'80%'} style={{marginLeft:'10px'}}  onChange={(e)=>handleChangeAddress(e,'complement')}/>
					</WrapperInput>
					<Button title="Cadastrar" color={colors.orangeDark} titleColor={colors.white} onClick={()=>signUp()} />
					<Button title="Voltar" outline titleColor={colors.orangeDark} onClick={()=>navigate('/login')}/>
				</WrapperColumn>
			</WrapperRow>
		</WrapperScreen>
	)
}
