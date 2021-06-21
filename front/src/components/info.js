import React from "react";
import Moment from "moment";

function Info() {
  return (
    <div className="info-container">
      <div className="image">
        <input type="file" accept="image" />
      </div>

      <div className="info">
        <label htmlFor="company-name">
          Company Name
          <input
            type="text"
            id="company-name"
            name="company-name"
            placeholder="Name"
          />
        </label>
        <label>
          Invoice Number
          <input
            type="number"
            required
            name="invoice-number"
            id="invoice-number"
            max="9999"
            min="1"
            placeholder="0000"
          />
        </label>

        <label>
          Due Date
          <input type="date" min={Moment(Date.now()).format("Y-MM-DD")} />
        </label>
      </div>
    </div>
  );
}

export default Info;
