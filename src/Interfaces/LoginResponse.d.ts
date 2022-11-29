import { UserAddress } from "./UserAddress"

export interface LoginResponse {
	address: UserAddress
	name: string
	roles: string
	token: string
	refreshToken: string
	username: string
}
