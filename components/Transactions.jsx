import { Divider, Link, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";

import CustomContainer from "./CustomContainer";

const Transactions = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const web3Api = useMoralisWeb3Api();
  const BASE_URL = `https://ropsten.etherscan.io/tx/`;

  const fetchTransactions = async () => {
    const data = await web3Api.account.getTransactions({
      chain: "ropsten",
      address: user.get("ethAddress"),
      limit: 5,
    });
    if (data) {
      setTransactions(data.result);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <CustomContainer>
      <Text fontSize='xl' mb={6} fontWeight='bold'>
        Last 5 transactions
      </Text>
      {transactions &&
        transactions.map((trans) => (
          <div key={trans.hash} style={{ marginBottom: "5px" }}>
            <Link
              href={`${BASE_URL}${trans.hash}`}
              isExternal
              style={{ textDecoration: "none" }}
            >
              ➡️&nbsp;{trans.hash}
            </Link>
            <Divider />
          </div>
        ))}
    </CustomContainer>
  );
};

export default Transactions;
