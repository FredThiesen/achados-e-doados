import styled from "styled-components"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: string
	titleColor?: string
	size?: string
}
export const Wrapper = styled.button<ButtonProps>`
	//remove button default styles
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	font: inherit;
	color: inherit;
	text-align: inherit;
	&:focus {
		outline: none;
	}
	&:hover {
		opacity: 0.7;
	}

	width: 100px;
	height: 40px;
	background: ${({ color }) => color};
	color: ${({ titleColor }) => titleColor};
	border-radius: 5px;
`
