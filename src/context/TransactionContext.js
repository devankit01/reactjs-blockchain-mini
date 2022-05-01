import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";

import { contractabi, contractAddress } from '../utils/constants';


export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractabi, signer);

    console.log({
        provider,
        signer,
        transactionsContract
    })

    return transactionsContract;
}


export const TransactionProvider = ({ children }) => {

    const [connectAccount, setconnectAccount] = useState('');
    const [formdata, setformdata] = useState({ addressTo: '', amount: '', keyword: '', message: '' })
    const [isloading, setisloading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);


    // Handle formdata
    const handleChange = (e, name) => {
        console.log(e)
        setformdata((formdata) => ({ ...formdata, [e.target.name]: e.target.value }));
        console.log(formdata)
    }

    const getAllTransactions = async () => {
        const transactionsContract = getEthereumContract();
        const transactions = await transactionsContract.getAllTransactions();
        console.log('All Transactions  : ', transactions)
        setTransactions(transactions);
    }

    // Check MetaMask Connection
    const checkMetaMaskisConnected = async () => {

        if (!ethereum) return alert('Please install Metamask wallet');


        // Get All Accounts
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log('MetaMask Logged Account : ', accounts[0])
        
        getAllTransactions();


        if (accounts.length) {
            setconnectAccount(accounts[0])


        } else {
            console.log('No accounts found')
        }
    }


    // Connect MetaMask
    const connectWallet = async () => {
        try {

            if (!ethereum) return alert('Please install Metamask wallet');
            // Set Account
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
            setconnectAccount(accounts[0])

            // Get All Transactions
            getAllTransactions();



        } catch (error) {
            console.log(error)
        }

    }

    // Perform Transaction
    const sendTransaction = async () => {
        console.log('Send Transaction')
        const { addressTo, amount, keyword, message } = formdata;

        // Get Contract
        const transactionsContract = getEthereumContract();
        console.log(transactionsContract)
        const parsedamount = ethers.utils.parseEther(amount)

        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: connectAccount,
                to: addressTo,
                gas: '0x5208', // Hex value of Gas in Gwei 21000,
                value: parsedamount._hex,

            }]
        })

        // Store Transaction to Blockchain
        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedamount, message, keyword);
        setisloading(true)
        await transactionHash.wait();
        setisloading(false)
        console.log('Transaction Hash : ', transactionHash.hash)

        // Get All Transaction Count 
        const transactionCount = await transactionsContract.getTransactionsCount();
        setTransactionCount(transactionCount.toNumber())
        console.log('Transaction Count : ', Number(transactionCount))



    }



    // OnLoad Window
    useEffect(() => {
        checkMetaMaskisConnected();
    }, []);


    return (
        <TransactionContext.Provider value={{ connectWallet, connectAccount, formdata, setformdata, handleChange, sendTransaction, transactions }} >
            {children}
        </ TransactionContext.Provider >
    )
}