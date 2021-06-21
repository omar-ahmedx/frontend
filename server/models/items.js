const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  description: { type: String, required: true },
  quantity: { type: Number },
  price: { type: Number },
});

module.exports = mongoose.model("Item", ItemSchema);
