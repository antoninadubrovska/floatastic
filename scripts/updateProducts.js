import admin from "firebase-admin"

import serviceAccount from "../serviceAccountKey.js"
import products from "../src/data/products.js"


// TODO: put where it belongs : overwrite all product fields, add new fields
// keep Firestore document ids aligned with product ids

//.set(product) replaces the document with the full new object while .update(...)
// only updates specific fields.

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

// const products = [

//   // products here
// ]

async function updateProducts() {
  try {
    for (const product of products) {
      await db.collection("products").doc(product.id).set(product)

      console.log(` Updated product ${product.id}`)
    }

    console.log("All products updated successfully")
  } catch (error) {
    console.error("Error updating products:", error)
  }
}

updateProducts()