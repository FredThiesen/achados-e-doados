import UserAddress from "./UserAddress"

export interface SignInRequest {
	name: string
	username: string
	password: string
	address: UserAddress
}
