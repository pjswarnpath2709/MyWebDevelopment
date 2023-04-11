import { VStack } from '@chakra-ui/react';
import {
  Container,
  Heading,
  Text,
  Input,
  Button,
  Stack,
  HStack,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  description,
  lectureCount,
  creator,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW={'200px'}
        size={'sm'}
        fontFamily={'sans-serif'}
        noOfLines={3}
      >
        {title}
      </Heading>
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform={'uppercase'}
          children={'Creator'}
        />
        <Text
          fontFamily={'body'}
          textTransform={'uppercase'}
          children={creator}
        />
      </HStack>
      <Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lectures - ${lectureCount}`}
        textTransform={'uppercase'}
      />
      <Heading
        size={'xs'}
        children={`Views - ${views}`}
        textTransform={'uppercase'}
      />
      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
          <Button colorScheme="yellow">Watch Now</Button>
        </Link>
        <Button
          variant={'ghost'}
          colorScheme="yellow"
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const addToPlaylistHandler = id => {
    console.log(id);
  };
  const categories = [
    'Web Development',
    'Artificial Intelligence',
    'Data Structures & Algorithms',
    'App Development',
    'Game Development',
    'Data Science',
  ];
  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
      <Heading m="8">Courses</Heading>
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        type="text"
        placeholder="search a course here...."
        focusBorderColor="yellow.500"
      />
      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        <Course
          title={'sample'}
          description={'sample'}
          views={23}
          id={'sample'}
          creator={'Sample Boy'}
          lectureCount={2}
          addToPlaylistHandler={addToPlaylistHandler}
          imageSrc={
            'https://images.unsplash.com/photo-1672309046475-4cce2039f342?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmVhY3QlMjBjcG91cnNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
          }
        />
      </Stack>
    </Container>
  );
};

export default Courses;
