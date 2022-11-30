import { Item } from "./Donation"

export interface DonationRequest {
	userName?: string
	itens: Array<Item>
	donationDate: Date
}
