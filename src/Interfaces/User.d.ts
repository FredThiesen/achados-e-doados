import { UserAddress } from "./UserAddress"

export interface User {
	id?: string
	name: string
	username?: string
	token?: string
	address: UserAddress
	roles?: string
}
