export interface User {
	id?: string
	name: string
	token?: string
	address:Addres
}
export interface Address{
	city: string
	state: string
	addressNumber: string
	complement?: string
}
