import React, { memo } from "react"
import colors from "../../Constants/colors"
import { Title, Wrapper, WrapperTitle } from "./styles"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
	color?: string
	outline?: boolean
	titleColor?: string
	loading?: boolean
	size?: "small" | "medium" | "large"
	onClick?: () => void
}

export const Button = memo((props: ButtonProps) => {
	const { size = "medium" } = props
	const {
		title,
		color = colors.dark,
		titleColor = colors.white,
		loading = false,
		onClick = () => null,
		outline = false,
		...moreProps
	} = props

	const renderTitle = () => {
		return (
			<WrapperTitle>
				<Title>{title}</Title>
			</WrapperTitle>
		)
	}

	return (
		<Wrapper
			onClick={onClick}
			color={color}
			titleColor={titleColor}
			outline={outline}
			{...moreProps}
		>
			{renderTitle()}
		</Wrapper>
	)
})
