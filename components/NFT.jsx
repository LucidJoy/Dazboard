import { Box, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNFTBalances } from "react-moralis";

import CustomContainer from "./CustomContainer";

const NFT = ({ user }) => {
  const { getNFTBalances, data } = useNFTBalances();

  useEffect(() => {
    getNFTBalances({
      params: {
        chain: "ropsten",
        address: user.get("ethAddress"),
      },
    });
  }, []);

  console.log(data);

  return (
    <CustomContainer>
      <Text fontSize='xl' fontWeight='bold'>
        My NFTs
      </Text>
      {data &&
        data.result.map((nft) => (
          <Box
            mt={4}
            px={2}
            py={2}
            borderWidth='1px'
            borderRadius='md'
            key={nft.token_uri}
          >
            {nft.image && <Image src={nft.image} />}
            <p>{nft.token_uri}</p>
          </Box>
        ))}
    </CustomContainer>
  );
};

export default NFT;
