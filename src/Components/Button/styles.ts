import styled from "styled-components"
import { ButtonHTMLAttributes } from "react"
import Icon from "@mdi/react"
import { mdiLoading } from "@mdi/js"
import colors from "../../Constants/colors"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	color?: string
	outline?: boolean
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

	width: 170px;
	height: 40px;
	background: ${({ color, outline }) => (outline ? "transparent" : color)};
	color: ${({ titleColor }) => titleColor};
	border: 1px solid
		${({ color, outline, titleColor }) => (outline ? titleColor : color)};
	border-radius: 5px;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
`

export const WrapperTitle = styled.div`
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`

export const Title = styled.span`
	font-size: 16px;
	font-weight: 400;
	align-self: center;
	justify-self: center;
	text-transform: uppercase;
	letter-spacing: 1.4px;
`

export const LoadingIcon = styled(Icon).attrs({
	path: mdiLoading,
	size: 1,
	color: colors.white,
	spin: 1,
})``
