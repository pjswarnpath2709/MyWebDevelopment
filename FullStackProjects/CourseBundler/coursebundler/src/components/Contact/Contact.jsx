import {
  Container,
  Heading,
  VStack,
  Button,
  Input,
  FormLabel,
  Box,
  Textarea,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return (
    <Container h="92vh">
      <VStack h="full" justifyContent={'center'} spacing={'16'}>
        <Heading>Contact Us</Heading>
        <form style={{ width: '100%' }}>
          <Box my={'4'}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              required
              id="name"
              value={name}
              onChange={e => {
                e.preventDefault();
                setName(e.target.value);
              }}
              placeholder="Enter your name here"
              type="text"
              focusBorderColor="yellow.500"
            />
          </Box>

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
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea
              required
              id="message"
              value={message}
              onChange={e => {
                e.preventDefault();
                setMessage(e.target.value);
              }}
              placeholder="type your message here..."
              focusBorderColor="yellow.500"
            />
          </Box>

          <Button my={'4'} colorScheme="yellow" type="submit">
            Login
          </Button>

          <Box my="4">
            Request A Course?{' '}
            <Link to="/request">
              <Button colorScheme={'yellow'} variant="link">
                Click
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Contact;
