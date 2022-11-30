import styled from "styled-components"
import colors from "../../Constants/colors"

export const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease-in-out;
	/* transition: all 0.3s ease-in-out; */
`
export const WrapperModal = styled.div`
	width: 100%;
	max-width: 500px;
	background-color: #fff;
	border-radius: 5px;
	padding: 20px;
	z-index: 100;
`

export const ModalHeader = styled.div`
	justify-content: space-between;
	align-items: center;
`

export const WrapperCloseLabel = styled.div`
	position: relative;
	top: 0;
	right: 0;
	padding: 10px;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: all 0.3s ease-in-out;
	background: ${colors.dark};
	&:hover {
		color: #fff;
	}
`
export const CloseLabel = styled.div`
	font-size: 20px;
	font-weight: bold;
	color: #fff;
	transition: all 0.3s ease-in-out;

	&:hover {
		color: #fff;
	}
`
