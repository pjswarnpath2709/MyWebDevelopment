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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/users';

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
  const { loading } = useSelector(store => store.course);
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
          isLoading={loading}
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
  }, [dispatch, category, keyword]);
  const { loading, error, courses, message } = useSelector(
    store => store.course
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, loading, error, courses, message]);

  const addToPlaylistHandler = async id => {
    await dispatch(addToPlaylist(id));
    dispatch(loadUser());
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
        {courses && courses.length > 0 ? (
          courses.map(course => (
            <Course
              title={course.title}
              description={course.description}
              views={course.views}
              id={course._id}
              creator={course.createdBy}
              lectureCount={course.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              imageSrc={course.poster?.url}
            />
          ))
        ) : (
          <Heading opacity={0.5} mt="4" children="No Courses Found :(" />
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
