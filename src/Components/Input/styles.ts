import styled from "styled-components"
import { InputHTMLAttributes } from "react"
import colors from "../../Constants/colors"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	color?: string
	disabled?: boolean
}
export const Wrapper = styled.input<InputProps>`
	//remove input default styles
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border: none;
	outline: none;
	background: none;
	//end remove input default styles

	//remove input hover styles
	/* &:hover {
		border: none;
		outline: none;
		background: none;
	} */

	width: ${props=>props.width?props.width:'270px'};
	height: 40px;
	border: 1px solid ${({ color }) => color};
	border-radius: 5px;
	margin-bottom: 10px;
	padding-left: 10px;
	font-size: 16px;
	color: ${({ color }) => color};
	placeholder-color: ${({ color }) => colors.black};
`
