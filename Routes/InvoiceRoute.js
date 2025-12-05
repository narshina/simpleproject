import express from "express";
import { addInvoice, generateInvoicePDF, getInvoices } from "../controller/Invoicecontroller.js";


const router = express.Router();

router.post("/add", addInvoice);
router.get("/", getInvoices);
router.get("/pdf/:id", generateInvoicePDF);

export default router;
