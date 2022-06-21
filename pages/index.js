import { Flex, Text, Button } from "@chakra-ui/react";
import Head from "next/head";
import { useMoralis } from "react-moralis";

import Navbar from "../components/Navbar";

export default function Home() {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis();

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | Dazboard</title>
        </Head>
        <Flex
          direction='column'
          justifyContent='center'
          alignItems='center'
          width='100vw'
          height='100vh'
          bgGradient='linear(to-br, teal.400, purple.300)'
        >
          <Text fontSize='5xl' fontWeight='bold' color='white'>
            Dazboard
          </Text>
          <Button
            fontWeight='600'
            colorScheme='purple'
            size='lg'
            mt='6'
            onClick={() =>
              authenticate({
                signingMessage: "Sign to access Dazboard",
              })
            }
          >
            Login with Metamask
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dazboard</title>
      </Head>
      <Flex direction='column' width='100vw' height='100vh'>
        <Navbar user={user} logout={logout} isLoggingOut={isLoggingOut} />
      </Flex>
    </>
  );
}
