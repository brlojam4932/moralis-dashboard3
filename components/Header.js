//import React from 'react';
import { Center, Flex, Text, Button } from '@chakra-ui/react';

export default function Header({ user, logout, isLoggingOut }) {

  return (
    <header>
      <Flex px="10" py="6" justifyContent="space-between" bg="blue.600" color="white">
        <Center>
          <Text fontSize="xl" fontWeight="bold">Dashboard3</Text>
        </Center>
        <Center>
          <Text>{user.getUsername()}</Text>
          <Button ml="4" bg="blue.900" color="blue.100" onClick={logout} disabled={isLoggingOut}>Logout</Button>
        </Center>
      </Flex>
    </header>
  )
}
