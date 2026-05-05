import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../data/database";

export const getImageUrl = async (path) => {
	const imageRef = ref(storage, path);
	return await getDownloadURL(imageRef);
};