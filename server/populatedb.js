const userArgs = process.argv.slice(2);

const async = require("async");
const Company = require("./models/companyInfo");
const Invoice = require("./models/invoices");
const Item = require("./models/items");

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { userNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));

const companyInfos = [];
const invoices = [];
const items = [];

function companyCreate(company_name, company_image, invoices, cb) {
  companyDetails = {
    company_name,
    company_image,
    invoices,
  };

  const companyInfo = new Company(companyDetails);

  companyInfo.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Company Info: " + companyInfo);
    companyInfos.push(companyInfo);
    cb(null, companyInfo);
  });
}

function invoiceCreate(paid, invoice_number, items, dueDate, amount, cb) {
  invoiceDetailes = { paid, invoice_number, items, dueDate, amount };

  const invoice = new Invoice(invoiceDetailes);
  invoice.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New invoice: " + invoice);
    invoices.push(invoice);
    cb(null, invoice);
  });
}

function itemCreate(description, quantity, price, cb) {
  itemDetails = { description, quantity, price };
  const itemContent = new Item(itemDetails);

  itemContent.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New item: " + itemContent);
    items.push(itemContent);
    cb(null, itemContent);
  });
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate("Item A", 3, 5, callback);
      },
      function (callback) {
        itemCreate("Item B", 2, 10, callback);
      },
      function (callback) {
        itemCreate("Item C", 4, 15, callback);
      },
      function (callback) {
        itemCreate("Item D", 1, 20, callback);
      },
      function (callback) {
        itemCreate("Item E", 4, 25, callback);
      },
    ],
    cb
  );
}

function createInvoices(cb) {
  async.parallel(
    [
      function (callback) {
        invoiceCreate(
          true,
          1,
          [items[0], items[1], items[2], items[3], items[4]],
          "01/02/2021",
          215,
          callback
        );
      },
      function (callback) {
        invoiceCreate(
          false,
          2,
          [items[0], items[1], items[2]],
          "06/26/2021",
          95,
          callback
        );
      },
      function (callback) {
        invoiceCreate(
          false,
          3,
          [items[0], items[1], items[2], items[3]],
          "01/06/2021",
          115,
          callback
        );
      },
    ],
    cb
  );
}

function createCompany(cb) {
  async.parallel(
    [
      function (callback) {
        companyCreate(
          "company",
          null,
          [invoices[0], invoices[1], invoices[2]],
          callback
        );
      },
    ],
    cb
  );
}

async.series(
  [createItems, createInvoices, createCompany],
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Company: " + companyInfos);
    }
    mongoose.connection.close();
  }
);
