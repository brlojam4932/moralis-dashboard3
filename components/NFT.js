import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNFTBalances } from "react-moralis";
import CustomContainer from "./CustomContainer";


export default function NFT({ user }) {

  const { getNFTBalances, data } = useNFTBalances();

  useEffect(() => {
    getNFTBalances({
      params: {
        chain: "ropsten",
        address: user.get("ethAddress")
      }
    }).catch((e) => console.log(e));

  }, []);

  console.log("nft data:", data);

  //console.log("nft address:", data?.result[0].token_address);
  //console.log("nft id:", data?.result[0].token_id);

  return (
    <CustomContainer>
      <Text fontSize="xl" fontWeight="bold">My NFTs</Text>
      {data && data.result.map((nfts) => (
        <Box mt="4" px="2" py="2" borderWidth="1px" borderRadius="md" key={nfts.token_uri} >
          {/* my nft: no image {nfts.image && <Image src={nfts.image} />} */}
          {<p>Token Address: {nfts.token_address}</p>}
          {<p>Token Id: {nfts.token_id}</p>}
          {<p>Amount: {nfts.amount}</p>}
          {<p>Name: {nfts.name}</p>}
          {<p>Symabol: {nfts.symbol}</p>}
        </Box>

      ))}
    </CustomContainer>
  )
}
