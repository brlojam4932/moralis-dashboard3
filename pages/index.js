import { useMoralis } from "react-moralis";
import { Button, Flex, Text, Box, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Head from "next/dist/shared/lib/head";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Balance from "../components/Balance";
import Transactions from "../components/Transactions";
import NFT from "../components/NFT";
import Send from "../components/Send";


export default function Home() {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } = useMoralis();
  //console.log(isAuthenticated);
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | Dashboard3</title>
        </Head>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100vw"
          height="100vh"
          bgGradient="linear(to-br, teal.400, purple.300)"

        >
          <Text fontSize="5xl" fontWeight="bold" color="white">Dashboard3</Text>
          <Button color="blue.500" size="lg" onClick={() => authenticate({
            signingMessage: "Sign to login to Dashboard3"
          })}>Login with Metamask or Coinbase Link Wallet</Button>
        </Flex>

      </>
    );
  };
  return (
    <>
      <Head>
        <title>Dashboard3</title>
      </Head>
      <Flex direction="column" width="100vw" height="100vh">
        <Header user={user} logout={logout} isLoggingOut={isLoggingOut} />
        <Box flex="1" bg="blue.800" px="44" py="20">
          <Tabs size="lg" color="blue.100" align="center" variant="enclosed">
            <TabList>
              <Tab frontweight="bold">Profile</Tab>
              <Tab frontweight="bold">Balance</Tab>
              <Tab frontweight="bold">Transactions</Tab>
              <Tab frontweight="bold">NFTs</Tab>
              <Tab frontweight="bold">Send ETH</Tab>
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
              <TabPanel>
                <NFT user={user} />
              </TabPanel>
              <TabPanel>
                <Send user={user} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  )
}
