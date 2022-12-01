import { Donation, DonationStatusEnum } from "../Interfaces/Donation"
import { DonationRequest } from "../Interfaces/DonationRequest"
import { ProductCategoryEnum } from "../Interfaces/Product"
import { axiosRequest } from "../Services"

export const useDonations = () => {
	const getAllDonations = async () => {
		const resp = await axiosRequest.get(`donations`)
		if (resp.status === 200) {
			return resp.data
		}
		return []
	}

	const getUserDonations = async (username: string) => {
		const resp = await axiosRequest.get(`donations/${username}`)
		if (resp.status === 200) {
			return resp.data
		}
		return []
	}

	const createDonation = async (donation: DonationRequest) => {
		const resp = await axiosRequest.post(`donations`, donation)
		if (resp?.status === 201) {
			return true
		}
		return false
	}

	const getProducts = async () => {
		const resp = await axiosRequest.get(`products/donation`)
		if (resp.status === 200) {
			return resp.data
		}
		return []
	}

	const getCategoryName = (category: ProductCategoryEnum) => {
		switch (category) {
			case ProductCategoryEnum.ELETRODOMESTIC:
				return "Eletrodomésticos"
			case ProductCategoryEnum.BEDROOM:
				return "Quarto"
			case ProductCategoryEnum.CLOTHES:
				return "Roupas"
			case ProductCategoryEnum.KITCHEN:
				return "Cozinha"
			case ProductCategoryEnum.TOYS:
				return "Brinquedos"
			case ProductCategoryEnum.FURNITURE:
				return "Móveis"
			// case ProductCategoryEnum.OTHER:
			// 	return "Outros"
			default:
				return ""
		}
	}

	const getDonationStatus = (status: DonationStatusEnum) => {
		switch (status) {
			case DonationStatusEnum.APPROVED:
				return "Aprovado"
			case DonationStatusEnum.PENDING:
				return "Pendente"
			case DonationStatusEnum.REJECTED:
				return "Rejeitado"
			case DonationStatusEnum.CONCLUDED:
				return "Concluído"
			default:
				return ""
		}
	}

	return {
		getAllDonations,
		getUserDonations,
		createDonation,
		getProducts,
		getCategoryName,
		getDonationStatus,
	}
}
