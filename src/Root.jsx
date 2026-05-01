import { Outlet } from "react-router";
// import "./Root.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./layout.css";

function Root() {
	return (
		<div className="app">
			<Header />

			<main>
				<Outlet />
			</main>

			<Footer />
			{/* {location.pathname !== "/cart" && <Footer />} */}
		</div>
	);
}

export default Root;
