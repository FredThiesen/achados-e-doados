import { isEmpty, isNull } from "lodash"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../Components/Button"
import { Input } from "../../Components/Input"

import { UserContext } from "../../Contexts/UserContext"
import { Item } from "../../Interfaces/Donation"
import { Product, ProductCategoryEnum } from "../../Interfaces/Product"

import { Wrapper } from "./styles"

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
	const navigate = useNavigate()
	const [products, setProducts] = useState<Item[]>([])

	const handleAddProduct = () => {
		setProducts([...products, emptyProduct])
	}

	const renderProductInputs = () => {
		return products.map((product, index) => {
			return (
				<>
					<Input placeholder="descrição do produto" type="text" />
					<Input placeholder="quantidade" type="text" />
				</>
			)
		})
	}

	return (
		<Wrapper>
			<h1>Fazer uma Doação</h1>

			{renderProductInputs()}
			<Button title="Adicionar Produto" onClick={handleAddProduct} />
		</Wrapper>
	)
}
