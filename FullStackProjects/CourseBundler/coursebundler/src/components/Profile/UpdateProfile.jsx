import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const UpdateProfile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  return (
    <Container padding={'16'} minH={'90vh'}>
      <form>
        <Heading
          children="Update Profile"
          my="16"
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter Name.."
            type={'text'}
            focusBorderColor="yellow.500"
          />
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter New Email... "
            type={'email'}
            focusBorderColor="yellow.500"
          />
          <Button colorScheme="yellow" w="full">
            {' '}
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
