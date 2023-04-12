import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/course';
import toast from 'react-hot-toast';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/admin';
const AdminCourses = () => {
  const dispatch = useDispatch();
  const { courses, lectures, error, message } = useSelector(
    store => store.course
  );
  const [course, setCourse] = useState(null);
  const {
    loading: adminLoading,
    message: adminMessage,
    error: adminError,
  } = useSelector(store => store.admin);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (adminError) {
      toast.error(adminError);
      dispatch({ type: 'clearError' });
    }
    if (adminMessage) {
      toast.success(adminMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message, adminMessage, adminError]);

  const deleteButtonHandler = async courseId => {
    await dispatch(deleteCourse(courseId));
    await dispatch(getAllCourses());
  };
  const courseDetailsHandler = item => {
    setCourse(item);
    dispatch(getCourseLectures(item._id));
    onOpen();
  };
  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    await dispatch(getCourseLectures(courseId));
    await dispatch(getAllCourses());
  };
  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', video);
    await dispatch(addLecture(courseId, formData));
    await dispatch(getCourseLectures(courseId));
    await dispatch(getAllCourses());
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
                  loading={adminLoading}
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
          loading={adminLoading}
          lectures={lectures}
          isOpen={isOpen}
          onClose={onClose}
          courseTitle={course?.title}
          id={course?._id}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
        />
      </Box>
    </AdminTemplate>
  );
};

const Row = ({ item, courseDetailsHandler, deleteButtonHandler, loading }) => {
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
            isLoading={loading}
            onClick={() => courseDetailsHandler(item)}
            variant={'outline'}
            color="purple.500"
          >
            View Lectures
          </Button>
          <Button
            isLoading={loading}
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
