import React, {
	createRef,
	memo,
	useEffect,
	useImperativeHandle,
	useState,
} from "react"
import { CloseLabel, Wrapper, WrapperCloseLabel, WrapperModal } from "./styles"

const modal: any = createRef()

interface ModalProps {
	renderContent: any
}

export const Modal = memo(() => {
	const [visible, setVisible] = useState(false)
	const [renderContent, setRenderContent] = useState<any | null>(null)

	useImperativeHandle(modal, () => ({
		open: (props: ModalProps) => {
			setVisible(true)
			setRenderContent(props.renderContent)
		},
		close: () => setVisible(false),
	}))

	const renderCloseLabel = () => {
		return (
			<WrapperCloseLabel onClick={() => setVisible(false)}>
				<CloseLabel>Fechar</CloseLabel>
			</WrapperCloseLabel>
		)
	}

	const renderModal = () => {
		if (!renderContent) return null

		return (
			<WrapperModal>
				{renderContent}
				{renderCloseLabel()}
			</WrapperModal>
		)
	}

	return visible ? <Wrapper ref={modal}>{renderModal()}</Wrapper> : null
})

export default {
	open: (props: ModalProps) => modal.current.open(props),
	close: () => modal.current.close(),
}
