import Axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../Home/Nav";
import './style.css';


export function Ethscan() {

  const [records, setrecords] = useState();
  const [acc, setacc] = useState('');

  const getdata = (account) => {
    console.log(account)
    Axios.get(
      `https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${account}&sort=desc`
    ).then((res) => {

      if (res.data.result.length > 0) {
        setrecords(res.data.result);

      }
      else {
        setrecords(false)
      }

      console.log(res.data.result.length)

      // setrecords(false)

    });
  };

  const handleSubmit = () => {
    // console.log(acc);
    getdata(acc);
  }

  const convertDate = (val) => {
    // console.log(val.timeStamp)
    let date = new Date(Number(val.timeStamp) * 1000).toLocaleString();
    return date;
  }

  return (
    <div className="App crypto">
      <Nav />
      <h1>Get Transactions</h1>
      <input
        type="text"
        class="input_box"
        placeholder="Search for address"
        onChange={(e) => {
          setacc(e.target.value);
        }}
      />
      <button onClick={handleSubmit} class='btn'>Search</button>
      <br />
      <br />

      <div className="crypto__coins">
        {records &&
          <div >
            <table>
              <tr>

                <th>HashID</th>
                <th>Timestamp</th>

                <th>Block Number</th>
                <th>Message</th>

                <th>From</th>
                <th>To</th>

                <th>Ethereum (Send/Receive)</th>



              </tr>
              {records.map((val, id) => {
                return (
                  <>
                    <tr key={id}>
                      <td className="rank">{val.hash.slice(0, 10)}..</td>
                      <td className="">{convertDate(val)}</td>

                      <td className="">{val.blockNumber}</td>
                      <td>{val.value / 10 ** 18 == 0 ? 'Info Added to blockchain ' : val.value / 10 ** 18 == 0.1 ? 'Added Ethereum from Testnet' : 'Transferred Ethereum'}</td>

                      <td>{val.from.slice(0, 10)}..</td>

                      <td>{val.to.slice(0, 10) ? val.to.slice(0, 10) + '..' : 'Contract Creation'}</td>

                      <td>{val.value / 10 ** 18}</td>


                    </tr>
                  </>
                );
              })}


            </table>
          </div>
        }

        {!records && 'No Address'}
      </div>
    </div>
  )
}

