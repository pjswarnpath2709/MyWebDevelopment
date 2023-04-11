import {
  Container,
  FormLabel,
  Heading,
  VStack,
  Input,
  Box,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container height={'95vh'}>
      <VStack height={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading>Welcome To CourseBundler</Heading>
        <form style={{ width: '100%' }}>
          <Box my={'4'}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              required
              id="email"
              value={email}
              onChange={e => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              placeholder="abc@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box my={'4'}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              required
              id="password"
              value={password}
              onChange={e => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter Your Password"
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box my={'4'}>
            <Link to="/forgetpassword">
              <Button fontSize={'sm'} variant={'link'}>
                Forget Password?
              </Button>
            </Link>
          </Box>

          <Button my={'4'} colorScheme="yellow" type="submit">
            Login
          </Button>

          <Box my="4">
            New User ?{' '}
            <Link to="/register">
              <Button colorScheme="yellow" variant={'link'}>
                SignUp
              </Button>
            </Link>{' '}
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
