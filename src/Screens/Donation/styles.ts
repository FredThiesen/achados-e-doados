import styled from "styled-components"
import colors from "../../Constants/colors"

export const Wrapper = styled.div`
	widht: 100%;
	height: 100%;
`

export const WrapperDonationList = styled.div`
	height: 70%;
`

export const WrapperDonations = styled.div`
	height: 100%;
	padding: 5px;
	min-height: 400px;
	overflow-y: scroll;
	border: 1px solid white;
`

export const WrapperDonation = styled.div`
	border: 1px solid ${colors.orangeDark};
	border-radius: 10px;
	padding: 10px;
	margin: 10px;
	justify-content: flex-start;
	align-items: flex-start;
`

export const TitleDonation = styled.h3`
	color: ${colors.green};
	font-size: 1.5rem;
`

export const SubtitleDonation = styled.h4`
	color: ${colors.orangeLight};
	font-size: 1.2rem;
	//text don't break line
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

export const WrapperRow = styled.div`
	flex-direction: row;
	width: 1000px;
	justify-content: space-between;
	padding: 5px;
`

export const WrapperProductInputs = styled.div`
	border: 1px solid ${colors.orangeDark};
	border-radius: 10px;
	padding: 10px;
	margin: 10px;
	min-width: 300px;
	justify-content: flex-start;
`

export const WrapperInputs = styled.div`
	max-height: 800px;
	overflow-y: scroll;
	/* padding: 20px; */
	//change scroll color
	&::-webkit-scrollbar {
		width: 10px;
		color: ${colors.orangeDark};
	}
	position: relative;
`

export const MissinInputsWarning = styled.div`
	background: ${colors.orangeDark};
	color: ${colors.dark};
	width: 35px;
	height: 35px;
	border-radius: 25px;
	border: 1px solid ${colors.dark};
	position: absolute;
	top: 0.1;
	right: 0;
	z-index: 100;
	text-align: center;
	justify-content: center;
	align-items: center;
	font-size: 1.5rem;
`
