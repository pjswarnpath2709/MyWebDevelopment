import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width={'full'}>
          <Heading color={'white'}>All Rights Reserved</Heading>
          <Heading fontFamily={'body'} size={'sm'} color={'yellow'}>
            @Pulkit Jain
          </Heading>
        </VStack>
        <HStack
          spacing={['2', '10']}
          justifyContent={'center'}
          color={'white'}
          fontSize={'50'}
        >
          <a
            href="https://www.youtube.com/channel/UCvlbmiqoxY6FB4CMT8Pdfpw"
            target="blank"
          >
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://www.instagram.com/pulkit2709" target="blank">
            <TiSocialInstagramCircular />
          </a>
          <a href="https://www.github.com/pjswarnpath2709" target="blank">
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
