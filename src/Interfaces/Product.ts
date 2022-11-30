export enum ProductCategoryEnum {
	ELETRODOMESTIC = "ELETRODOMESTIC",
	TOYS = "TOYS",
	CLOTHES = "CLOTHES",
	KITCHEN = "KITCHEN",
	BEDROOM = "BEDROOM",
	FURNITURE = "FURNITURE",
}

export interface Product {
	id: number
	category: string
	description: string
	enabled?: boolean
}
