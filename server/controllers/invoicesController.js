const Invoice = require("../models/invoices");

exports.index = function (req, res, next) {
  Invoice.find({})
    .populate("items")
    .exec(function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    });
};
