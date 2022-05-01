
import './style.css';


import React, { useContext } from "react";
import { TransactionContext } from '../../context/TransactionContext'
import Nav from '../Home/Nav';

export function Home() {

  const { connectWallet, connectAccount, formdata, sendformData, handleChange, sendTransaction, transactions } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    console.log('Form Submitted')
    const { addressTo, amount, keyword, message } = formdata;
    e.preventDefault();
    console.log('Form data : ', formdata)
    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  }

  // Date Convert
  const convertDate = (val) => {
    // console.log(val.timestamp)
    let date = new Date(Number(val.timestamp) * 1000).toLocaleString();
    return date;
  }


  return (
    <div className="App">

      <Nav />
      <br />
      {!connectAccount &&
        <button
          type="button"
          class="btn"
          onClick={connectWallet}
        >Connect wallet</button>}

      <h3>{connectAccount && <p>Logged Account : {connectAccount}</p>}</h3>

      <div className="main__row">
        <div>
          <h2>Transfer Ethereum </h2>
          <div class="form-group">
            <h5 for="" class="form-label mt-4">Account Address</h5>
            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Account Address" name="addressTo" onChange={handleChange} />

            <h5 for="" class="form-label mt-4">Amount</h5>
            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Amount" name="amount" onChange={handleChange} />
            <h5 for="" class="form-label mt-4">Add GIF</h5>
            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Add GIF" name="keyword" onChange={handleChange} />

            <h5 for="" class="form-label mt-4">Message </h5>
            <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Message" name="message" onChange={handleChange} />

            <br />
            <br />
            <button type="button" class="btn btn-primary mt-4" onClick={handleSubmit}>Send Now</button>
          </div>
        </div>

        <div>
          <div class="eth__card">
          <img src="https://img.icons8.com/fluency/48/000000/ethereum.png" />

            <h3>Premium Ethereum Card</h3>
            <h4>Account Address <br /> <br /> {connectAccount.slice(0, 30)}..</h4>
          </div>
        </div>
      </div>

      <div>
        <br />
        <hr />
        <br />
        <h2>All Contract Transactions</h2>

        <table>
          <tr>

            <th>Sender</th>
            <th>Receiver</th>
            <th>keyword</th>
            <th>Message</th>
            <th>Amount</th>
            <th>Timestamp</th>


          </tr>
          {transactions.map((val, id) => {
            return (
              <>
                <tr key={id}>
                  <td className="">{val.sender.slice(0, 10)}..</td>

                  <td className="">{val.receiver.slice(0, 10)}..</td>

                  <td>{val.keyword}</td>
                  <td>{val.message}</td>
                  <td>{Number(val.amount._hex) / 10 ** 18}</td>


                  <td>{convertDate(val)}</td>

                </tr>
              </>
            );
          })}


        </table>
      </div>
    </div >
  );
}
