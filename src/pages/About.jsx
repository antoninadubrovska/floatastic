import { Link } from 'react-router'

const About = () => {
  return (
		<div className="about-page">
			<h2 className="about-h"> About us </h2>
			<p>
				{" "}
				Welcome to{" "}
				<Link to="/" className="logo-link">
					<span className="float">Float</span>
					<span className="astic">astic</span>
				</Link>
				, where summer fun meets ultimate relaxation. We design playful,
				high-quality pool floats that turn every swim into a mini
				escape — whether you're lounging in the sun, hosting pool parties,
				or just floating your worries away.{" "}
			</p>
		</div>
  );
};

export default About;
