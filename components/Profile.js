import { Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import CustomContainer from './CustomContainer';
import { useMoralis } from 'react-moralis';

export default function Profile({ user }) {
  const [input, setInput] = useState("");
  //console.log(input);
  const { setUserData, isUserUpdating } = useMoralis();

  return (
    <CustomContainer>
      <Text><b>User Name:</b> {user.getUsername()} </Text>
      <Text><b>Wallet Address:</b> {user.get("ethAddress")} </Text>
      <form onSubmit={(e) => {
        e.preventDefault();
        // if after trim, white space does not equal empty...
        if (input.trim() !== "") {
          setUserData({
            username: input,
            // emai: etc
          }).then(() => setInput("")) // clean up to an empty string
        }
      }}>
        <FormControl mt="6" mb="6">
          <FormLabel htmlFor='username'>Set a new username</FormLabel>
          <Input id='username' type="text" placeholder='create a user name' value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        <Button type="submit" backgroundColor="blue.300" color="blue.100" disabled={isUserUpdating} >Change Username</Button>
      </form>
    </CustomContainer>
  );
};
