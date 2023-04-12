import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';
import { loadUser } from '../../redux/actions/users';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
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
      navigate('/profile');
    }
  }, [dispatch, loading, error, message, navigate]);
  const submitHandler = async e => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    await dispatch(loadUser());
  };
  return (
    <Container padding={'16'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
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
          <Button
            isLoading={loading}
            colorScheme="yellow"
            w="full"
            type="submit"
          >
            {' '}
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
