import { Button, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useToast } from '@chakra-ui/react';
import CustomContainer from './CustomContainer';
import { useState } from 'react';
import { useWeb3Transfer } from 'react-moralis';
import Moralis from 'moralis';

export default function Send() {

  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");

  const handleChange = (value) => setAmount(value);

  const toast = useToast();

  //console.log(amount)
  //console.log(receiver);

  //Moralis.Units.ETH(amount)
  const { fetch, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(amount),
    receiver: receiver,
    type: "native"
  })

  return (
    <CustomContainer>
      <Text fontSize="xl" frontWeight="bold">Send ETH</Text>
      <form onSubmit={async (e) => {
        e.preventDefault();
        await Moralis.enableWeb3();
        fetch({
          // call back functions
          onSuccess: () => {
            toast({
              title: "ETH successfully sent.",
              description: "ETH is being sent to receiver wallet",
              status: "success",
              duration: 9000,
              isClosable: true
            })
            setReceiver("");
          },
          onError: (error) => {
            toast({
              title: "Error",
              description: error,
              status: "error",
              duration: 9000,
              isClosable: true
            });
          }
        });
      }}>
        <FormControl mt="4">
          <FormLabel htmlFor='amount'>
            Amount of ETH
          </FormLabel>
          <NumberInput onChange={handleChange}>
            <NumberInputField id='amount' value={amount} />
          </NumberInput>
          <FormLabel mt="4" htmlFor='receiver'>Send to</FormLabel>
          <Input id='receiver' type="text" placeholder='Receiver Address' value={receiver} onChange={(e) => setReceiver(e.target.value)} />
        </FormControl>
        <Button marginTop="4" bg="blue.300" type='submit' color="blue.100" disabled={isFetching}>Send</Button>
      </form>
    </CustomContainer>
  );
};
