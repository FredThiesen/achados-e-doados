import React, { memo } from "react"
import colors from "../../Constants/colors"
import { Wrapper } from "./styles"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	color?: string
	disabled?: boolean
	onClick?: () => void
}

export const Input = memo((props: InputProps) => {
	const {
		title,
		color = colors.orangeDark,
		disabled = false,
		onClick = () => null,
		...moreProps
	} = props

	const renderTitle = () => {
		return title
	}

	return (
		<Wrapper
			onClick={onClick}
			color={color}
			disabled={disabled}
			{...moreProps}
		>
			{renderTitle()}
			{/* {renderLoading()} */}
		</Wrapper>
	)
})
