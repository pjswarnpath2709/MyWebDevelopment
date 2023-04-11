import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { myVideo } from '../../assets/videos';
import { RiSecurePaymentFill } from 'react-icons/ri';
import myTermsAndConditions from '../../assets/docs/termsAndCondition';

const Founder = () => {
  return (
    <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
      <VStack>
        <Avatar boxSize={['40', '48']} />
        <Text opacity={0.7}>Co-Founder</Text>
      </VStack>
      <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
        <Heading size={['md', 'xl']}>Pulkit Jain</Heading>
        <Text
          textAlign={['center', 'left']}
          children="Hi I am a fullStack developer and also knows Flutter. My mission to
          learn many things in life and not get restricted to anything."
        />
        <Text fontWeight={'bold'}>Hard work beats Talent.</Text>
      </VStack>
    </Stack>
  );
};

const VideoPlayer = () => {
  return (
    <Box>
      <video
        autoPlay
        muted
        loop
        controls
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        src={myVideo}
      ></video>
    </Box>
  );
};

const TandC = ({ termsAndConditions }) => {
  return (
    <Box>
      <Heading
        size={'md'}
        children="Terms And Conditions"
        textAlign={['center', 'left']}
        my="4"
      />
      <Box height={'sm'} p="4" overflowY={'scroll'}>
        <Text
          fontFamily={'heading'}
          letterSpacing={'widest'}
          textAlign={['center', 'left']}
        >
          {termsAndConditions}
        </Text>
        <Heading
          my="4"
          size="xs"
          children="Refund only available for cancellation within seven working days."
        />
      </Box>
    </Box>
  );
};

const About = () => {
  return (
    <Container maxWidth={'container.lg'} padding={'16'} boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']}>
        About Us
      </Heading>
      <Founder />
      <Stack
        m="8"
        direction={['column', 'row']}
        alignItems={'center'}
        fontFamily={'cursive'}
        textAlign={['center', 'left']}
      >
        <Text>
          We are video streaming platform with some premium courses available
          for premium users
        </Text>
        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout our Plans
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />
      <TandC termsAndConditions={myTermsAndConditions} />
      <HStack my="4" padding={'4'}>
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
        >
          Payment is Secured By RazorPay
        </Heading>
      </HStack>
    </Container>
  );
};

export default About;
