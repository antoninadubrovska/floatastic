import { useRef } from "react";

export const useScroll = () => {
	const formRef = useRef(null);

	const scrollToForm = () => {
		formRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return {
		formRef,
		scrollToForm,
		scrollToTop,
	};
};


//TODO: <button onClick={scrollToTop}>Back to top</button>


