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

const ForgetPassword = () => {
  const [email, setEmail] = useState();
  return (
    <Container paddingY={'16'} height={'90vh'}>
      <form>
        <Heading
          my="16"
          textTransform={'uppercase'}
          textAlign={['left','center']}
        >
          Forget Password
        </Heading>
        <VStack spacing={'8'}>
          <Box my={'4'} width={'full'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button width={'full'} colorScheme="yellow">
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
