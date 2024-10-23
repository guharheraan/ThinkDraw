import { Provider } from "react-redux";
import store from "./components/store";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Layout from "./layout/Layout";
import LandingPage from "./pages/landingPage/LandingPage";
import DashboardPage from "./pages/dashboardPage/DashboardPage";
import NewFlowComponent from "./pages/dashboardPage/dashComponents/newFlowComponent"; // Import the new component

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Layout />}>
				<Route index element={<LandingPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/dashboard/:divId" element={<NewFlowComponent />} />
			</Route>,
		),
	);

	return (
		<>
			<Provider store={store}>
				<KindeProvider
					clientId="221022720ecd41dbb4f0a05ff82794fd"
					domain="https://guharism.kinde.com"
					redirectUri="http://localhost:5173/dashboard"
					logoutUri="http://localhost:5173"
				>
					<RouterProvider router={router} />
				</KindeProvider>
			</Provider>
		</>
	);
}

export default App;
