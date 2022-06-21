import React, { useState } from "react";
import { Text, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

import CustomContainer from "./CustomContainer";
import { useMoralis } from "react-moralis";

const Profile = ({ user }) => {
  const [input, setInput] = useState("");

  const { setUserData, isUserUpdating } = useMoralis();

  return (
    <CustomContainer>
      <Text>
        <b>🤓&nbsp; Username: </b>
        {user.getUsername()}
      </Text>
      <Text>
        <b>💵&nbsp; Wallet address: </b>
        {user.get("ethAddress")}
      </Text>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (input.trim() !== "") {
            setUserData({
              username: input,
            }).then(() => setInput(""));
          }
        }}
      >
        <FormControl mt={6} mb={6}>
          <FormLabel htmlFor='username'>Set a new username</FormLabel>
          <Input
            id='username'
            type='text'
            placeholder='John Doe'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button type='submit' colorScheme='purple' disabled={isUserUpdating}>
          Change username
        </Button>
      </form>
    </CustomContainer>
  );
};

export default Profile;
