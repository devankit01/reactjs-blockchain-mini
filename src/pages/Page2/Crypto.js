import Axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../Home/Nav";

import './style.css';


export function Crypto() {
    const [search, setSearch] = useState("");
    const [crypto, setCrypto] = useState([]);

    useEffect(() => {
        Axios.get(
            `https://api.coinstats.app/public/v1/coins?skip=0&limit=50&currency=INR`
        ).then((res) => {
            setCrypto(res.data.coins);
            console.log(res.data.coins)
        });
    }, []);

    return (

        <div className="App crypto">
            <Nav />
            <h1>All Cryptocurrencies</h1>
            <input
                type="text"
                class='input_box'
                placeholder="Search..."
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <br />
            <br />

            <div className="crypto__coins">

                <div >
                    <table>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>Price Change (1 H)</th>
                            <th>Price Change (1 D)</th>
                            <th>Price Change (1 W)</th>


                        </tr>
                        {crypto
                            .filter((val) => {
                                return val.name.toLowerCase().includes(search.toLowerCase());
                            })
                            .map((val, id) => {
                                return (
                                    <>
                                        <tr key={id}>
                                            <td className="rank">{val.rank}</td>
                                            <td className="logo">
                                                <a href={val.websiteUrl}>
                                                    <img src={val.icon} alt="logo" width="30px" />
                                                </a>

                                                <p>{val.name}</p>

                                            </td>
                                            <td className="symbol">{val.symbol}</td>

                                            <td>₹{val.price}</td>
                                            <td>  {(val.priceChange1h) > 0 ? (
                                                <span className="green">{val.priceChange1h}</span>
                                            ) : (
                                                <span className="red">{val.priceChange1h}</span>
                                            )}</td>
                                            <td>  {(val.priceChange1d) > 0 ? (
                                                <span className="green">{val.priceChange1d}</span>
                                            ) : (
                                                <span className="red">{val.priceChange1d}</span>
                                            )}</td>
                                            <td>  {(val.priceChange1d) > 0 ? (
                                                <span className="green">{val.priceChange1w}</span>
                                            ) : (
                                                <span className="red">{val.priceChange1w}</span>
                                            )}</td>

                                        </tr>
                                    </>
                                );
                            })}


                    </table>
                </div>

            </div>
        </div>
    );
}
