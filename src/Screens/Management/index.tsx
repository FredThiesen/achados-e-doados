import React, { useEffect, useState } from "react"
import {
	Wrapper,
	Title,
	Column,
	ColumnHeader,
	ProductContainer,
	List,
	ListItem,
} from "./style"
import { axiosRequest } from "../../Services"
import { Input } from "../../Components/Input"
import { Button } from "../../Components/Button"
import colors from "../../Constants/colors"
import { Donation, itemDonation } from "../../Interfaces/Donation"
import Modal from "../../Components/Modal"
import box from "../../Assets/box.svg"
import { useDonations } from "../../Hooks/useDonations"
import { ProductCategoryEnum, Product } from "../../Interfaces/Product"

export const Management = () => {
	const [products, setProducts] = useState<Array<Product>>([])
	const [donations, setDonations] = useState<Array<Donation>>([])
	const { getCategoryName, getDonationStatus } = useDonations()

	const [productEdit, setProductEdit] = useState<Product>({
		category: ProductCategoryEnum.ELETRODOMESTIC,
		enabled: true,
	} as Product)

	useEffect(() => {
		getProducts()
		getDonations()
	}, [])
	const saveProduct = async () => {
		const request = await axiosRequest.post("products", productEdit)
		console.log(request.data)
		getProducts()
	}
	const getProducts = async () => {
		const request = await axiosRequest.get("products")
		setProducts(request.data)
	}
	const getDonations = async () => {
		const request = await axiosRequest.get("donations")
		setDonations(request.data)
	}
	const handleChangeCheckbox = async (id: number, value: boolean) => {
		const request = await axiosRequest.put(`products/${id}?enable=${value}`)
		let productsCopy = [...products]
		productsCopy = productsCopy.map((product: Product) => {
			if (product.id === id) {
				product.enabled = value
			}
			return product
		})
		setProducts(productsCopy)
	}
	const handleSelectbox = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let produto = { ...productEdit }
		//@ts-ignore
		produto.category = e.currentTarget.value
		setProductEdit(produto)
	}
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let produto = { ...productEdit }
		if (e.target.name === "description") {
			produto.description = e.currentTarget.value
		} else {
			produto.enabled = e.currentTarget.checked
		}
		setProductEdit(produto)
	}
	const renderHabilitarProduto = (produto: Product) => {
		return (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<input
					type="checkbox"
					checked={produto.enabled}
					id={`product_${produto.id}`}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChangeCheckbox(produto.id, e.target.checked)
					}
					style={{ width: "25px", height: "25px" }}
				/>
			</div>
		)
	}
	const renderTableProdutos = () => {
		return (
			<div style={{ height: "400px" }}>
				<table
					style={{
						border: "1px solid white",
						padding: "20px",
						borderRadius: "10px",
						display: "block",
						width: "100%",
						overflow: "auto",
						background: colors.background,
					}}
				>
					<thead>
						<tr>
							<ColumnHeader>Descrição</ColumnHeader>
							<ColumnHeader>Tipo</ColumnHeader>
							<ColumnHeader>Habilitado</ColumnHeader>
						</tr>
					</thead>
					<tbody>
						{products.map((produto: Product) => {
							return (
								<tr>
									<Column style={{ width: "400px" }}>
										{produto.description}
									</Column>
									<Column>
										{getCategoryName(produto.category)}
									</Column>
									<Column>
										{renderHabilitarProduto(produto)}
									</Column>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
	const renderTableDonations = () => {
		return (
			<div style={{ height: "400px" }}>
				<table
					style={{
						border: "1px solid white",
						padding: "20px",
						borderRadius: "10px",
						width: "100%",
						background: colors.background,
					}}
				>
					<thead>
						<tr>
							<ColumnHeader>Usuário</ColumnHeader>
							<ColumnHeader>Data</ColumnHeader>
							<ColumnHeader>Status</ColumnHeader>
							<ColumnHeader>Itens</ColumnHeader>
							<ColumnHeader>Confirmar</ColumnHeader>
						</tr>
					</thead>
					<tbody>
						{donations.map((donation: any) => {
							return (
								<tr>
									<Column style={{ width: "200px" }}>
										{donation.userName}
									</Column>
									<Column style={{ width: "200px" }}>
										{new Date(
											donation.donationDate
										).toLocaleDateString()}
									</Column>
									<Column style={{ width: "200px" }}>
										{getDonationStatus(donation.status)}
									</Column>
									<Column style={{ width: "200px" }}>
										{renderConfirmDonation(donation)}
									</Column>
									<Column style={{ width: "200px" }}>
										{renderConfirmDonation(donation)}
									</Column>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
	const getItem = (item: itemDonation) => {
		return (
			<div>
				<ListItem>
					<img src={box} alt="logo" width={"50px"} />
					<span
						style={{
							fontSize: "1.5em",
							fontWeight: "bold",
							marginLeft: "10px",
						}}
					>
						{item.product.description}
					</span>
					<span style={{ fontSize: "1.5em", fontWeight: "bold" }}>
						{" "}
						&nbsp;&nbsp;&nbsp;x {item.quantity}
					</span>
				</ListItem>
			</div>
		)
	}
	const openModal = (donation: Donation) => {
		Modal.open({
			renderContent: () => (
				<div style={{ width: "100%" }}>
					<h1 style={{ color: "black" }}>Itens do pedido</h1>
					<div
						style={{
							width: "100%",
							display: "flex",
							alignItems: "flex-start",
						}}
					>
						<List>
							{donation.itens.map((item: any) => getItem(item))}
						</List>
					</div>
				</div>
			),
		})
	}
	const renderConfirmDonation = (donation: Donation) => {
		return (
			<div>
				<Button
					title="Abrir"
					titleColor={"colors.white"}
					color={colors.orangeDark}
					loading
					onClick={() => openModal(donation)}
				/>
			</div>
		)
	}
	const renderProdutos = () => {
		return (
			<div
				style={{
					height: "100%",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<h2 style={{ padding: "15px 0px", fontSize: "1.5em" }}>
					Cadastrar novo produto
				</h2>
				<Input
					placeholder="Nome do produto"
					name="description"
					style={{ background: "white", color: "black" }}
					onChange={handleInput}
				/>
				<select
					style={{
						width: "270px",
						height: "40px",
						borderRadius: "5px",
						color: "black",
						border: "1px solid #F2643D",
						fontSize: "16px",
						padding: "3px",
					}}
					name="category"
					onChange={handleSelectbox}
				>
					<option value={ProductCategoryEnum.ELETRODOMESTIC}>
						Eletrodoméstico
					</option>
					<option value={ProductCategoryEnum.TOYS}>Brinquedos</option>
					<option value={ProductCategoryEnum.CLOTHES}>Roupas</option>
					<option value={ProductCategoryEnum.KITCHEN}>Cozinha</option>
					<option value={ProductCategoryEnum.BEDROOM}>Quarto</option>
					<option value={ProductCategoryEnum.FURNITURE}>
						Mobília
					</option>
				</select>
				<div
					style={{
						display: "flex",
						width: "100%",
						flexDirection: "row",
						justifyContent: "flex-start",
						marginTop: "10px",
					}}
				>
					<input
						type="checkbox"
						checked={productEdit.enabled}
						id="editEnable"
						onChange={handleInput}
						style={{ width: "25px", height: "25px" }}
					/>
					<span
						style={{
							marginLeft: "10px",
							fontWeight: "bold",
							fontSize: "1.2em",
						}}
					>
						Habilitado
					</span>
				</div>
				<Button
					title="Cadastrar"
					titleColor={"colors.white"}
					color={colors.orangeDark}
					loading
					onClick={saveProduct}
				/>
			</div>
		)
	}
	return (
		<Wrapper>
			<Title>Gerenciamento da aplicação</Title>
			<div
				style={{
					width: "100%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					marginTop: "30px",
					height: "100%",
					alignItems: "flex-start",
				}}
			>
				{renderTableProdutos()}
				<ProductContainer>{renderProdutos()}</ProductContainer>
			</div>
			<div style={{ marginTop: "30px" }}>{renderTableDonations()}</div>
		</Wrapper>
	)
}
