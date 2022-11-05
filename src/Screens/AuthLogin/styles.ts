import styled from "styled-components"
import colors from "../../Constants/colors"

export const WrapperScreen = styled.div`
	flex: 1;
	width: 100%;
	background-color: ${colors.background};
	justify-content: center;
	min-width: 1300px;
`

export const WrapperRow = styled.div`
	flex-direction: row;
	height: 80vh;
	width: 80vw;
	border: 5px solid ${colors.green};
	border-radius: 15px;
	min-width: 1200px;
`

export const WrapperColumn = styled.div`
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	width: 50%;
	height: 100%;
	padding: 100px;
`

export const Title = styled.h1`
	font-size: 3.5rem;
	font-weight: 600;
	color: ${colors.orangeDark};
	padding: 0 0 10px 0;
`

export const Subtitle = styled.h3`
	font-size: 1.25rem;
	font-weight: 400;
	color: ${colors.orangeDark};
	padding: 0 0 10px 0;
`
