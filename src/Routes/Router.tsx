import { createBrowserRouter, Navigate } from "react-router-dom"

import { AuthLogin } from "../Screens/AuthLogin"
import { AuthSignup } from "../Screens/AuthSignup"
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
		path: "/session-expired",
		element: <SessionExpired />,
		errorElement: <Navigate to="/" />,
	},
])
