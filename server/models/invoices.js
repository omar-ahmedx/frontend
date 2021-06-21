const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  paid: { type: Boolean, required: true, default: false },
  invoice_number: { type: Number, required: true, unique: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  dueDate: { type: Date, required: true },
  amount: { type: Number },
});

InvoiceSchema.virtual("date").get(function () {
  return DateTime.DATE_MED(dueDate);
});
module.exports = mongoose.model("Invoice", InvoiceSchema);
