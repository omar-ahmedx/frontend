import React from "react";
import Buttons from "./components/buttons";
import Info from "./components/info";
import Items from "./components/items";
import "./css/create.css";
function Create() {
  const [currency, setCurrency] = React.useState("USD");

  return (
    <div className="create-container">
      <header>
        <h1>Create Invoice</h1>
        <Buttons />
      </header>
      <Info />

      <div className="bill">
        <label htmlFor="bill">Bill to:</label>
        <input
          type="email"
          id="bill"
          name="bill"
          placeholder="Email Address or Name"
          required
        />
      </div>

      <Items currency={setCurrency} />
      {/*Unfinished because of the time */}

      <div className="total-container">
        <table className="total-table">
          <tbody>
            <tr>
              <th className="total-header">Total</th>
              <td className="total-value td-create">00 {currency}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="note-total">
        <label htmlFor="note">Note to recipient:</label>
        <textarea
          rows="5"
          className="note"
          id="note"
          name="note"
          placeholder='Example: "Thank you for your business"'
        />
      </div>

      <Buttons />
    </div>
  );
}

export default Create;
