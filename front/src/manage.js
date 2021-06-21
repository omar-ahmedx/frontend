import React from "react";
import Moment from "moment";
import "./css/manage.css";
function Manage() {
  const [data, setData] = React.useState([]);
  const [filter, setFilter] = React.useState("all");
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  const dataArray = data || [""];

  let invoices;

  if (filter === "all") {
    invoices = dataArray.map((invoice, key) => (
      <tr key={key}>
        <td className="td-manage">
          {Moment(invoice.dueDate).format("MMMM D, YYYY")}
        </td>

        <td className="invoice-num td-manage">{invoice.invoice_number}</td>

        <td className="td-manage">{invoice.recipient}</td>

        {invoice.paid === true ? (
          <td className="paid td-manage">Paid</td>
        ) : (
          <td className="unpaid td-manage">UnPaid</td>
        )}

        <td className="manage-amount td-manage">{invoice.amount}</td>
      </tr>
    ));
  } else if (filter === "paid") {
    invoices = dataArray
      .filter((invoice) => invoice.paid === true)
      .map((invoice, key) => (
        <tr key={key}>
          <td className="td-manage">
            {Moment(invoice.dueDate).format("MMMM D, YYYY")}
          </td>
          <td className="invoice-num td-manage">{invoice.invoice_number}</td>
          <td className="td-manage">{invoice.recipient}</td>
          {invoice.paid === true ? (
            <td className="paid td-manage">Paid</td>
          ) : (
            <td className="unpaid td-manage">UnPaid</td>
          )}
          <td className="manage-amount td-manage">{invoice.amount}</td>
        </tr>
      ));
  } else if (filter === "unpaid") {
    invoices = dataArray
      .filter((invoice) => invoice.paid === false)
      .map((invoice, key) => (
        <tr key={key}>
          <td className="td-manage">
            {Moment(invoice.dueDate).format("MMMM D, YYYY")}
          </td>
          <td className="invoice-num td-manage">{invoice.invoice_number}</td>
          <td className="td-manage">{invoice.recipient}</td>
          {invoice.paid === true ? (
            <td className="paid td-manage">Paid</td>
          ) : (
            <td className="unpaid td-manage">UnPaid</td>
          )}
          <td className="manage-amount td-manage">{invoice.amount}</td>
        </tr>
      ));
  } else if (filter === "late") {
    invoices = dataArray
      .filter(
        (invoice) =>
          Moment(invoice.dueDate).format("DDD") < Moment().dayOfYear() &&
          invoice.paid === false
      )
      .map((invoice, key) => (
        <tr key={key}>
          <td className="td-manage">
            {Moment(invoice.dueDate).format("MMMM D, YYYY")}
          </td>
          <td className="invoice-num td-manage">{invoice.invoice_number}</td>
          <td className="td-manage">{invoice.recipient}</td>
          {invoice.paid === true ? (
            <td className="paid td-manage">Paid</td>
          ) : (
            <td className="unpaid td-manage">UnPaid</td>
          )}
          <td className="manage-amount td-manage">{invoice.amount}</td>
        </tr>
      ));
  }

  return (
    <div>
      <h2 className="manage-h">Manage Invoices</h2>

      <div className="manage-btns">
        <button
          onClick={() => {
            setFilter("all");
            setActive(0);
          }}
          className={active === 0 ? "active" : ";"}
        >
          All
        </button>
        <button
          onClick={(et) => {
            setFilter("paid");
            setActive(1);
          }}
          className={active === 1 ? "active" : ";"}
        >
          Paid
        </button>
        <button
          onClick={() => {
            setFilter("unpaid");
            setActive(2);
          }}
          className={active === 2 ? "active" : ";"}
        >
          Unpaid
        </button>
        <button
          onClick={() => {
            setFilter("late");
            setActive(3);
          }}
          className={active === 3 ? "active" : ";"}
        >
          Late
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th className="th-manage left">Date</th>
            <th className="th-manage left">Invoice Number</th>
            <th className="th-manage left">Recipient</th>
            <th className="th-manage left">Status</th>
            <th className="th-manage left">Amount</th>
          </tr>
        </thead>
        <tbody>{invoices}</tbody>
      </table>
    </div>
  );
}

export default Manage;
