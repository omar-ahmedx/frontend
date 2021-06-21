import React from "react";

function Create(props) {
  const [type, setType] = React.useState("quantity");
  const [itemsList, setItemsList] = React.useState([]);
  const [quant, setQuant] = React.useState({ quant: 0 });
  const [rate, setRate] = React.useState({ rate: 0 });
  const [amount, setAmount] = React.useState({ amount_: 0, amount_0: 0 });
  const [firstValue, setFirstValue] = React.useState("");
  const [secValue, setSecValue] = React.useState("");
  const [totalCell, setTotalCell] = React.useState("_");

  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    let multiplay = +quant[firstValue] * +rate[secValue];
    if (multiplay === undefined || isNaN(multiplay)) {
      multiplay = 0.0;
    } else {
      multiplay = +quant[firstValue] * +rate[secValue];
    }
    setAmount((prevStates) => ({
      ...prevStates,
      [`amount${totalCell}`]: multiplay,
    }));
    console.log(amount);
    console.log(amount[`amount_${itemsList.length - 1}`]);
  }, [itemsList.length, firstValue, secValue, quant, rate]);

  const onAdd = () => {
    setItemsList(itemsList.concat(Item));
  };

  function quantChange(et) {
    setQuant((prevStates) => ({
      ...prevStates,
      [et.target.id]: et.target.value,
    }));
    setFirstValue(et.target.id);
    setTotalCell(et.target.dataset.amount);
  }

  function rateChange(et) {
    setRate((prevStates) => ({
      ...prevStates,
      [et.target.id]: et.target.value,
    }));
    setSecValue(et.target.id);
    setTotalCell(et.target.dataset.amount);
  }
  let thead;
  if (type === "quantity") {
    thead = (
      <tr>
        <th id="left">Description</th>
        <th className="right">Quantity</th>
        <th className="right">Price</th>
        <th className="right">Amount</th>
      </tr>
    );
  } else if (type === "hours") {
    thead = (
      <tr>
        <th id="left">Description</th>
        <th className="right">Hours</th>
        <th className="right">Rate</th>
        <th className="right">Amount</th>
      </tr>
    );
  }

  const Item = (
    <tbody key={itemsList.length}>
      <tr>
        <td id="space" colSpan="4"></td>
      </tr>
      <tr>
        <td className="td-create">
          <input type="text" placeholder="Item Name" />
        </td>

        <td className="td-right td-create quant">
          <input
            data-amount={`_${itemsList.length}`}
            id={`quant${itemsList.length}`}
            type="number"
            onChange={(et) => quantChange(et)}
            placeholder="0"
          />
        </td>
        <td className="td-right td-create rate">
          <input
            data-amount={`_${itemsList.length}`}
            id={`rate${itemsList.length}`}
            type="number"
            placeholder="0.00"
            min="1"
            onChange={(et) => rateChange(et)}
            step=".01"
          />
        </td>
        {/*Unfinished because of the time */}

        <td className="td-right td-create amount">
          <input
            id={`amount${itemsList.length}`}
            type="number"
            placeholder="00"
            step=".01"
          />
        </td>
      </tr>
    </tbody>
  );

  return (
    <div className="items-container">
      <div className="customize-container">
        <h2>Customize</h2>

        <div className="options">
          <select name="item-type" id="item-type">
            <option onClick={() => setType("quantity")} value="quantity">
              Quantity
            </option>
            <option onClick={() => setType("hours")} value="hours">
              Hours
            </option>
          </select>

          <select name="currency" id="currency">
            <option onClick={() => props.currency("USD")} value="usd">
              USD - U.S. Dollars
            </option>
            <option onClick={() => props.currency("AUD")} value="aud">
              AUD - Australian Dollars
            </option>
            <option onClick={() => props.currency("EUR")} value="eur">
              EUR - Euros
            </option>
          </select>
        </div>
      </div>

      <div className="item">
        <table>
          <thead>{thead}</thead>
          <tbody>
            <tr>
              <td id="space" colSpan="4"></td>
            </tr>
            <tr>
              <td className="td-create">
                <input type="text" placeholder="Item Name" />
              </td>

              <td className="td-right td-create quant">
                <input
                  data-amount="_"
                  id="quant"
                  type="number"
                  onChange={(et) => quantChange(et)}
                  placeholder="0"
                />
              </td>
              <td className="td-right td-create rate">
                <input
                  data-amount="_"
                  id="rate"
                  type="number"
                  placeholder="0.00"
                  min="1"
                  step=".01"
                  onChange={(et) => rateChange(et)}
                />
              </td>
              {/*Unfinished because of the time */}

              <td className="td-right td-create amount">
                <input id="amount" type="number" placeholder="00" step=".01" />
              </td>
            </tr>
          </tbody>
          {itemsList}
        </table>
      </div>

      <button onClick={onAdd} className="add-btn">
        Add another line item
      </button>
    </div>
  );
}

export default Create;
