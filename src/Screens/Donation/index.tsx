import { isEmpty, isNull } from "lodash"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../Components/Button"
import { Input } from "../../Components/Input"
import colors from "../../Constants/colors"

import { UserContext } from "../../Contexts/UserContext"
import { useDonations } from "../../Hooks/useDonations"
import { Item } from "../../Interfaces/Donation"
import { Product, ProductCategoryEnum } from "../../Interfaces/Product"

import {
	Wrapper,
	WrapperInputs,
	WrapperProductInputs,
	WrapperRow,
} from "./styles"

const emptyProduct: Item = {
	product: {
		id: 0,
		category: ProductCategoryEnum.CLOTHES,
		description: "",
	},
	quantity: 1,
}

export const Donation = () => {
	const userContext = useContext(UserContext)
	const { getProducts, createDonation } = useDonations()
	const navigate = useNavigate()
	const [productIndexes, setProductIndexes] = useState<Array<boolean>>([true])
	const [products, setProducts] = useState<Item[]>([])

	const handleGetProducts = async () => {
		const resp = await getProducts()
		!!resp && !isEmpty(resp) && setProducts(resp)
	}

	const handleAddProduct = () => {
		setProductIndexes([...productIndexes, true])
	}

	const handleConfirmDonation = () => {
		//TODO
	}

	useEffect(() => {
		handleGetProducts()
	}, [])

	const renderProductInputs = () => {
		return productIndexes.map((product, index) => {
			return (
				<WrapperProductInputs key={`${index}-product`}>
					<Input placeholder="descrição do produto" type="text" />
					<Input placeholder="quantidade" type="text" />
				</WrapperProductInputs>
			)
		})
	}

	return (
		<Wrapper>
			<h1>Fazer uma Doação</h1>
			<WrapperRow>
				<Button
					title="Adicionar"
					onClick={handleAddProduct}
					color={colors.orangeDark}
				/>
				<Button
					title="Confirmar"
					onClick={handleConfirmDonation}
					color={colors.green}
				/>
			</WrapperRow>
			<WrapperInputs>{renderProductInputs()}</WrapperInputs>
		</Wrapper>
	)
}
