import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";

export const useProductImage = (imagePath) => {
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		if (!imagePath) return;

		getImageUrl(imagePath).then(setImageUrl);
	}, [imagePath]);

	return imageUrl;
};