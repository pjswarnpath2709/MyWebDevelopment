import React from 'react';
import AdminTemplate from '../AdminTemplate';
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from './CourseModal';
const AdminCourses = () => {
  const courses = [
    {
      _id: '1',
      poster: {
        url: 'https://images.unsplash.com/photo-1672309046475-4cce2039f342?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmVhY3QlMjBjcG91cnNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      },
      title: 'React Course',
      category: 'web development',
      createdBy: 'creatorIsOn',
      views: 90,
      numOfVideos: 30,
    },
  ];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteButtonHandler = courseId => {
    console.log(courseId);
  };
  const courseDetailsHandler = courseId => {
    onOpen();
    console.log(courseId);
  };
  const deleteLectureButtonHandler = (courseId, lectureId) => {
    console.log(courseId, lectureId);
  };
  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
    console.log(courseId, title, description, video);
  };

  return (
    <AdminTemplate>
      <Box padding={['0', '8']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my="16"
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All Available Courses</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  item={item}
                  key={item._id}
                  courseDetailsHandler={courseDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          lectures={[]}
          isOpen={isOpen}
          onClose={onClose}
          courseTitle={'React Course'}
          id={'lalalalalalal'}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
        />
      </Box>
    </AdminTemplate>
  );
};

const Row = ({ item, courseDetailsHandler, deleteButtonHandler }) => {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} objectFit={'contain'} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos} </Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailsHandler(item._id)}
            variant={'outline'}
            color="purple.500"
          >
            View Lectures
          </Button>
          <Button
            onClick={() => deleteButtonHandler(item._id)}
            variant={'outline'}
            color="red.600"
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default AdminCourses;
