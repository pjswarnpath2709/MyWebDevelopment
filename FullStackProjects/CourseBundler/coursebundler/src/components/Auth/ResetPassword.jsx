import {
  Container,
  Heading,
  VStack,
  Box,
  Input,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { token } = useParams();
  return (
    <Container paddingY={'16'} height={'90vh'}>
      <form>
        <Heading
          my="16"
          textTransform={'uppercase'}
          textAlign={['left', 'center']}
        >
          Reset Password
        </Heading>
        <VStack spacing={'8'}>
          <Box my={'4'} width={'full'}>
            <FormLabel htmlFor="password" children="New Password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              type={'password'}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box my={'4'} width={'full'}>
            <FormLabel htmlFor="confirmPassword" children="Confirm Password" />
            <Input
              required
              id="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm Your Password"
              type={'password'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button width={'full'} colorScheme="yellow">
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
