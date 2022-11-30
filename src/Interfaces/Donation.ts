import { Product } from "./Product"

export enum DonationStatusEnum {
	PENDING = "PENDING",
	APPROVED = "APPROVED",
	REJECTED = "REJECTED",
	CONCLUDED = "CONCLUDED",
}
export enum DonationTipeEnum {
	PICKUP = "PICKUP",
	DELIVERY = "DELIVERY",
}

export interface Item {
	quantity: number
	product: Product
}
export interface Donation {
	id: number
	userName: string
	itens: Array<Item>
	status: DonationStatusEnum
	donationDate?: Date
}
export interface itemDonation {
	id: number
	product: Product
	quantity: number
}
