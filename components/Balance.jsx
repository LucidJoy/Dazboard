import React, { useEffect, useState } from "react";
import { Divider, Text } from "@chakra-ui/react";
import { useERC20Balances, useMoralisWeb3Api } from "react-moralis";
import Moralis from "moralis";

import CustomContainer from "./CustomContainer";

const Balance = ({ user }) => {
  const [ethBalance, setEthBalance] = useState(0);

  const web3Api = useMoralisWeb3Api();
  const { fetchERC20Balances, data } = useERC20Balances();

  const fetchNativeBalance = async () => {
    const result = await web3Api.account
      .getNativeBalance({
        chain: "ropsten",
        address: user.get("ethAddress"),
      })
      .catch((err) => console.log(err));

    if (result.balance) {
      setEthBalance(Moralis.Units.FromWei(result.balance));
    }
  };

  useEffect(() => {
    fetchNativeBalance();
    fetchERC20Balances({
      params: {
        chain: "ropsten",
        address: user.get("ethAddress"),
      },
    });
  }, []);

  console.log(data);

  return (
    <CustomContainer>
      <Text mb={6} fontSize='xl' fontWeight='bold'>
        My ERC20 Tokens
      </Text>
      {ethBalance && (
        <Text>
          💰&nbsp;{ethBalance} <b>ETH</b>
        </Text>
      )}
      <Divider />
      {data &&
        data.map((token) => (
          <div key={token.symbol}>
            <Text>
              💰&nbsp;{Moralis.Units.FromWei(token.balance)}{" "}
              <b>{token.symbol}</b>
            </Text>
          </div>
        ))}
    </CustomContainer>
  );
};

export default Balance;
