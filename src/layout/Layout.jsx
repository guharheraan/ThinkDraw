import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import store from "../components/store";

const Layout = () => {
	return (
		<div>
			<Provider store={store}>
				<Outlet />
			</Provider>
		</div>
	);
};

export default Layout;
