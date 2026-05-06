

// import { db } from "./database";
// import { doc, setDoc } from "firebase/firestore";
// import products from "./products";



// // option 1: new IDs
// // const uploadProducts = async () => {
// //   for (const product of products) {
// // 	  await setDoc(doc(db, "products", product.id), product);
// // 	  console.log("Uploading:", product.id);
// //   }
// // };

// // uploadProducts();

// //option 2: existing IDs - executed
// const uploadProducts = async () => {
// 	console.log("Starting upload...");

// 	try {
// 	  for (const product of products) {
// 		console.log("Uploading:", product.id);

// 		await setDoc(doc(db, "products", product.id), product);
// 	  }

// 	  console.log("Upload finished!");
// 	} catch (error) {
// 	  console.error("Upload failed:", error);
// 	}
//   };

//   uploadProducts();