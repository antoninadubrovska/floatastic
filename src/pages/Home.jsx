import heroPage from "../assets/hero-img/hero-page.webp";

const Home = () => {
	return (
		<div>
			{/* TODO: proper bg img */}

			<img src={heroPage} alt="Hero" className="hero-image" />

			<h2 className="hero-h"> Float Into Fun! </h2>
			<p className="hero-p">
				{" "}
				Discover bold, funny inflatables made for sunny days.{" "}
			</p>
		</div>
	);
};

export default Home;
