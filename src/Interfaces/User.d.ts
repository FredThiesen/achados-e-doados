import { UserAddress } from "./UserAddress"

export interface User {
	id?: string
	name: string
	token?: string
	address: UserAddress
}
