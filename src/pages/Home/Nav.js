import React from 'react'
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div className='nav'>
            <Link to="/" className="App-link">
                <span>Krypto</span>
            </Link>

            <Link to="/" className="App-link">
                Home
            </Link>

            <Link to="/crypto" className="App-link">
                Crypto
            </Link>

            <Link to="/eth-scan" className="App-link">
                EthScan
            </Link>

            <hr />
        </div>
    )
}

export default Nav