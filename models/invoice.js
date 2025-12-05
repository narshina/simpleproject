import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceNo: Number,
  customerName: String,
  customerEmail: String,
  items: [
    {
      name: String,
      qty: Number,
      price: Number
    }
  ],
  total: Number,
  date: { type: Date, default: Date.now }
});
const Invoice= mongoose.model("Invoice", invoiceSchema);
export default Invoice;