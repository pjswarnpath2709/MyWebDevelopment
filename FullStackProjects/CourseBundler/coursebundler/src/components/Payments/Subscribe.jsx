import {
  Container,
  Heading,
  VStack,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/users';
import { myLogo } from '../../assets/images';
import toast from 'react-hot-toast';

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const { loading, error, subscriptionId } = useSelector(
    store => store.subscription
  );
  const { error: courseError } = useSelector(store => store.course);
  const subscribeHandler = async e => {
    e.preventDefault();
    const {
      data: { key },
    } = await axios.get(`${server}/getrazorpaykey`);
    setKey(key);
    dispatch(buySubscription());
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopup = () => {
        console.log(key, subscriptionId, 'key');
        const options = {
          key,
          name: 'CourseBundler',
          description: 'Get access to all premium content',
          image: myLogo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: '6 pack programmer at youtube',
          },
          theme: {
            color: '#FFC800',
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopup();
    }
  }, [
    dispatch,
    error,
    subscriptionId,
    key,
    user.name,
    user.email,
    courseError,
  ]);

  return (
    <Container h={'90vh'} padding={'16'}>
      <Heading children="Welcome" my="8" textAlign={'center'} />
      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={'0'}
      >
        <Box
          bg="yellow.400"
          padding={'4'}
          css={{ borderRadius: '8px 8px 0 0' }}
        >
          <Text color={'black'} children={`Pro Pack -  ₹299`} />
        </Box>
        <Box p="4">
          <VStack textAlign={'center'} px="8" mt="4" spacing={'8'}>
            <Text children="Join Pro Pack and get access to all content." />
            <Heading size={'md'} children="₹299 Only" />
          </VStack>
          <Button
            isLoading={loading}
            my="8"
            w="full"
            colorScheme="yellow"
            onClick={subscribeHandler}
          >
            Buy Now
          </Button>
        </Box>
        <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading
            size={'sm'}
            color={'white'}
            textTransform={'uppercase'}
            children="100% refund at cancellation"
          />
          <Text
            fontSize={'xs'}
            color={'white'}
            children="*Terms & Conditions Apply"
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
