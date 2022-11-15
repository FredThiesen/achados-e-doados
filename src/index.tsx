import React from "react"
import ReactDOM from "react-dom/client"
import GlobalStyle from "./globalStyle"
import { UserProvider } from "./Contexts/User"
import { router } from "./Routes/Router"
import { RouterProvider } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	//<React.StrictMode>
		<>
			<GlobalStyle />
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
		</>
	//</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
