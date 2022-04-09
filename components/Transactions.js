import { Divider, Link, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';
import CustomContainer from './CustomContainer';

export default function Transactions({ user }) {
  const [transactions, setTranactions] = useState([]);

  const Web3Api = useMoralisWeb3Api();
  const BASE_URL = "https://ropsten.etherscan.io/tx/";

  const fetchTransactions = async () => {
    const txData = await Web3Api.account.getTransactions({
      chain: "ropsten",
      address: user.get("ethAddress"),
      limit: 5
    }).catch((e) => console.log(e));
    if (txData) {
      setTranactions(txData.result);
    };
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  console.log("tx:", transactions);

  return (
    <CustomContainer>
      <Text fontSize="xl" mb="6" fontWeight="bold">My last 5 transactions</Text>
      {transactions && transactions.map((transaction) => (
        <div key={transaction.hash}>
          <Link href={`${BASE_URL}${transaction.hash}`}>{transaction.hash}</Link>
          <Divider />
        </div>


      ))}
    </CustomContainer>
  );
};
