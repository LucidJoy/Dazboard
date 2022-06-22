import Head from "next/head";
import { useMoralis } from "react-moralis";
import {
  Flex,
  Text,
  Button,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import CustomContainer from "../components/CustomContainer";
import Balance from "../components/Balance";
import Transactions from "../components/Transactions";

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
        <Box flex={1} bgColor='purple.100' px='44' py='20'>
          <Tabs colorScheme='purple' align='center' variant='solid-rounded'>
            <TabList>
              <Tab fontWeight='bold'>Profile</Tab>
              <Tab fontWeight='bold'>Balance</Tab>
              <Tab fontWeight='bold'>Transactions</Tab>
              <Tab fontWeight='bold'>NFTs</Tab>
              <Tab fontWeight='bold'>Send ETH</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Profile user={user} />
              </TabPanel>
              <TabPanel>
                <Balance user={user} />
              </TabPanel>
              <TabPanel>
                <Transactions user={user} />
              </TabPanel>
              <TabPanel>NFTs</TabPanel>
              <TabPanel>Send ETH</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  );
}
