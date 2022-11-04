import React, { memo } from "react"
import colors from "../../Constants/colors"
import { Wrapper } from "./styles"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
	color?: string
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
	} = props

	const renderTitle = () => {
		if (loading) {
			return <div className="lds-dual-ring"></div>
		}
		return title
	}

	return (
		<Wrapper onClick={onClick}>
			{renderTitle()}
			{/* {renderLoading()} */}
		</Wrapper>
	)
})
