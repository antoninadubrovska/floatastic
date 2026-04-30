import { useMemo } from "react";
import Fuse from "fuse.js";



export const useFuseSearch = (data, search, keys) => {
	const fuse = useMemo(() => {
		return new Fuse(data, { keys, threshold: 0.4 });
	}, [data, keys]);


	return useMemo(() => {
		if (!search) return data;


			return fuse.search(search).map((r) => r.item);
		}, [search, fuse, data]);
	  }