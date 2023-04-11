import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  return (
    <Container padding={'16'} minH={'90vh'}>
      <form>
        <Heading
          children="Change Password"
          my="16"
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            required
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Enter old Password... "
            type={'password'}
            focusBorderColor="yellow.500"
          />
          <Input
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Enter New Password... "
            type={'password'}
            focusBorderColor="yellow.500"
          />
          <Button colorScheme="yellow" w="full">
            {' '}
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
