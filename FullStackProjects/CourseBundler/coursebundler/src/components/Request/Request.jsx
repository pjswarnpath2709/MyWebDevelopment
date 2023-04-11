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

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  return (
    <Container h="92vh">
      <VStack h="full" justifyContent={'center'} spacing={'16'}>
        <Heading>Request New Course</Heading>
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
            <FormLabel htmlFor="course">Course</FormLabel>
            <Textarea
              required
              id="course"
              value={course}
              onChange={e => {
                e.preventDefault();
                setCourse(e.target.value);
              }}
              placeholder="kindly explain your requirements..."
              focusBorderColor="yellow.500"
            />
          </Box>

          <Button my={'4'} colorScheme="yellow" type="submit">
            Login
          </Button>

          <Box my="4">
            See available courses!{' '}
            <Link to="/courses">
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

export default Request;
