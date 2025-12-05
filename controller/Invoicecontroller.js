import Invoice from "../models/invoice.js";
import PDFDocument from "pdfkit";
import fs from "fs";

// ➤ Add Invoice
export const addInvoice = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    const nextInvoiceNo = invoices.length + 1;

    const newInvoice = new Invoice({
      invoiceNo: nextInvoiceNo,
      ...req.body
    });

    await newInvoice.save();

    res.json({ success: true, invoice: newInvoice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding invoice" });
  }
};

// ➤ Get All Invoices
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching invoices" });
  }
};

// ➤ Generate Invoice PDF
export const generateInvoicePDF = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice)
      return res.status(404).json({ message: "Invoice not found" });

    const filePath = `invoice-${invoice.invoiceNo}.pdf`;

    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Header
    doc.fontSize(22).text("INVOICE", { align: "center" });
    doc.moveDown();

    // Customer Details
    doc.fontSize(14).text(`Invoice No  : ${invoice.invoiceNo}`);
    doc.text(`Customer    : ${invoice.customerName}`);
    doc.text(`Email       : ${invoice.customerEmail}`);
    doc.text(`Date        : ${invoice.date.toDateString()}`);
    doc.moveDown();

    // --------------------------
    // TABLE HEADER
    // --------------------------
    doc.fontSize(14);
    doc.text("Item", 50, doc.y, { width: 200, bold: true });
    doc.text("Qty", 260, doc.y, { width: 100, align: "center" });
    doc.text("Price", 350, doc.y, { width: 100, align: "right" });

    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    // --------------------------
    // TABLE ROWS
    // --------------------------
    invoice.items.forEach((item) => {
      doc.moveDown(0.5);

      doc.text(item.name, 50, doc.y, { width: 200 });
      doc.text(item.qty.toString(), 260, doc.y, { width: 100, align: "center" });
      doc.text(`₹${item.price}`, 350, doc.y, { width: 100, align: "right" });
    });

    // Line Separator
    doc.moveDown();
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    // --------------------------
    // TOTAL SECTION
    // --------------------------
    doc.fontSize(16).text(`Total: ₹${invoice.total}`, 350, doc.y + 10, {
      width: 200,
      align: "right",
    });

    doc.end();

    stream.on("finish", () => {
      return res.download(filePath);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating invoice PDF" });
  }
};



