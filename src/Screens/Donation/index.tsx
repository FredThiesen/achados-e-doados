import { isEmpty, isUndefined } from "lodash"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../Components/Button"
import Modal from "../../Components/Modal"

import colors from "../../Constants/colors"

import { UserContext } from "../../Contexts/UserContext"
import { useDonations } from "../../Hooks/useDonations"
import { Item } from "../../Interfaces/Donation"
import { Product, ProductCategoryEnum } from "../../Interfaces/Product"

import {
	MissinInputsWarning,
	Wrapper,
	WrapperInputs,
	WrapperProductInputs,
	WrapperRow,
} from "./styles"

export const Donation = () => {
	const userContext = useContext(UserContext)
	const { getProducts, createDonation, getCategoryName } = useDonations()
	const navigate = useNavigate()
	const [productIndexes, setProductIndexes] = useState<Array<boolean>>([true])
	const [availableProducts, setAvailableProducts] = useState<Product[]>([])
	const [categories, setCategories] = useState<ProductCategoryEnum[]>([])
	const [products, setProducts] = useState<Item[]>([
		{
			product: {
				id: 0,
				category: ProductCategoryEnum.ELETRODOMESTIC,
				description: "",
			},
			quantity: 0,
		},
	])

	const getCategories = (resp: Array<Product>) => {
		const categories = resp.reduce(
			(acc: ProductCategoryEnum[], curr: Product) => {
				if (!acc.includes(curr.category)) {
					acc.push(curr.category)
				}
				return acc
			},
			[]
		)
		setCategories(categories)
	}

	const handleGetProducts = async () => {
		const resp = await getProducts()
		!!resp && !isEmpty(resp) && setAvailableProducts(resp)
		getCategories(resp)
	}

	const handleAddProduct = () => {
		setProductIndexes([...productIndexes, true])
		setProducts([
			...products,
			{
				...{
					product: {
						id: 0,
						category: ProductCategoryEnum.ELETRODOMESTIC,
						description: "",
					},
					quantity: 0,
				},
			},
		])
	}

	const handleCategoryChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		index: number
	) => {
		setProducts((prevProducts) => {
			const newProducts = [...prevProducts]
			newProducts[index] = {
				product: {
					id: 0,
					category: ProductCategoryEnum.ELETRODOMESTIC,
					description: "",
				},
				quantity: 0,
			}
			//@ts-ignore
			newProducts[index].product.category = e.target.value
			newProducts[index].product.description = ""
			return newProducts
		})
	}

	const handleProductChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		index: number
	) => {
		setProducts((prevProducts) => {
			const newProducts = [...prevProducts]
			newProducts[index].product = availableProducts.find(
				(product) => product.id === Number(e.target.value)
			) as Product
			console.log(newProducts)
			return newProducts
		})
	}

	const handleQuantityChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		index: number
	) => {
		setProducts((prevProducts) => {
			const newProducts = [...prevProducts]
			newProducts[index].quantity = Number(e.target.value)
			return newProducts
		})
	}

	const makeDonationRequest = () => {
		return {
			//get locale date
			donationDate: new Date(),
			itens: products,
			userName: userContext?.user?.username,
			type: "PICKUP",
		}
	}

	const handleConfirmDonation = async () => {
		const request = makeDonationRequest()
		if (!isUndefined(request.userName)) {
			const resp = await createDonation(request)
			if (resp) {
				Modal.open({
					renderContent: () => (
						<h1 style={{ color: colors.orangeDark }}>
							Doação Realizada com sucesso!{" "}
						</h1>
					),
				})

				navigate("/home")
			}
		}
	}

	useEffect(() => {
		handleGetProducts()
	}, [])

	useEffect(() => {
		console.log("products", products)
	}, [products])

	const checkMissingInputs = (index: number) => {
		if (
			products[index].product.description === "" ||
			!products[index].quantity
		)
			return true
		return false
	}

	const checkAnyMissingInputs = () => {
		let missingInputs: boolean = false
		products.forEach((product, index) => {
			if (checkMissingInputs(index)) missingInputs = true
		})
		return missingInputs
	}

	const renderMissingInputsWarning = () => {
		return <MissinInputsWarning>!</MissinInputsWarning>
	}
	const renderProductInputs = () => {
		return productIndexes.map((_, index) => {
			return (
				<WrapperProductInputs key={`${index}-product`}>
					{checkMissingInputs(index)
						? renderMissingInputsWarning()
						: null}
					<h4>Selecione a categoria...</h4>
					<select
						placeholder="Categoria"
						onChange={(e) => handleCategoryChange(e, index)}
						defaultValue={undefined}
						style={{
							marginBottom: 10,
							marginTop: 10,
							height: 40,
							width: "70%",
						}}
					>
						{categories.map((category, categoryIndex) => (
							<option
								key={`${categoryIndex}-category`}
								value={category}
							>
								{getCategoryName(category)}
							</option>
						))}
					</select>

					<h4>Selecione o produto...</h4>
					<select
						placeholder="Produto"
						style={{
							marginBottom: 10,
							marginTop: 10,
							height: 40,
							width: "70%",
						}}
						defaultValue={undefined}
						onChange={(e) => handleProductChange(e, index)}
					>
						<option value={undefined}>Selecione...</option>
						{availableProducts.map((product, productIndex) => {
							if (
								product.category ===
								products[index]?.product?.category
							)
								if (product.description !== "")
									return (
										<option
											key={`${productIndex}-product`}
											value={product.id}
										>
											{product.description}
										</option>
									)
						})}
					</select>

					<h4>Selecione a quantidade...</h4>
					<select
						placeholder="Quantidade"
						defaultValue={undefined}
						style={{
							marginBottom: 10,
							marginTop: 10,
							height: 40,
							width: "70%",
						}}
						onChange={(e) => handleQuantityChange(e, index)}
					>
						<option value={undefined}>Selecione...</option>
						{[...Array(10)].map((_, quantityIndex) => (
							<option
								key={`${quantityIndex}-quantity`}
								value={quantityIndex + 1}
							>
								{quantityIndex + 1}
							</option>
						))}
					</select>
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
					disabled={checkAnyMissingInputs()}
					onClick={handleConfirmDonation}
					color={colors.green}
				/>
			</WrapperRow>
			<WrapperInputs>{renderProductInputs()}</WrapperInputs>
		</Wrapper>
	)
}
