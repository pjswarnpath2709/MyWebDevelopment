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
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { resetPassword } from '../../redux/actions/profile';

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const { token } = useParams();
  const { loading, error, message } = useSelector(store => store.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate('/login');
    }
  }, [dispatch, loading, error, message, navigate]);
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(resetPassword(token, password));
  };
  return (
    <Container paddingY={'16'} height={'90vh'}>
      <form onSubmit={submitHandler}>
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
          <Button
            isLoading={loading}
            width={'full'}
            colorScheme="yellow"
            type="submit"
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
