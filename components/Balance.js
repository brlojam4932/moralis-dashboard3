import { Divider, Text } from "@chakra-ui/react";
import CustomContainer from "./CustomContainer";
import { useMoralisWeb3Api } from "react-moralis";
import { useEffect, useState } from "react";
import Moralis from "moralis";
import { useERC20Balances } from "react-moralis";


export default function Balance({ user }) {
  const [ethBalance, setEthBalance] = useState(0);

  const Web3Api = useMoralisWeb3Api();
  // another Moralis hook
  const { fetchERC20Balances, data } = useERC20Balances();

  const fetchNativeBalance = async () => {
    const result = await Web3Api.account.getNativeBalance({
      chain: "ropsten",
      address: user.get("ethAddress")
    }).catch((e) => console.log(e));
    //console.log(result);
    if (result) {
      setEthBalance(Moralis.Units.FromWei(result.balance));
    }
  };

  // we call the fetch... function when the components mount
  useEffect(() => {
    fetchNativeBalance();
    fetchERC20Balances({
      params: {
        chain: "ropsten",
        adress: user.get("ethAddress")
      }
    })
  }, []);

  //console.log(data);

  return (
    <CustomContainer>
      <Text mb="6" fontSize="xl" fontWeight="bold">My ERC20 Tokens</Text>
      {ethBalance && <Text>{ethBalance} <b>ETH</b></Text>}
      <Divider />
      {data && data.map((token) => (
        <div key={token.symbol}>
          <Text>{Moralis.Units.FromWei(token.balance)} <b>{token.symbol}</b> </Text>
          <Divider />
        </div>
      ))}
    </CustomContainer>

  );
};
