import {
  Container,
  Heading,
  VStack,
  Box,
  Input,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { forgetPassword } from '../../redux/actions/profile';

const ForgetPassword = () => {
  const [email, setEmail] = useState();
  const { loading, error, message } = useSelector(store => store.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, loading, error, message]);
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(forgetPassword(email));
  };
  return (
    <Container paddingY={'16'} height={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          my="16"
          textTransform={'uppercase'}
          textAlign={['left', 'center']}
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
          <Button
            isLoading={loading}
            width={'full'}
            colorScheme="yellow"
            type="submit"
          >
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
