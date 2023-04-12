import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseLectures } from '../redux/actions/course';
import { Loader } from '../components/Layout';

const CoursePage = ({ user }) => {
  const { id } = useParams();
  const [lectureNumber, setLectureNumber] = useState(0);
  const { loading, lectures } = useSelector(store => store.course);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourseLectures(id));
  }, [id, dispatch]);

  if (
    user?.role !== 'admin' &&
    (user?.subscription === undefined || user?.subscription?.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }
  return loading ? (
    <Loader />
  ) : (
    <>
      <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
        {lectures && lectures.length > 0 ? (
          <>
            <Box>
              <video
                width={'100%'}
                controls
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                src={lectures[lectureNumber]?.video?.url}
              ></video>
              <Heading
                m="4"
                children={`#${lectureNumber + 1} ${
                  lectures[lectureNumber]?.title
                } `}
              />
              <Heading m="4" children="Description" />
              <Text m="4" children={lectures[lectureNumber]?.description} />
            </Box>
            <VStack>
              {lectures?.map((item, index) => (
                <button
                  key={item._id}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(0,0,0,0.2)',
                  }}
                  onClick={() => setLectureNumber(index)}
                >
                  <Text noOfLines={1}>
                    #{index + 1} {item.title}
                  </Text>
                </button>
              ))}
            </VStack>
          </>
        ) : (
          <Heading textAlign={'center'} children="no lectures" />
        )}
      </Grid>
    </>
  );
};

export default CoursePage;
