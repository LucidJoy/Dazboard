import React from "react";
import { Center, Flex, Text, Button } from "@chakra-ui/react";

const Navbar = ({ user, logout, isLoggingOut }) => {
  return (
    <header>
      <Flex
        justifyContent='space-between'
        bg='purple.400'
        color='white'
        px='10'
        py='6'
      >
        <Center>
          <Text fontSize='xl' fontWeight='bold'>
            Dazboard
          </Text>
        </Center>
        <Center>
          <Text>{user.getUsername()}</Text>
          <Button
            onClick={logout}
            ml='4'
            colorScheme='purple'
            disabled={isLoggingOut}
          >
            Logout
          </Button>
        </Center>
      </Flex>
    </header>
  );
};

export default Navbar;
