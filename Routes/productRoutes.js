import express from "express";
import upload from "../config/multer.js";
import { createProduct, getProducts } from "../controller/productController.js";

const productrouter = express.Router();

productrouter.post("/create", upload.single("image"), createProduct);
productrouter.get("/vproduct", getProducts);

export default productrouter;