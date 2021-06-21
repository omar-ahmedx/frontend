const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  company_name: { type: String, required: true },
  company_image: { type: Buffer, contentType: String },
  invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
});

module.exports = mongoose.model("Company", CompanySchema);
