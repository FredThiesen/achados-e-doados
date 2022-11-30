import { createBrowserRouter, Navigate } from "react-router-dom"

import { AuthLogin } from "../Screens/AuthLogin"
import { AuthSignup } from "../Screens/AuthSignup"
import { Donation } from "../Screens/Donation"
import { Home } from "../Screens/Home"
import { Landing } from "../Screens/Landing"
import { SessionExpired } from "../Screens/SessionExpired"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
		errorElement: <Navigate to="/" />,
	},
	{
		path: "/home",
		element: <Home />,
		errorElement: <Navigate to="/" />,
	},

	{
		path: "/login",
		element: <AuthLogin />,
		errorElement: <Navigate to="/" />,
	},
	{
		path: "/signup",
		element: <AuthSignup />,
		errorElement: <Navigate to="/" />,
	},
	{
		path: "/donation",
		element: <Donation />,
		errorElement: <Navigate to="/" />,
	},
])
