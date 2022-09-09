import React, { memo } from "react"
import { Wrapper } from "./styles"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
	onClick?: () => void
}

export const Button = memo((props: ButtonProps) => {
	const { onClick = () => null, title } = props
	return <Wrapper onClick={onClick}>{title}</Wrapper>
})
