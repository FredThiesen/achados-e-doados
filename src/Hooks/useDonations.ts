import { Donation } from "../Interfaces/Donation"
import { DonationRequest } from "../Interfaces/DonationRequest"
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
	return {
		getAllDonations,
		getUserDonations,
		createDonation,
		getProducts,
	}
}
